import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import countriesStates from "../utility/countriesStates.json";
import { useAuth } from "../authentication/AuthContext";
import Cookies from 'js-cookie';

function Signup() {
  const navigate = useNavigate();
  const {setToken, jwtToken} = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    password: "",
  });

  const uniqueCountries = [
    ...new Set(countriesStates.map((country) => country.name)),
  ];

  const statesInSelectedCountry = countriesStates
    .find((country) => country.name === formData.country)
    ?.states || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; 
        Cookies.set('jwt', token, { secure: false, sameSite: 'strict' });
        setToken(token);
        console.log(jwtToken);
        navigate("/home");
      } else {
        const errorMessage = await response.text();
        window.alert(errorMessage);
      }

    } catch (error) {
      window.alert("Error during user registration. Please try again later.");
    }
    console.log("Signup form submitted:", formData);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required>
            <option value="" disabled>
              Select Country
            </option>
            {uniqueCountries.map((countryName, index) => (
              <option key={index} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required>
            <option value="" disabled>
              Select State
            </option>
            {statesInSelectedCountry.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
