import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCustomer = ({ addCustomer }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
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

      const response = await axios.post('http://localhost:5173/api/v1/customers', {
        name,
        phoneNumber,
        address
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const newCustomer = response.data.data;
      addCustomer(newCustomer);
      navigate('/customers');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setMessage('Endpoint tidak ditemukan (404)');
      } else if (error.response && error.response.status === 401) {
        setMessage('Tidak diotorisasi (401)');
      } else {
        setMessage('Gagal menambah pelanggan');
      }
    }
  };

  return (
    <div className="add-customer-container">
      <h1>Tambah Pelanggan</h1>
      <form onSubmit={handleSubmit} className="add-customer-form">
        <div className="add-form-group">
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="add-customer-input"
            required
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="phoneNumber">Nomor Telepon</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Nomor Telepon"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="add-customer-input"
            required
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="address">Alamat</label>
          <input
            type="text"
            id="address"
            placeholder="Alamat"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="add-customer-input"
            required
          />
        </div>
        <button type="submit" className="add-customer-button">Tambah Pelanggan</button>
        {message && <p className="add-customer-message">{message}</p>}
      </form>
    </div>
  );
};

export default AddCustomer;
