import Comment from '../models/commentModel.js'
import Product from "../models/productModel.js";

export const addComment = (req, res) => {
    const newComment = new Comment({...req.body})
    newComment.save( async (error, comment) => {
        if (error) return res.status(400).json({message: 'Ошибка добавления комментария', error})
        try {
            await Product.findByIdAndUpdate(comment.product, { $push: {comments: comment._id}})
            res.json({
                message: 'Комментарий добавлен',
                comment
            })
        } catch (error) {
            return res.status(400).json({message: 'Ошибка добавления комментария', error})
        }

    })
}

export const getComments = (req, res) => {
    Comment
        .find()
        .populate({
            path: 'author',
            select: '-password'
        })
        .exec((error, comments) => {
            if (error) return res.status(400).json({message: 'Ошибка', error})
            res.json(comments)
    })
}

export const deleteComment = (req,res) => {
    const {id} = req.params
    Comment.findByIdAndDelete(id, async (error, comment) => {
        if (error) return res.status(400).json({message: 'Ошибка удаления комментария', error})
        try {
            await Product.findByIdAndUpdate(comment.product, {$pull: {comments: comment._id}})
            res.json({
                message: "Комментарий удален",
                comment
            })
        } catch (error) {
            return res.status(400).json({message: 'Ошибка удаления комментария', error})
        }
    })
}