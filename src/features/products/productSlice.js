import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    error: null,
    isLoading: false
}

const BASE_URL ="http://localhost:3000/products";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async()=>{
    const res = await axios.get(BASE_URL);
    return res.data;
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async(id)=>{
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return id;
})

export const addProduct = createAsyncThunk("products/addProduct", async (product) => {
    const res = await axios.post(BASE_URL, product);
    return res.data;
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (product) => {
    const res= await axios.put(`${BASE_URL}/${product.id}`,product);
    return res.data;
});



export const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error = null;
            state.products = action.payload;
        }).addCase(fetchProducts.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(
              (product) => product.id !== action.payload
            );
          }).addCase(addProduct.fulfilled,(state,action)=>{
            state.products.push(action.payload);
          }).addCase(updateProduct.fulfilled,(state,action)=>{
            const index = state.products.findIndex((product)=>product.id === action.payload.id);
            state.products[index]= action.payload;

          })
    }
})


export default productSlice.reducer;