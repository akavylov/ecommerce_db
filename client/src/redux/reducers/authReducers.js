import {SIGN_IN, LOGOUT} from "../types/authTypes.js";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    token: Cookies.get('token'),
    isAuth: !!Cookies.get('token'),
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                user: action.user,
                token: action.token,
                isAuth: !!action.token
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuth: false
            }
        default: return state
    }
}

export default reducer