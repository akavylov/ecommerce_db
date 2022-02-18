import {SIGN_IN, LOGOUT} from "../types/authTypes.js";
import Cookies from "js-cookie";


export const signIn = (data) => {
    return {type: SIGN_IN, user: data.user, token: data.token}
}

export const logout = () => {
    Cookies.remove('token', {path: ""})
    return {type: LOGOUT}
}