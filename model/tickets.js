const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ticketSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4, 
    unique: true,
  },
  title: {
    type: String,
    required: true, 
    trim: true,
  },
  description: {
    type: String, 
    required: true,
  },
  priority: {
    type: String,
   
    default: "low",
  },
  status: {
    type: String,
   
    default: "open",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,

  },
});

module.exports = mongoose.model("ticket", ticketSchema);