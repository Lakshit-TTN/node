import express from 'express'
import empController from './controllers/empController.js'

const router = express.Router()

router.use('/employees',empController);

export default router;