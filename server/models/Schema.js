const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
})

const receiptSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: String,
  date: Date,
  items: [itemSchema],
})

const Receipt = mongoose.model("Receipt", receiptSchema)

module.exports = Receipt
