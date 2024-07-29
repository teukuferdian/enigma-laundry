import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";


import CustomerList from "../component/CustomersList";
import AddCustomer from "../component/AddCustomer";
import EditCustomer from "../component/EditCustomer"
import { useEffect } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const token = localStorage.getItem('token');

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5173/api/v1/customers', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCustomers(response.data.data);
      // console.log(response.data.data)
    } catch (error) {
      console.error('Gagal memuat pelanggan', error.message);
    }
  };


  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(customer =>
      customer.email === updatedCustomer.email ? updatedCustomer : customer
    ));
  };

  const deleteCustomer = async(id) => {
    try {
      await axios.delete(`http://localhost:5173/api/v1/customers/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchCustomers();
    } catch (error) {
      console.error('Gagal menghapus pelanggan', error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    
    <Routes>
      
      <Route path="/" element={<CustomerList customers={customers} deleteCustomer={deleteCustomer} setCustomerToEdit={setCustomerToEdit} />} />
      <Route path="add" element={<AddCustomer addCustomer={addCustomer} />} />
      <Route path="edit" element={<EditCustomer updateCustomer={updateCustomer} customerToEdit={customerToEdit} />} />
       
    </Routes>
    
  );
}

export default Customers;
