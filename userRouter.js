const router = require('express').Router()
const userController = require('./userController')
const authMiddleware = require('./middleware/authMiddleware')

router.post('/update-status',authMiddleware, userController.updateStatus)
router.delete("/delete", authMiddleware, userController.deleteUser)

module.exports = router