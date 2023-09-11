import React from "react";
import "./navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";

function NavBar() {
  const { clearToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

      clearToken();
      navigate("/");
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="logo">
          <span className="logo-text">files.io</span>
        </div>
        <div className="nav-links">
          <Link to="home" className="nav-link">
            Home
          </Link>
          <Link className="nav-link" onClick={(e) => handleLogout(e)}>
            Logout
          </Link>
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
}

export default NavBar;
