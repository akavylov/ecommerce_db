import React, {useEffect} from 'react';
import Product from "../../componants/Product/Product";
import {useDispatch, useSelector} from 'react-redux'
import {searchInput} from "../../redux/actions/productActions";

const Main = () => {
    const dispatch = useDispatch()
    const {products, cart, searchValue} = useSelector(s => s.products)

   useEffect(() => {
       return () => dispatch(searchInput(''))
   }, [dispatch])

    return (
        <div className='container mx-auto sm:py-6'>
            {!products.filter(it => it.title.toLowerCase().includes(searchValue.toLowerCase())).length && <div className="text-center text-3xl">Не найдено!</div>}
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    searchValue
                     ? products.filter(it => it.title.toLowerCase().includes(searchValue.toLowerCase())).map(product => {
                    const count = cart[product._id]?.count || 0
                    return (
                    <Product  product={product} key={product._id} count={count}/>
                    )
                })
                     :products.map(product => {
                     const count = cart[product._id]?.count || 0
                     return (
                            <Product  product={product} key={product._id} count={count}/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Main;