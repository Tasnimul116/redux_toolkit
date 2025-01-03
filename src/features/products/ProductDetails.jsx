import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProducts } from './productSlice';


const ProductDetails = () => {
    const{id} = useParams();
    const dispatch = useDispatch();
    const{products,isLoading,error} = useSelector((state)=>state.productsR);

    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])

    const product = products?.find((product) => product.id === id);

    if(isLoading){
        return <h2>Loading...</h2>
    }
    if(error){
        return <h2>{error}</h2>
    }
    if(!product){
        return <h2>Product not found</h2>
    }

  return (
    <div>
    <h1>Product Details</h1>
    <p><strong>Name:</strong> {product.name}</p>
    <p><strong>Price:</strong> {product.price}</p>
  </div>
  )
}

export default ProductDetails