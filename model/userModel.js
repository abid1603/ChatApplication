const mongoose = require("mongoose")
const userModel = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    phone: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userModel);
