import express from 'express'
import {addProduct, getProducts, deleteProduct, getProductById} from "../controllers/productControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../services/multer.js"

const router = express.Router()

router.post('/', authMiddleware(['admin']), upload.single('image'), addProduct)
router.delete('/:id', authMiddleware(['admin']), deleteProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)


export default router