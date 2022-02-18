import express from 'express'
import cors from 'cors'
import dbConnect from "./services/mongoose.js";
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
import cookieParser from 'cookie-parser'
import passport from 'passport'

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import jwtStrategy from "./services/passport.js";
import commentsRoutes from "./routes/commentsRoutes.js";


const port = process.env.PORT || 8000
const server = express()
dbConnect()

server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(passport.initialize())
passport.use('jwt', jwtStrategy)


server.use('/api/v1/auth', userRoutes)
server.use('/api/v1/products', productRoutes)
server.use('/api/v1/comments', commentsRoutes)

server.use('/static', express.static('images'))

if (process.env.NODE_ENV === "production") {
    server.use(express.static('client/build'))
    server.get('*', (req, res) => {
        res.sendFile(path.resolve('client/build/index.html'))
    })
}

server.listen(port, () => {
    console.log('Server is running')
})