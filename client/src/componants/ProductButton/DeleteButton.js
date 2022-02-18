import React from 'react';
import {deleteFromAllCart} from "../../redux/actions/productActions";
import del from "../../images/delete.png";
import {useDispatch} from "react-redux";

const DeleteButton = ({it, cart}) => {
    const dispatch = useDispatch()
    return (
        <button onClick={() => dispatch(deleteFromAllCart(it._id))} className={`${cart} text-indigo-600 hover:text-indigo-900`}>
            <img className="w-10 h-10" src={del} alt=""/>
        </button>
    );
};

export default DeleteButton;