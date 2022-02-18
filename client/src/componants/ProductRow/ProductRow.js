import React, {useEffect, useState} from 'react';
import ProductButton from "../ProductButton/ProductButton";
import {useSelector} from "react-redux";
import ProductImage from "../Modal/ProductImage";
import DeleteButton from "../ProductButton/DeleteButton";

const ProductRow = ({it}) => {
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
            <tr key={it.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col sm:flex-row items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img onClick={() => setModal(!modal)}
                                 className="h-10 w-10 rounded-full" src={it.image} alt="" />
                            {modal && <ProductImage product={it} setModal={setModal}/>}
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{it.title}</div>
                            <div className="text-sm text-gray-500">
                                Цена: {(it.price * rates[currentRate[0]]).toFixed(2)} {currentRate[1]}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="flex text-center px-6 py-6 whitespace-nowrap ">
                    <div className="flex sm:flex-row flex-col-reverse mr-3">
                        <ProductButton product={it} count={it.count}/>
                    </div>
                    <DeleteButton it={it} cart="inline sm:hidden"/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-6 py-2 inline-flex text-s sm:text-xs leading-5 font-semibold rounded-full bg-green-100">
                        {(it.price * it.count * rates[currentRate[0]]).toFixed(2)} {currentRate[1]}
                      </span>
                </td>
                <td className="px-2 sm:cart py-6 whitespace-nowrap text-center text-sm font-medium">
                    <DeleteButton it={it} cart="hidden sm:inline"/>
                </td>
            </tr>
    );
};

export default ProductRow;