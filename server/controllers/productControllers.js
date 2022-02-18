import Product from '../models/productModel.js'
import {unlinkSync} from 'fs'
import path from 'path'
import Comment from "../models/commentModel.js"

export const addProduct = (req, res) => {
    const {title, description, price} = req.body
    const image = req.file ? `/static/${req.file.filename}` : '/static/no_image.png'
    const newProduct = new Product({title, description, price, image})
    newProduct.save((error, product) => {
        if (error) return res.status(400).json({message:'Ошибка добавления товара', error})
        res.json({
            message: 'Товар добавлен',
            product
        })
    })
}

export const getProducts = (req, res) => {
    Product.find({}, (error, products) => {
        if (error) return res.status(400).json({message: 'Ошибка получения товаров', error})
        res.json(products)
    })
}

export const deleteProduct = (req, res) => {
    const {id} = req.params
    Product.findByIdAndDelete(id, (error, product) =>{
        if (error) return res.status(400).json({message: 'Ошибка удаления товаров', error})
        const filename = product.image.replace('/static/', '')
        try {
            if (filename !== 'no_image.png') unlinkSync(path.resolve(`images/${filename}`))
        } catch (e) {
            console.log('Файл не найден')
        }
        Comment.deleteMany({product: product._id}, (error) => {
            if (error) return res.status(400).json({message: 'Ошибка', error})
        })
        res.json({
            message: 'Товар удален',
            product
        })
    })
}

export const getProductById = (req, res) => {
    const {id} = req.params
    Product
        .findById(id)
        .populate('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '-password'
            }
        })
        .exec((error, product) => {
            if (error || !product) return res.status(400).json({message: 'Ошибка', error})
            res.json(product)
    })
}