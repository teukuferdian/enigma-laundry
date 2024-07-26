import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/register', { // Update URL according to your API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setMessage('Anda sudah terdaftar! Silakan login.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
    } catch (error) {
      setMessage('Terjadi kesalahan, silakan coba lagi.');
    }
  };

  const handleLoginClick = () => {
    navigate('/'); // Redirect to login page on button click
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1>Registrasi</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Lengkap"
            className="register-input"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="register-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="register-input"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi Password"
            className="register-input"
            required
          />
          <button type="submit" className="register-button">Daftar</button>
          {message && <p className="register-message">{message}</p>}
        </form>
        <div className="register-footer">
          <p>Already have an account?</p>
          <button onClick={handleLoginClick} className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
