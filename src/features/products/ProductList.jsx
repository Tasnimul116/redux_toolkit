import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct } from './productSlice'
import { useNavigate } from 'react-router-dom'



const ProductList = ({ onHandleEdit}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {products,isLoading,error} = useSelector((state)=>state.productsR);

    useEffect(()=>{
      dispatch(fetchProducts())
  },[dispatch])

const handleEdit=(product)=>{
    navigate(`/products/edit/${product.id}`);
    onHandleEdit(product);
  } 

  const handleViewDetails=(id)=>{
    navigate(`/products/${id}`);
  }

  return (
    <div>
        <h2>Product List</h2>
        {isLoading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {
          !isLoading  && !error && products.length>0 ? products.map((product)=>(
            <ul key={product.id} style={{listStyleType:"none", border:"1px solid black", padding:"10px", margin:"10px"}}> 
                <li id={product.id}>{product.name}</li>
                <li>{product.price}</li>
                <button onClick={()=>dispatch(deleteProduct(product.id))}>Delete</button>
                <button onClick={()=>handleEdit(product)}>Edit</button>
                <button onClick={()=>handleViewDetails(product.id)}>View Product</button>
            </ul>
          )):<h2>No Product is Available</h2>
        }
    </div>
  )
}

export default ProductList