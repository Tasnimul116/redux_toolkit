import { useState } from 'react'

import './App.css'
import ProductShow from './features/products/ProductShow'
import ProductForm from './features/products/ProductForm'

function App() {
  const [isEdit, setIsEdit] = useState(false)
  const [productEdit, setProductEdit] = useState(null)


  const handleProductEdit= (product)=>{
    setIsEdit(true)
    setProductEdit(product)
    // console.log(product)
  }

  const resetForm = ()=>{
    setIsEdit(false)
    setProductEdit(null)
  }
  

  return (
    <div>
      <ProductForm productToEdit={productEdit} isEdit={isEdit} resetForm={resetForm} />
      <ProductShow onHandleProductEdit={handleProductEdit} />
      {/* onhandleProductEdit is the prop that we are passing to ProductShow component */}
    </div>
  )
}

export default App
