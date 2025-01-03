import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const port = import.meta.env.VITE_JSON_PORT;

const initialState = {
    products:[],
    isLoading: false,
    error: null
}
export const fetchProducts =  createAsyncThunk('products/fetchProducts', async()=>{
   
    const res = await axios.get(port);
    return res.data ;
})

export const deleteProduct =createAsyncThunk('products/deleteProduct',async(id)=>{
    const res= await axios.delete(`${port}/${id}`);
    return id;
})

export const addProduct = createAsyncThunk('products/addProduct',async(product)=>{
    const res = await axios.post(port,product);
    return res.data;
})

export const updateProduct=createAsyncThunk('products/updateProduct',async(product)=>{
    const res = await axios.put(`${port}/${product.id}`,product);
    return res.data;
})


export const productSlice = createSlice({
    name:"products",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products = action.payload;
            state.isLoading = false;
            state.error = null;
        }).addCase(deleteProduct.fulfilled,(state,action)=>{
            state.products = state.products.filter((product)=>
                product.id !== action.payload 
            )
        }).addCase(addProduct.fulfilled,(state,action)=>{
            state.products.push(action.payload);}).addCase(updateProduct.fulfilled,(state,action)=>{
                const index = state.products.findIndex((product)=>product.id === action.payload.id);
                state.products[index] = action.payload;
            })
       
    }
});


export default productSlice.reducer;