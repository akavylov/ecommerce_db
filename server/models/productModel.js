import mongoose from 'mongoose'


const {Schema, model} = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image : {
        type: String
    },
    description: {
        type: String,
        trim: true,
        default: "No description provided"
    },
    inStock: {
        type: Boolean,
        default: true
    },
    rating: [Number],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]
}, {timestamps: true, versionKey: false})

export default model('products', productSchema)