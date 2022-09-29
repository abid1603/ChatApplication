const express = require("express")
const router = express.Router()
const avatarUpload = require("../middleware/avaterupload")
const { signupHandler, loginHandler } = require("../controller/userController")
const {addUserValidators,addUserValidationHandler} = require("../middleware/userValidator")

router.post("/signup", avatarUpload, addUserValidators,addUserValidationHandler,signupHandler)
router.post("/login", loginHandler)

module.exports = router
