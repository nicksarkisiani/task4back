const router = require('express').Router()
const controller = require('./authController')
const authMiddleware = require('./middleware/authMiddleware')

const {check} = require("express-validator");
router.post("/registration", [
    check("name", "Name is empty").notEmpty(),
    check("email", "Email is empty").notEmpty(),
    check("password", "Password is empty").notEmpty(),
], controller.registration)
router.post("/login", controller.login)
router.post("/verify", controller.verifyToken)

module.exports = router