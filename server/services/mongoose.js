import mongoose from 'mongoose'

export const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Database is connected'))
        .catch((err) => console.log('Database connection error\n', err))
}

export default dbConnect