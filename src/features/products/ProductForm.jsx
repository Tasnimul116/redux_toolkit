import React, { useEffect } from 'react'
import { addProduct } from './productSlice'
import { useDispatch} from 'react-redux'
import { nanoid } from 'nanoid'
import { updateProduct } from './productSlice'


const ProductForm = ({productToEdit, isEdit, resetForm}) => {
    const dispatch = useDispatch();
    

    const[product,setProduct] = React.useState({
        name:"",
        price:"",
        description:""
    })

    const handleChange=(e)=>{
        const {name,value}= e.target;
        setProduct({
            ...product,
            [name]:value
        })
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isEdit){
            dispatch(updateProduct({id:productToEdit.id,...product}))
            resetForm()
        }else{
            dispatch(addProduct({...product, id:nanoid()}))
        }

        setProduct({
            name:"",
            price:"",
            description:""
        })
       
    }

    useEffect(()=>{
        if(productToEdit){
            setProduct({
                name:productToEdit.name??'',
                price:productToEdit.price??'',
                description:productToEdit.description??''
            })
        }
    },[productToEdit])

    

  return (
    <div>
        <h1>Product Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
            <label htmlFor="price">Price</label>
            <input type="text" id="price" name="price"  value={product.price} onChange={handleChange}/>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={product.description} onChange={handleChange} />
            <button type="submit">{isEdit?"Update Product":"Add Product"}</button>
        </form>
    </div>
  )
}

export default ProductForm