import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Customers.css';

const CustomersList = ({ customers, deleteCustomer, setCustomerToEdit }) => {
  const navigate = useNavigate();

  const handleEdit = (customer) => {
    setCustomerToEdit(customer);
    navigate('/customers/edit');
  };

  return (
    <div className="customer-list-container">
      <h1>Daftar Pelanggan</h1>
      <Link to="/customers/add" className="customer-button">Tambah Pelanggan</Link>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Nomor Telepon</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index} className="customer-item">
              <td>{customer.name}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.address}</td>
              <td>
                <button onClick={() => handleEdit(customer)} className="customer-edit">Edit</button>
                <button onClick={() => deleteCustomer(customer.email)} className="customer-delete">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;
