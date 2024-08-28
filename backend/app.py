from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image
import pytesseract

app = Flask(__name__)
CORS(app)

def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (1, 1), 0)
    threshold_value = 165  
    _, binary = cv2.threshold(blurred, threshold_value, 255, cv2.THRESH_BINARY_INV)
    return binary

def get_bounding_boxes(image):
    bounding_boxes = []
    data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
    for i in range(len(data['text'])):
        if int(data['conf'][i]) > 0:
            left = data['left'][i]
            top = data['top'][i]
            width = data['width'][i]
            height = data['height'][i]
            rect = (left, top, width, height)
            if height >= 10 and height <= 20: 
                bounding_boxes.append(rect)
    return bounding_boxes

def process_words(image, word_bounding_boxes):
    # parsing each row and extracting the name and price based on the whitespace column 
    whitespace_threshold = 60
    row_image = image.copy()
    data = ["", ""] # data[0] is name, data[1] is price
    isPrice = False

    for i, box in enumerate(word_bounding_boxes):
        x, y, w, h = box
        border = 2 
        border_left = min(border, x)
        border_top = min(border, y)
        border_right = min(border, image.shape[1] - x - w)
        border_bottom = min(border, image.shape[0] - y - h)
        x -= border_left
        y -= border_top
        w += border_left + border_right
        h += border_top + border_bottom

        roi = image[y: y + h, x: x + w]
        word = pytesseract.image_to_string(roi, config='--psm 7').strip()

        # [0] = x, [1] = y, [2] = width, [3] = height
        if i != 0 and word_bounding_boxes[i][0] - word_bounding_boxes[i - 1][0] - word_bounding_boxes[i - 1][2] >= whitespace_threshold: 
            isPrice = True
        
        if isPrice:
            data[1] += word
        else:
            data[0] += word + " "
        
        cv2.rectangle(row_image, (x, y), (x + w, y + h), (0, 255, 0), 2)

    name = ""
    cost = ""
    for i in range(len(data[0])):
        if data[0][i].isalpha():
            if len(name) == 0: 
                name += data[0][i].upper()
            else: 
                name += data[0][i].lower()
        elif data[0][i] == ' ' and len(name) > 0 and name[-1] != " ":
            name += " "
    
    name = name.rstrip()

    for i in range(len(data[1])):
        if data[1][i].isdigit():
            cost += data[1][i]
    
    if len(cost) < 2:
        return ["", ""]
    if len(cost) >= 5:
        cost = cost[-5:]
    cost = cost[:-2] + "." + cost[-2:]

    return [name, cost]

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files.get('image')

    if file:
        pillow_image = Image.open(file)
        image = cv2.cvtColor(np.array(pillow_image), cv2.COLOR_RGB2BGR)

        binary = preprocess_image(image)
        bounding_boxes = get_bounding_boxes(binary)
        bounding_boxes.sort(key=lambda bbox: bbox[1])
        rows = {}

        last = 0
        ROW_THRESHOLD = 10
        for i in range(len(bounding_boxes)):
            if i != 0 and abs(bounding_boxes[i][1] - last) <= ROW_THRESHOLD:
                rows[last].append(bounding_boxes[i])
            else:
                rows[bounding_boxes[i][1]] = [bounding_boxes[i]]
                last = bounding_boxes[i][1]

        items = []
        for row in rows.values():
            row.sort(key=lambda bbox: bbox[0])
            p = process_words(image, row)
            if "total" in p[0] or "tax" in p[0]:
                break
            if p[0] != "" or p[1] != "":
                items.append(p)

        return jsonify({"items": items})

    return jsonify({"error": "Image failed to load"}), 400

if __name__ == "__main__":
    app.run(debug=True)
