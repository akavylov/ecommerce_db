import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import ProductRow from "../../componants/ProductRow/ProductRow";
import {clearCart} from "../../redux/actions/productActions";


const Box = () => {
    const dispatch = useDispatch()
    const {currentRate, rates, cart} = useSelector(s => s.products)

    return (
        <div className="flex justify-center mt-12">
            {!!Object.values(cart).length
                ? <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Название
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Количество
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Общая стоимость
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {Object.values(cart).map((it) => (
                                    <ProductRow key={it._id} it={it}/>))
                                }
                                </tbody>
                                <tfoot className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <button
                                            onClick={() => dispatch(clearCart())}
                                            className="px-6 py-2 bg-red-400 hover:bg-red-300 font-semibold text-white rounded-xl">Очистить корзину</button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-l md:text-xl font-medium tracking-wider"
                                    >
                                        Итого: &nbsp;
                                        {(Object.values(cart).reduce((acc, it) => {
                                            return acc + it.price * it.count * rates[currentRate[0]]
                                        }, 0)).toFixed(2)
                                        } {currentRate[1]}
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                : <div className="font-extrabold text-center text-3xl">Корзина пуста</div>
            }
        </div>
    );
};

export default Box;