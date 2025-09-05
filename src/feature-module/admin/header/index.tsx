/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlignLeft, Search, Menu } from "react-feather";
import { useAuth } from "../../../core/context/AuthContext";
import {
  avatar01,
  logo,
  logoSmall,
} from "../imagepath";

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  const { isAuthenticated, userType } = authState;
  const navigate = useNavigate();

  // Function to get the appropriate logo redirect URL based on user type
  const getLogoRedirectUrl = () => {
    if (isAuthenticated && userType === 'doctor') {
      return '/doctor/doctor-dashboard';
    } else if (isAuthenticated && userType === 'patient') {
      return '/patient/dashboard';
    } else if (isAuthenticated && userType === 'admin') {
      return '/admin';
    }
    return '/index'; // Default to landing page for unauthenticated users
  };
  
  const handleSidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  
  const handleSidebarMobileMenu = () => {
    document.body.classList.toggle("slide-nav");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        {/* Logo */}
        <div className="header-left">
          <Link to={getLogoRedirectUrl()} className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <Link to={getLogoRedirectUrl()} className="logo logo-small">
            <img src={logoSmall} alt="Logo" width="30" height="30" />
          </Link>
        </div>
        <Link to="#" id="toggle_btn" onClick={handleSidebar}>
          <AlignLeft size={20} />
        </Link>
        {/* /Logo */}
        <div className="top-nav-search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <button className="btn" type="submit">
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Mobile Menu Toggle */}
        <Link
          to="#"
          className="mobile_btn"
          id="mobile_btn"
          onClick={handleSidebarMobileMenu}
        >
          <Menu size={20} />
        </Link>
        {/* /Mobile Menu Toggle */}
                 {/* Header Right Menu */}
         <ul className="nav user-menu">
           {/* User Menu */}
          <li className="nav-item dropdown has-arrow">
            <Link
              to="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src={avatar01}
                  width={31}
                  alt="Ryan Taylor"
                />
              </span>
            </Link>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src={avatar01}
                    alt="User Image"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>Ryan Taylor</h6>
                  <p className="text-muted mb-0">Administrator</p>
                </div>
              </div>
              <Link className="dropdown-item" to="/admin/profile">
                My Profile
              </Link>
              <Link className="dropdown-item" to="/admin/settings">
                Settings
              </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </li>
          {/* /User Menu */}
        </ul>
        {/* /Header Right Menu */}
      </div>

      {/* /Header */}
    </>
  );
};

export default Header;
