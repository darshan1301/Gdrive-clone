import React, {useState} from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import Cookies from 'js-cookie';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async(e) => {
    e.preventDefault();
   
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; 
        Cookies.set('jwt', token, { secure: false, sameSite: 'strict' });
        setToken(token);
        navigate("/home");
      } else {
        const errorMessage = await response.text();
        window.alert(errorMessage);
      }
    } catch (error) {
      window.alert("Error during user registration. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="registration-link">
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
}