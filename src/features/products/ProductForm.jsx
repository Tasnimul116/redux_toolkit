import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "./productSlice";
import { nanoid } from "nanoid";


const ProductForm = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...product, id: nanoid() }));
    setProduct({ name: "", price: "", description: "" });
  };



  return (
    <div>
      <h1>Product Form</h1>
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
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={product.description}
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
        <button type="submit">Add Product</button>
       
      </form>
    </div>
  );
};

export default ProductForm;
