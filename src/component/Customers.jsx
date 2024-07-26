import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";


import CustomerList from "../component/CustomersList";
import AddCustomer from "../component/AddCustomer";
import EditCustomer from "../component/EditCustomer"

function Customers() {
  const [customers, setCustomers] = useState([
    { name: 'John Doe', email: 'john.doe@example.com', phoneNumber: '123456789', address: '123 Main St' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '987654321', address: '456 Elm St' }
  ]);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(customer =>
      customer.email === updatedCustomer.email ? updatedCustomer : customer
    ));
  };

  const deleteCustomer = (email) => {
    setCustomers(customers.filter(customer => customer.email !== email));
  };

  return (
    
    <Routes>
      
      <Route path="/" element={<CustomerList customers={customers} deleteCustomer={deleteCustomer} setCustomerToEdit={setCustomerToEdit} />} />
      <Route path="add" element={<AddCustomer addCustomer={addCustomer} />} />
      <Route path="edit" element={<EditCustomer updateCustomer={updateCustomer} customerToEdit={customerToEdit} />} />
       
    </Routes>
    
  );
}

export default Customers;
