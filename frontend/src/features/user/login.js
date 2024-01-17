import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../authContext/AuthContext";
import Cookies from "js-cookie";
import { loginHandler } from "../../services/user.services";
import { setError, setUser } from "./userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginHandler(email, password);

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      Cookies.set("jwt", token, { secure: false, sameSite: "strict" });
      setToken(token);
      dispatch(setUser(token));
      navigate("/home");
    } else {
      const errorMessage = await response.text();
      dispatch(setError(errorMessage));
      window.alert(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email: harry@gmail.com</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label>Password: harry@00</label>
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
