import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import {getProducts, getRates} from "./redux/actions/productActions";
import {useDispatch, useSelector} from "react-redux";

import {signIn, logout} from "./redux/actions/authActions.js";

import Main from "./pages/Main/Main";
import Header from "./componants/Header/Header";
import Box from "./pages/Box/Box";
import SignUp from "./pages/SignUp/SignUp.js";
import SignIn from "./pages/SignIn/SignIn.js";
import AnonymousRoute from "./componants/AnonymousRoute/AnonymousRoute.js";
import PrivateRoute from "./componants/PrivateRoutes/PrivateRoutes.js";
import AdminPage from "./pages/AdminPage/AdminPage.js";
import ProductPage from "./componants/ProductPage/ProductPage.js";


const App = () => {
    const dispatch = useDispatch()
    const {token, isAuth} = useSelector(s => s.auth)
    useEffect(() => {
        dispatch(getRates())
        dispatch(getProducts())
    }, [dispatch])

    useEffect(() => {
        if (token) {
            axios.get('/api/v1/auth/authenticate', )
                .then(({data}) => dispatch(signIn(data)))
                .catch(() => dispatch(logout()))
        }
    }, [isAuth])
  return (
     <div>
          <Header/>
          <Routes>
                  <Route path="/" element={<Main/>} />
                  <Route path="/box" element={<Box/>} />
                  <Route path="/product/:id" element={<ProductPage/>}/>
                  <Route path="/signup" element={<AnonymousRoute><SignUp/></AnonymousRoute>}/>
                  <Route path="/signin" element={<AnonymousRoute><SignIn/></AnonymousRoute>}/>
                  <Route path="/admin-page" element={<PrivateRoute roles={['admin']}><AdminPage/></PrivateRoute>}/>
          </Routes>
     </div>
  );
};

export default App;
