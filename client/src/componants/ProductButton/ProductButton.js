import React from 'react';
import {addToCart, deleteFromCart} from "../../redux/actions/productActions";
import {useDispatch} from "react-redux";


const ProductButton = ({product, count}) => {
    const dispatch = useDispatch()
    return (
        <>
            <button
                onClick={() => dispatch(deleteFromCart(product))}
                className="w-10 h-9 bg-red-400 hover:bg-red-300 active:bg-red-500 text-3xl font-bold rounded-b-lg sm:rounded-l-lg sm:rounded-b-none">-</button>
            <span className="w-10 sm:w-20 h-9 bg-gray-200 text-2xl pt-1">
                        {count}
                    </span>
            <button
                onClick={() => dispatch(addToCart(product))}
                className="w-10 h-9 bg-green-400 hover:bg-green-300 active:bg-green-450 text-3xl font-semibold rounded-t-lg sm:rounded-t-none sm:rounded-r-lg">+</button>
        </>
    );
};

export default ProductButton;