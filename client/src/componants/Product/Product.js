import React, {useEffect, useState} from 'react';
import ProductButton from "../ProductButton/ProductButton";
import ProductImage from "../Modal/ProductImage";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const Product = ({product, count}) => {
    const [modal, setModal] = useState(false)
    const {currentRate, rates} = useSelector(s => s.products)

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [modal])
    return (
        <div className="shadow-lg rounded-lg bg-gray-100 h-full flex flex-col justify-between pb-6 position-relative">
            <img onClick={() => setModal(!modal)} className="object-cover h-52 w-full rounded-t-lg" src={product.image} alt=""/>
            <div className="text-center py-4 px-6 flex-grow">
                <h3 className="text-xl mb-3 hover:underline">
                    <Link to={`/product/${product._id}`}>{product.title}</Link>
                </h3>
                <div className="mb-3">
                    Цена: {(product.price * rates[currentRate[0]]).toFixed(2)} {currentRate[1]}
                </div>
                <div className="flex justify-center">
                  <ProductButton count={count} product={product} key={product.id}/>
                </div>
            </div>
            {modal && <ProductImage product={product} setModal={setModal}/>}
        </div>
    );
};

export default Product;