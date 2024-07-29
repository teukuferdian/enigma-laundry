import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useProducts } from './ProductContext';
import './ProductList.css';

const apiClient = axios.create({
  baseURL: 'http://localhost:5173/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Anda perlu login terlebih dahulu');
        return;
      }

      const response = await apiClient.post('/products', {
        name,
        price: parseFloat(price),
        type
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const newProduct = response.data.data;
      addProduct(newProduct);
      navigate('/product');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setMessage('Endpoint tidak ditemukan (404)');
      } else if (error.response && error.response.status === 401) {
        setMessage('Tidak diotorisasi (401)');
      } else {
        setMessage('Gagal menambah produk');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product">
      <h1>Tambah Produk</h1>
      <input
        type="text"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="add-input"
        required
      />
      <input
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="add-input"
        required
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="add-input"
        required
      />
      <button type="submit" className="add-button">Tambah Produk</button>
      {message && <p className="add-message">{message}</p>}
    </form>
  );
};

export default AddProduct;
