import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Burger from "../Burger/Burger";
import burger from "../../images/burger1.jpeg"
import {CSSTransition} from 'react-transition-group'
import {useSelector} from "react-redux";

const Header = () => {
    const [burgerMenu, setBurgerMenu] = useState()
    const {user, isAuth} = useSelector(s => s.auth)

    return (
        <>
            <header className='bg-gray-800 text-white z-40 sticky top-0 left-0 right-0 mb-3'>
                <div className="container mx-auto flex justify-between items-center py-3">
                    <div>
                        <Link className="mr-3 text-white rounded-lg bg-green-400 hover:bg-green-500 px-2 py-2 md:px-5 py-2 mr-2 duration-300" to="/">Главная</Link>
                        <Link className="mr-3 text-white rounded-lg bg-green-400 hover:bg-green-500 px-2 py-2 md:px-5 py-2 mr-2 duration-300" to="/box">Корзина</Link>
                        {
                            isAuth && user?.role === 'admin' && <Link className="mr-3 text-white rounded-lg bg-green-400 hover:bg-green-500 px-2 py-2 md:px-3 py-2 duration-300" to="/admin-page">Добавить товар</Link>
                        }
                    </div>
                    <div className="flex items-center">
                        {
                            user && <div className="mr-3">{user.name}</div>
                        }
                        <button onClick={() => setBurgerMenu(!burgerMenu)} className="z-50 bg-green-400 hover:bg-green-500 px-3 py-1 rounded-md">
                            <img width="30" src={burger} alt=""/></button>
                    </div>
                </div>
            </header>
            <CSSTransition
                in={burgerMenu}
                timeout={100}
                classNames="modal-burger"
                unmountOnExit
            >
                <Burger setBurgerMenu={setBurgerMenu}/>
            </CSSTransition>

        </>
    );
};

export default Header;