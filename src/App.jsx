import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Product from './component/Product';
import Transaksi from './component/Transaksi';
import Login from './component/Login';
import Register from './component/Register';
import Sidebar from './component/Sidebar';
import NotFound from './component/NotFound';
import { ProductProvider } from './component/ProductContext'; // Import ProductContext
import Customers from './component/Customers';
import Logout from './component/Logout';


const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = ['/', '/register'].includes(location.pathname);

  return (
    <div className='d-flex'>
      {!isAuthPage && <Sidebar />} {/* Menyembunyikan Sidebar pada halaman login dan register */}
      <div className='flex-grow-1 p-3'>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/product/*' element={<Product />} />
          <Route path='/customers/*' element={<Customers />} />
          <Route path='/transaksi' element={<Transaksi />} />
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/error' element={<NotFound />} /> {/* Rute NotFound */}
          <Route path='/transactions' element={<Transaksi />} />
          <Route path='/transactions/:id' element={<Transaksi />} />
          <Route path='/transactions/add/:id' element={<Transaksi />} />
          <Route path='/Logout' element={<Logout />} />

        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </Router>
  );
}

export default App;
