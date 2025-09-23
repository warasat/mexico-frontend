 
/* eslint-disable no-constant-condition */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import logosvg from "../../assets/img/logo.svg";
import { useEffect } from "react";
import { useAuth } from "../../core/context/AuthContext";

import AOS from "aos";
import "aos/dist/aos.css";
import { 
  X, 
} from "react-feather";
import {
  Browser_categorie,
  logo_03,
  logo_15,
  logo_svg,
  logo_white,
} from "./imagepath";

// import Chart from "./patients/dashboard/chart";
import NavLinks from "./common/nav";
// import ImageWithBasePath from "../../components/imageWithBasePath";
import DarkModeToggle from "./dark-mode";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  const pathnames = window.location.pathname;

  // Function to get the appropriate logo redirect URL - stay on same page for doctors
  const getLogoRedirectUrl = () => {
    // For doctors, stay on the same page (no redirect)
    if (isAuthenticated && userType === 'doctor') {
      return '#'; // This will prevent navigation
    }
    return '/index'; // For others, redirect to landing page
  };

  const OnHandleMobileMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };

  const OnhandleCloseMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  //nav transparent

  const [_button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  const ShowButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    ShowButton();
  }, []);
  window.addEventListener("resize", ShowButton);

  const ChangeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", ChangeBackground);
  useEffect(() => {
    const HandleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener('scroll', HandleScroll);
    return () => {
      window.removeEventListener('scroll', HandleScroll);
    };
  }, []);
  return (
    <>
      {!pathnames.includes("home1") && (
        <header
          className={`header ${
            pathnames.includes("/index-11")
              ? "header-fixed header-fourteen header-sixteen"
              : pathnames.includes("/index-10")
              ? "header-fixed header-fourteen header-fifteen"
              :  pathnames.includes("/index-9")
              ? "header-fixed header-fourteen"
              :  pathnames.includes("/index-8")
              ? "header-fixed header-fourteen header-twelve header-thirteen"
              :  pathnames.includes("/index-7")
              ? "header-fixed header-fourteen header-twelve"
              :  pathnames.includes("/index-6")
              ? "header-trans header-eleven"
              :  pathnames.includes("/index-4")
              ? "header-trans custom"
              :  pathnames.includes("/index-5")
              ? "header header-fixed header-ten"
              :  pathnames.includes("home")
              ? "header-trans header-two"
              :  pathnames.includes("/index-13")
              ? "header header-custom header-fixed header-ten home-care-header"
              :  pathnames.includes("/Pharmacy-index")
              ? "header header-one"
              : "header header-custom header-fixed inner-header relative"
          } 
           ${isScrolled ? 'pharmacy-header' : ''} `}
          style={
            pathnames.includes("/index-6") && navbar
              ? { background: "rgb(30, 93, 146)" }
              : pathnames.includes("/index-10") && navbar
              ? { background: "rgb(255, 255, 255)" }
              : pathnames.includes("/index-11") && navbar
              ? { background: "rgb(255, 255, 255)" }
              : pathnames.includes("/index-4") && navbar
              ? { background: "rgb(43, 108, 203)" }
              : pathnames.includes("/index-9") && navbar
              ? { background: "rgb(43, 108, 203)" }
              : pathnames.includes("/index-2") && navbar
              ? { background: "rgb(255, 255, 255)" }
              : { background: "" }
          }
        >
          <div className="container">
            <nav
              className={`navbar navbar-expand-lg header-nav ${
                pathnames.includes("home1") ? "nav-transparent" : ""
              }`}
            >
              <div className="navbar-header">
                <Link
                  to="#"
                  id="mobile_btn"
                  onClick={() => OnHandleMobileMenu()}
                >
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link>
                <Link to={getLogoRedirectUrl()} className="navbar-brand logo">
                  {pathnames.includes("/index-5") ? (
                    <img src={logo_white} className="img-fluid" alt="Logo" />
                  ) : pathnames.includes(
                      "/react/template/Pharmacy/Pharmacy-index"
                    ) ? (
                    <div className="browse-categorie">
                      <div className="dropdown categorie-dropdown">
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <img src={Browser_categorie} alt="" /> Browse Categories
                        </Link>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="#">
                            Ayush
                          </Link>
                          <Link className="dropdown-item" to="#">
                            Covid Essentials
                          </Link>
                          <Link className="dropdown-item" to="#">
                            Devices
                          </Link>
                          <Link className="dropdown-item" to="#">
                            Glucometers
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={
                        pathnames === "/react/template/index-6" ||
                        pathnames === "/react/template/index-4"
                          ? logosvg
                          : pathnames === "/react/template/index-11"
                          ? logo_15
                          : pathnames === "/react/template/index-10"
                          ? logo_15
                          : pathnames === "/react/template/index-9"
                          ? logo_03
                          : pathnames === "/react/template/index-7"
                          ? logo_svg
                          : pathnames == "/react/template/index-13"
                          ? logo_white
                          : logosvg
                      }
                      className="img-fluid"
                      alt="Logo"
                    />
                  )}
                </Link>
              </div>
              <div className="main-menu-wrapper">
                <div className="menu-header">
                                      <Link to={getLogoRedirectUrl()} className="menu-logo">
                    <img src={logo} className="img-fluid" alt="Logo" />
                  </Link>
                  <Link
                    to="#"
                    id="menu_close"
                    className="menu-close"
                    onClick={() => OnhandleCloseMenu()}
                  >
                    <X size={20} />
                  </Link>
                </div>
                  
                <ul
                  className={`main-nav ${
                    pathnames.includes("home4") ? "white-font" : ""
                  }`}
                >
                  <NavLinks/>
                  
                      
                </ul>
              </div>
              
              {/* Right side navigation - simplified */}
              <ul className="nav header-navbar-rht">
                {/* Show these elements for authenticated users (patients/doctors) on all pages, or for non-authenticated users when not on contact/about pages */}
                {((isAuthenticated && (userType === 'patient' || userType === 'doctor')) || (!pathnames.includes("contactus") && !pathnames.includes("aboutus"))) && (
                  <>
                    {/* Dark mode toggle */}
                    <li className="header-theme noti-nav">
                      <DarkModeToggle />
                    </li>

                    {/* Language switcher */}
                    <li className="header-language noti-nav">
                      <LanguageSwitcher />
                    </li>



                    {/* User dropdown for authenticated users */}
                    {isAuthenticated && (
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
              </ul>
            </nav>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
