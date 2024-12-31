import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts,deleteProduct } from './productSlice';



const ProductShow = ({onHandleProductEdit}) => {
    const { products, isLoading, error } = useSelector((state) => state.productsR);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])


    const handleEdit=(product)=>{
      onHandleProductEdit(product)
    }
   
    
   
  return (
    <div>
        <h1>Product Show</h1>
        {isLoading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {
          !isLoading  && !error && products.length>0 ? products.map((product)=>(
            <ul key={product.id} style={{listStyleType:"none", border:"1px solid black", padding:"10px", margin:"10px"}}> 
                <li id={product.id}>{product.name}</li>
                <li>{product.price}</li>
                <li>{product.description}</li>
                <button onClick={()=>dispatch(deleteProduct(product.id))}>Delete</button>
                <button onClick={()=>handleEdit(product)}>Edit</button>
            </ul>
          )):<h2>No Product is Available</h2>
        }

    </div>
  )
}

export default ProductShow