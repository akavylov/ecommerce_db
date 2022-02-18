import express from 'express'
import {addComment, getComments, deleteComment} from "../controllers/commentControlles.js";


const router = express.Router()

router.post('/', addComment)
router.get('/', getComments)
router.delete('/:id', deleteComment)


export default router