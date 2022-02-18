import {combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk";
import products from "./reducers/productReducers";
import auth from "./reducers/authReducers.js";


const initialState = {}

const rootReducer = combineReducers({
    products,
    auth
})


export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))