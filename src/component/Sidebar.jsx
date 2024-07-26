// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar() {
  return (
    <div className='d-flex flex-column justify-content-between bg-dark text-white vh-100 p-3'>
      <div>
        <Link to='/' className='text-decoration-none text-white d-flex align-items-center mb-3'>
          <i className='bi bi-opencollective fs-3 me-3'></i>
          <span className='fs-4'>Enigma / Laundry </span>
        </Link>
        <hr className='text-secondary' />
        <ul className='nav nav-pills flex-column'>
          <li className='nav-item'>
            <Link to='/dashboard' className='nav-link text-white'>
              <i className='bi bi-speedometer2 me-5'></i>
              <span><strong>Dashboard</strong></span>
            </Link>
          </li>
          
          <li className='nav-item'>
            <Link to='/product' className='nav-link text-white'>
              <i className='bi bi-box-seam me-5'></i>
              <span><strong>Product</strong></span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/customers' className='nav-link text-white'>
              <i className='bi bi-person-badge me-5'></i>
              <span><strong>Customers</strong></span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/transaksi' className='nav-link text-white'>
              <i className='bi bi-receipt me-5'></i>
              <span><strong>Transaksi</strong></span>
            </Link>
          </li>
          <hr className='text-secondary' />
          <li className='nav-item'>
            <Link to='/' className='nav-link text-white'>
              <i className='bi bi-box-arrow-in-right me-5'></i>
              <span><strong>Login</strong></span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/register' className='nav-link text-white'>
              <i className='bi bi-person-plus me-5'></i>
              <span><strong>Register</strong></span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to='/logout' className='nav-link text-white d-flex align-items-center'>
          <i className='bi bi-person-circle fs-4 me-5'></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
