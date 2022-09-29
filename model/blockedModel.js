const mongoose = require("mongoose");

const blockedModel = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  blockedUser: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = blockedModel;
