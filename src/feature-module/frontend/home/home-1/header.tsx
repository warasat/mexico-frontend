import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import NavLinks from "../../common/nav";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { all_routes } from "../../../../routes/all_routes";
import DarkModeToggle from "../../dark-mode";
import LanguageSwitcher from "../../../../components/LanguageSwitcher";
import { useAuth } from "../../../../core/context/AuthContext";

const Header: React.FC = () => {
  const [headerClass, setHeaderClass] = useState(
    "header header-custom header-fixed inner-header relative"
  );
  const { authState, logout } = useAuth();
  const { isAuthenticated, userType, user } = authState;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Store userType before logout clears the authState
    const currentUserType = userType;
    logout();
    // Redirect to appropriate login page based on user type
    if (currentUserType === 'doctor') {
      navigate('/doctor/doctor-register');
    } else if (currentUserType === 'patient') {
      navigate('/pages/patient-signup');
    } else {
      navigate('/pages/patient-signup'); // default
    }
  };

  // Function to get the appropriate logo redirect URL - stay on same page for doctors
  const getLogoRedirectUrl = () => {
    // For doctors, stay on the same page (no redirect)
    if (isAuthenticated && userType === 'doctor') {
      return '#'; // This will prevent navigation
    }
    return all_routes.generalHomeOne; // For others, redirect to landing page
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        setHeaderClass(
          "header header-custom header-fixed inner-header relative fixed pharmacy-header"
        );
      } else {
        setHeaderClass(
          "header header-custom header-fixed inner-header relative"
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const onHandleMobileMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };
  const onHandleCloseMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  return (
    <div>
      <>
        <div className="header-topbar">
          <div className="container">
            <div className="topbar-info">
              <div className="d-flex align-items-center gap-3 header-info">
                <p>
                  <i className="isax isax-message-text5 me-1" />
                  info@example.com
                </p>
                <p>
                  <i className="isax isax-call5 me-1" />
                  +1 66589 14556
                </p>
              </div>
              <ul>
                {/* Only show these buttons for patients or unauthenticated users - doctors are redirected away */}
                {(!isAuthenticated || (isAuthenticated && userType === 'patient')) && (
                  <>
                    <li className="header-theme">
                      <DarkModeToggle />
                    </li>
                    <li className="header-language">
                      <LanguageSwitcher />
                    </li>
                    {/* User dropdown for authenticated patients only */}
                    {isAuthenticated && userType === 'patient' && (
                      <li className="nav-item dropdown">
                        <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          {user?.name || userType}
                        </button>
                        <ul className="dropdown-menu">
                          <li><small className="dropdown-item-text">Logged in as: {user?.name || userType}</small></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                        </ul>
                      </li>
                    )}
                  </>
                )}
                {/* Social media icons commented out
                <li className="social-header">
                  <div className="social-icon">
                    <Link to="#">
                      <i className="fa-brands fa-facebook" />
                    </Link>
                    <Link to="#">
                      <i className="fa-brands fa-x-twitter" />
                    </Link>
                    <Link to="#">
                      <i className="fa-brands fa-instagram" />
                    </Link>
                    <Link to="#">
                      <i className="fa-brands fa-linkedin" />
                    </Link>
                    <Link to="#">
                      <i className="fa-brands fa-pinterest" />
                    </Link>
                  </div>
                </li>
                */}
              </ul>
            </div>
          </div>
        </div>
        {/* Header */}
        <header className={headerClass}>
          <div className="container">
            <nav className="navbar navbar-expand-lg header-nav">
              <div className="navbar-header">
                <Link id="mobile_btn" to="#" onClick={onHandleMobileMenu}>
                  <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                </Link>
                <Link
                  to={getLogoRedirectUrl()}
                  className="navbar-brand logo"
                >
                  <ImageWithBasePath
                    src="assets/img/logo.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="header-menu">
                <div className="main-menu-wrapper">
                  <div className="menu-header">
                    <Link to={getLogoRedirectUrl()} className="menu-logo">
                      <ImageWithBasePath
                        src="assets/img/logo.svg"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </Link>
                    <Link
                      id="menu_close"
                      className="menu-close"
                      to="#"
                      onClick={onHandleCloseMenu}
                    >
                      <i className="fas fa-times" />
                    </Link>
                  </div>
                  <ul className="main-nav">
                    <NavLinks />
                  </ul>
                </div>
                {/* Search functionality removed */}
              </div>
            </nav>
          </div>
        </header>
        {/* /Header */}
      </>
    </div>
  );
};

export default Header;
