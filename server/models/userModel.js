import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const {Schema, model} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password : {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "user"
    }
}, {timestamps: true, versionKey: false})

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next()
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

userSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password)
}
export default model('users', userSchema)