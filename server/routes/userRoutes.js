import express from 'express'
import {signup, signin, authenticate} from "../controllers/userControllers.js";

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/authenticate', authenticate)


export default router