require("dotenv").config()
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const { expressjwt: jwt } = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const Receipt = require("./models/schema")
const { convertDate } = require("./utils/functions.js")

const app = express()

app.use(cors())
app.use(express.json())

const jwtMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  algorithms: ["RS256"],
})

app.use(jwtMiddleware)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed: ", err))

app.get("/api/test", (req, res) => {
  res.send("Server is running!")
})

app.post("/api/upload", async (req, res) => {
  const { userId, items } = req.body

  if (!userId || !Array.isArray(items)) {
    return res.status(400).json({
      error: "Invalid parameters.",
    })
  }
  const receipt = new Receipt({
    userId,
    date: new Date(),
    name: convertDate(new Date()),
    items,
  })
  try {
    const result = await receipt.save()
    res.status(200).json({ receiptId: result._id })
  } catch (error) {
    res.status(500).json({ error: "Failed to create receipt" })
  }
})

app.get("/api/receipts/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    const receipts = await Receipt.find({ userId })
    res.status(200).json(receipts)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch receipts" })
  }
})

app.put("/api/receipts/:id", async (req, res) => {
  const { id } = req.params
  const { userId, items, date, name } = req.body

  try {
    const updatedReceipt = await Receipt.findByIdAndUpdate(
      id,
      { userId, items, date, name },
      { new: true, runValidators: true }
    )
    if (!updatedReceipt) {
      return res.status(404).json({ error: "Receipt not found" })
    }
    return res.status(200).json(updatedReceipt)
  } catch (error) {
    res.status(500).json({ error: "Failed to update receipt" })
  }
})

app.delete("/api/receipts/:id", async (req, res) => {
  const { id } = req.params

  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(id)

    if (!deletedReceipt) {
      return res.status(404).json({ error: "Receipt not found" })
    }

    return res.status(200).json(deletedReceipt)
  } catch (error) {
    res.status(500).json({ error: "Failed to delete receipt" })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

module.exports = app
