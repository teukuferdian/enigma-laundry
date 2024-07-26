import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Customers.css';

const EditCustomer = ({ updateCustomer, customerToEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (customerToEdit) {
      setName(customerToEdit.name);
      setEmail(customerToEdit.email);
      setPhoneNumber(customerToEdit.phoneNumber);
      setAddress(customerToEdit.address);
    }
  }, [customerToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCustomer = { name, email, phoneNumber, address };
    updateCustomer(updatedCustomer);
    navigate('/customers');
  };

  return (
    <div className="edit-customer-container">
    <h1>Edit Pelanggan</h1>
    <form onSubmit={handleSubmit} className="edit-customer-form">
      <div className="form-group">
        <label htmlFor="name">Nama:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="edit-customer-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phoneNumber">Nomor Telepon:</label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="edit-customer-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Alamat:</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="edit-customer-input"
          required
        />
      </div>
      <button type="submit" className="edit-customer-button">Simpan</button>
    </form>
  </div>
);
};

export default EditCustomer;
