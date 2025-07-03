import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import ProductList from '../../../Components/products/ProductList';
import { useProductStore } from '../../../store/productStore';

const Products = () => {

  const {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProductStore();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);




  useEffect(() => {
    fetchProducts();
      }, [fetchProducts]);

  return (
    <div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <ProductList products={products}/>
        </>
      )}
    </div>
  );
};

export default Products;