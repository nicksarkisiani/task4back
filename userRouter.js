const router = require('express').Router()
const userController = require('./userController')
const authMiddleware = require('./middleware/authMiddleware')

router.post('/update-status',authMiddleware, userController.updateStatus)
router.delete("/delete", authMiddleware, userController.deleteUser)
router.get("/users", authMiddleware, userController.getUsers)
router.post("/deleteMany", userController.deleteMany)
router.post("/blockMany", userController.blockMany)
router.post("/unblockMany", userController.unBlockMany)
router.post("/test", userController.deleteMany)

module.exports = router