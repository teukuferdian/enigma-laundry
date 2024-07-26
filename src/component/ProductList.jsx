import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import { useProducts } from './ProductContext';

const ProductList = () => {
  const { products, setProducts } = useProducts();

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="product-table-container">
      <h1>Daftar Produk</h1>
      <Link to="/product/add" className="product-button">Tambah Produk</Link>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Type</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>Rp {product.price.toLocaleString('id-ID')}</td>
              <td>{product.type}</td>
              <td>
                <Link to={`/product/edit/${product.id}`} className="product-button">
                  Edit
                </Link>
                <button 
                  onClick={() => deleteProduct(product.id)} 
                  className="product-button"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
