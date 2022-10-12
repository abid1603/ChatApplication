const mongoose = require("mongoose");

const messageModel = mongoose.Schema({
  conversation_id: {
    type: mongoose.Types.ObjectId,
    ref: "conversation",
  },
  text: {
    type: String,
  },
  attachment: String,
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageModel);
