import React from "react";
import "./navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/AuthContext";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/user/userSlice";
import { clearFolder } from "../../features/folders/folderSlice";
import { clearFile } from "../../features/files/fileSlice";

function NavBar() {
  const { clearToken } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    dispatch(clearFolder());
    dispatch(clearFile());
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
