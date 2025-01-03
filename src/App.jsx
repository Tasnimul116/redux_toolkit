import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './features/products/ProductForm';
import ProductList from './features/products/ProductList';
import ProductDetails from './features/products/ProductDetails';
import './App.css';
import ProductUpdate from './features/products/ProductUpdate';

function App() {
  const [editProduct, setEditProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleProductEdit = (product) => {
    setEditProduct(product);
    setIsEdit(true);
  };

  return (
    <Router>
      <div className='App'>
        {/* Navbar */}
        <nav style={styles.navbar}>
          <Link to="/" style={styles.navLink}>
            Product List
          </Link>
          <Link to="/add-product" style={styles.navLink}>
            Add Product
          </Link>
        </nav>

        {/* Main Routes */}
        <Routes>
          <Route
            path="/add-product"
            element={<ProductForm  />}
          />
          <Route
            path="/"
            element={<ProductList onHandleEdit={handleProductEdit} />}
          />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/edit/:id" element={<ProductUpdate onHandleEditProduct={editProduct} isEdit={isEdit}/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
  },
};

export default App;
