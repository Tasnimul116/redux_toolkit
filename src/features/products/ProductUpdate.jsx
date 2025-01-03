import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "./productSlice";
import { useParams } from "react-router-dom";

const ProductUpdate = ({ onHandleEditProduct, isEdit }) => {
    const dispatch = useDispatch();
 

      
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
    });
    
      useEffect(() => {
        if (isEdit) {
          setProduct(
            {
              name: onHandleEditProduct.name,
              price: onHandleEditProduct.price,
              description: onHandleEditProduct.description,
            },
            
          );
        }
      },[onHandleEditProduct]);
    
      const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
      };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
          dispatch(updateProduct({ ...product, id: onHandleEditProduct.id }));
       
        setProduct({ name: "", price: "", description: "" });
      };
    


    return (
        <div>
            <h1>Product Update Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default ProductUpdate;
