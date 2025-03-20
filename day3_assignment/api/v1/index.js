import express from 'express'
import studentController from './controllers/studentController.js'
import loginController from './controllers/loginCotroller.js'
import signupController from './controllers/signupController.js'
const router = express.Router()


router.use('/students',studentController);
router.use('/user',signupController);
router.use('/auth',loginController);

export default router;