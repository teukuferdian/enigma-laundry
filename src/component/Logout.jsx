import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Pastikan untuk menambahkan file CSS untuk gaya

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Menghapus token dari localStorage dan mengarahkan pengguna ke halaman login
    localStorage.removeItem('token');
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Arahkan ke halaman login setelah 3 detik

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="notification-card">
        <h1>Logout Berhasil</h1>
        <p>Anda telah berhasil logout. Anda akan diarahkan ke halaman login dalam beberapa detik.</p>
      </div>
    </div>
  );
};

export default Logout;
