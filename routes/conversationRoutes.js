const express = require("express")
const router = express.Router()
const isAuthenticated = require("../middleware/isAuthenticated");
const {createConversationHandler} = require("../controller/conversationController")


router.post("/",isAuthenticated,createConversationHandler)

module.exports = router