import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useProducts } from './ProductContext';
import './ProductList.css'; // Pastikan file CSS ini diimpor

const EditProductForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const { products, updateProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setType(product.type);
    }
  }, [id, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!id) {
      setMessage('ID produk tidak ditemukan');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage('Anda perlu login terlebih dahulu');
        return;
      }

      const response = await axios.put(`http://localhost:5173/api/v1/products`, {
        id, // mengirimkan id sebagai bagian dari payload data
        name,
        price: parseFloat(price),
        type
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const updatedProduct = response.data.data;
      updateProduct(updatedProduct);
      navigate('/product');
    } catch (error) {
      console.error(error);
      setMessage('Gagal mengedit produk');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-product">
      <h1>Edit Produk</h1>
      <input
        type="text"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="edit-input"
        required
      />
      <input
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="edit-input"
        required
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="edit-input"
        required
      />
      <button type="submit" className="edit-button">Edit Produk</button>
      {message && <p className="edit-message">{message}</p>}
    </form>
  );
};

export default EditProductForm;
