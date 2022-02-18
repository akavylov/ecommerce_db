import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {deleteFromAllCart, getProducts} from "../../redux/actions/productActions.js";


const ProductPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [text, setText] = useState("")
    const {user, isAuth} = useSelector(s => s.auth)


    const sendComment = () => {
        const comment = {
            text,
            product: id,
            author: user?._id
        }
        axios.post('/api/v1/comments', comment)
            .then(({data}) => {
                setProduct({
                    ...product,
                    comments: [...product.comments, {...data.comment, author: {name: user.name}}]
                })
            })
            .catch(e => console.log(e))
    }

    const deleteComment = (id) => {

        axios.delete(`/api/v1/comments/${id}`)
            .then(({data}) => {
                setProduct({
                    ...product,
                    comments: product.comments.filter(it => it._id !== id)
                })
            })
            .catch((e) => console.log(e))
    }

    const deleteProduct = (id) => {
        axios.delete(`/api/v1/products/${id}`)
            .then(() => {
                navigate('/')
                dispatch(getProducts())
                dispatch(deleteFromAllCart(id))
            })
            .catch((e) => console.log(e))
    }


    useEffect(() => {
        axios(`/api/v1/products/${id}`)
            .then(({data}) => setProduct(data))
            .catch(e => console.log(e))
    }, [id])

    return (
        <div className="container mx-auto">
            <div className="flex justify-between">
                <div>
                    <h1 className='text-3xl'>{product.title}</h1>
                    <img className='w-80' src={product.image} alt={product.title}/>
                </div>
                <div>
                    {
                        isAuth && user?.role === 'admin' && <button className="bg-red-400 px-6 py-2 rounded-lg" onClick={() => deleteProduct(product._id)}>Delete product</button>
                    }
                </div>
            </div>
            <hr/>
            <ul>
                {
                    product.comments?.map(it => {
                        return (
                            <li key={it._id}>
                                <div>{it.text}</div>
                                <div className="text-gray-400">{it.author?.name}</div>
                                {
                                    isAuth && <button className="bg-red-400 mb-3 px-1 py-1 hover:bg-green-800 rounded-lg" onClick={() => deleteComment(it._id)}>Delete</button>
                                }
                            </li>
                        )
                    })
                }
            </ul>
            <hr/>
            {
                isAuth && <div>
                    <textarea onChange={(e) => setText(e.target.value)} placeholder="Введите комментарий" className="w-full border-2" rows="5"></textarea>
                    <button onClick={sendComment} className="bg-green-400 hover:bg-green-500 px-6 py-3 rounded-lg">Отправить</button>
                </div>
            }
        </div>
    );
};

export default ProductPage;