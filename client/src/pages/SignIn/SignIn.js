import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {signIn} from "../../redux/actions/authActions.js";
import {useNavigate} from "react-router-dom";
import axios from 'axios'

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signInClick = () => {
        axios.post('/api/v1/auth/signin', {email, password})
            .then(({data}) => {
                dispatch(signIn(data))
                navigate('/')
            })
            .catch(e => alert(e.response?.data?.message || "Ошибка"))
    }
    return (
        <div>
            <div className="flex justify-center items-center w-full">
                <form className="mt-10">
                    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                        <div className="space-y-4">
                            <h1 className="text-center text-2xl font-semibold text-gray-600">Register</h1>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="text" id="email" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="text" id="password" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"/>
                            </div>
                        </div>
                        <button
                            onClick={signInClick}
                            type="button"
                            className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;