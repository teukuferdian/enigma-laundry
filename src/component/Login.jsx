import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(true); // Show notification on load
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5173/api/v1/auth/login', {
        username,
        password
      });

      const token = response.data.data.token;
      localStorage.setItem('token', token); // Save token in localStorage
      navigate('/dashboard'); // Redirect to dashboard

      // Hide notification after login success
      setShowNotification(false);
      console.log(response.data.data.token);
    } catch (error) {
      console.log(error);
      setMessage('Username atau password tidak valid');
    }
  };

  useEffect(() => {
    // Automatically hide the notification after 10 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-container">
      {showNotification && (
        <div className="notification">
          <p><strong>Akun Demo:</strong></p>
          <p>Username: <strong>admin</strong></p>
          <p>Password: <strong>password</strong></p>
        </div>
      )}
      <div className="login-form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">Login</button>
          {message && <p className="login-message">{message}</p>}
        </form>
        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
