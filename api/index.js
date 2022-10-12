const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userHandler = require("../routes/userRoutes")
const conversationHandler = require("../routes/conversationRoutes")

const app = express()
dotenv.config()
app.use(express.json())

//database connection with mongoose
mongoose
  .connect("mongodb://localhost/chatApp")
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err))

// routes
app.use("/user", userHandler)
app.use("/conversation", conversationHandler)

//error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    console.log(err.message)
    return next(err)
  }
  res.status(500).json({ error: err })
}

app.listen(5000, () => {
  console.log("server is connected successfully at port 5000")
})
