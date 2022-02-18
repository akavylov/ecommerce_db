import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'



export const signup = (req, res) => {
    User.findOne({email: req.body.email}, (error, user) => {
        if (error) return res.status(400).json({message: 'Ошибка', error})
        if (user) return res.status(401).json({message: 'Пользователь с таким email уже существует'})

        const newUser = new User({...req.body})
        newUser.save((error, result) => {
            if (error) return res.status(400).json({message: 'Ошибка регистрации', error})
            res.json({
                message: "Вы успешно зарегистрированы",
                user: result
            })
        })
    })
}

export const signin = (req, res) => {
    const {email, password} = req.body
    User.findOne({email}, (error, user) => {
        if (error) return res.status(400).json({message: 'Ошибка', error})
        if (!user) return res.status(401).json({message: 'Пользователь nе существует'})
        if (!user.authenticate(password)) return res.status(401).json({message: 'Неверный email или пароль'})

        const secret = process.env.SECRET_KEY || "secret"
        const token = jwt.sign({_id: user._id}, secret, {expiresIn: '2d'})
        res.cookie('token', token, {maxAge: 1000 * 360 * 48})
        res.json({
            message: `Добро пожаловать ${user.name}`,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    })
}

export const authenticate = (req, res) => {
    const {token} = req.cookies
    if (!token) return res.status(401).json({message: 'Пользователь не авторизован'})
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const {_id} = decodedToken
        User.findById(_id, (error, user) => {
            if (error) return res.status(400).json({message: 'Error', error})
            if (!user) return res.status(401).json({message: 'Пользователь nе существует'})

            const refreshToken = jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: "1d"})
            res.cookie('token', refreshToken, {maxAge: 1000 * 360 * 24})

            res.json({
                token: refreshToken,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
        })
    } catch (e) {
        res.status(401).json({message: 'Пользователь не авторизован'})
    }
}