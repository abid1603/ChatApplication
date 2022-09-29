const mongoose = require("mongoose");

const conversationModel = mongoose.Schema({
  user1: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  user2: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = conversationModel;
