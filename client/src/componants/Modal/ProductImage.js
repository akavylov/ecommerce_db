import React from 'react';

const ProductImage = ({setModal, product}) => {
    return (
        <div onClick={() => setModal(false)} className="fixed h-screen w-full modal-bg top-0 left-0 ">
            <div className="flex justify-center items-center h-screen">
                <img className="object-cover rounded-t-lg" src={product.image} alt=""/>
            </div>
            <button onClick={() => setModal(false)} type="button">Close</button>
        </div>
    );
};

export default ProductImage;