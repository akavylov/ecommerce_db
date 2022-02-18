import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {changeRate, searchInput, sortByPrice, sortByTitle} from "../../redux/actions/productActions";
import {logout} from "../../redux/actions/authActions.js";

const Burger = ({setBurgerMenu}) => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("")
    const {isAuth} = useSelector(s => s.auth)

    const clickChangeRate = (rate) => {
        setBurgerMenu(false)
        dispatch(changeRate(rate))
    }

    const clickSortByRate = () => {
        dispatch(sortByPrice())
        setBurgerMenu(false)
    }

    const clickSortByTitle = () => {
        dispatch(sortByTitle())
        setBurgerMenu(false)
    }

    useEffect(() => {
        dispatch(searchInput(searchText))
    }, [searchText])

    const logoutClick = () => {
        dispatch(logout())
        setBurgerMenu(false)
    }

    return (
        <div onClick={() => setBurgerMenu(false)} className="z-50 fixed inset-0">
            <div onClick={(e) => e.stopPropagation()} className="z-50 fixed top-0 right-0 bottom-0 w-80 bg-gray-800">
                {
                    !searchText && <>
                        {!isAuth
                        ? <div className="flex justify-around mb-3 mt-3">
                                <Link onClick={() => setBurgerMenu(false)} className="mr-3 text-white rounded-lg bg-green-400 hover:bg-green-500 px-2 py-2 md:px-5 py-2 mr-1 duration-300" to="/signup">Регистрация</Link>
                                <Link onClick={() => setBurgerMenu(false)} className="text-white rounded-lg bg-green-400 hover:bg-green-500 px-2 py-2 md:px-5 py-2 mr-1 duration-300" to="/signin">Войти</Link>
                            </div>
                        : <div className="flex justify-end mr-3 mb-3 mt-3">
                                <button onClick={logoutClick} className="mr-5 text-white rounded-lg bg-green-400 hover:bg-green-500 px-2 py-2 md:px-5 py-2 mr-1 duration-300" to="/signup">Выйти</button>
                            </div>
                        }

                        <div className="text-2xl text-white text-center mt-6 mb-8">Select currency:</div>
                        <div className="flex justify-around  mb-5">
                            <button onClick={() => clickChangeRate(["USD", '$'])} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">USD</button>
                            <button onClick={() => clickChangeRate(["RUB", 'руб'])} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">RUB</button>
                            <button onClick={() => clickChangeRate(["KGS", 'сом'])} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">KGS</button>
                        </div>
                        <div className="text-2xl text-white text-center mb-8">Sort:</div>
                        <div className="flex justify-around mb-8">
                            <button onClick={clickSortByRate} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">Price</button>
                            <button onClick={clickSortByTitle} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">Title</button>
                        </div>
                    </>
                }
                <div className="text-2xl text-white text-center mb-8">Enter the title:</div>
                <div className="flex justify-center">
                    <input className="p-1 rounded-lg"  onChange={(e) => setSearchText(e.target.value.trim())} type="text"/>
                </div>
            </div>
        </div>
    );
};

export default Burger;