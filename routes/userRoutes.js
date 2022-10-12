const express = require("express")
const router = express.Router()
const avatarUpload = require("../middleware/avaterupload")
const { signupHandler, loginHandler } = require("../controller/userController")
const {addUserValidators,addUserValidationHandler} = require("../middleware/userValidator")
const {doLoginValidators,doLoginValidationHandler} = require("../middleware/loginValidator")

router.post("/signup", avatarUpload, addUserValidators,addUserValidationHandler,signupHandler)
router.post("/login",doLoginValidators,doLoginValidationHandler, loginHandler)

module.exports = router
