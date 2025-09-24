/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlignLeft, Search, Menu, LogOut } from "react-feather";
import { useAuth } from "../../../core/context/AuthContext";
import {
  logo,
  logoSmall,
} from "../imagepath";

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  const { isAuthenticated, userType } = authState;
  const navigate = useNavigate();

  // Function to get the appropriate logo redirect URL - stay on same page for doctors
  const getLogoRedirectUrl = () => {
    // For doctors, stay on the same page (no redirect)
    if (isAuthenticated && userType === 'doctor') {
      return '#'; // This will prevent navigation
    }
    return '/index'; // For others, redirect to landing page
  };
  
  const handleSidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  
  const handleSidebarMobileMenu = () => {
    document.body.classList.toggle("slide-nav");
  };

  const handleLogout = () => {
    logout();
    navigate('/system-admin/login');
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
		 <ul className="nav user-menu align-items-center">
			<li className="nav-item">
				<button
					onClick={handleLogout}
					className="btn btn-primary d-flex align-items-center px-3 mt-1 me-3"
					style={{ borderRadius: 20 }}
				>
					<LogOut size={16} className="me-2" /> Logout
				</button>
			</li>
		</ul>
        {/* /Header Right Menu */}
      </div>

      {/* /Header */}
    </>
  );
};

export default Header;
