import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import NavLinks from "../../common/nav";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { all_routes } from "../../../../routes/all_routes";
import DarkModeToggle from "../../dark-mode";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState(false);
  const toggleSearch = () => {
    setSearchField(!searchField);
  };
  const [headerClass, setHeaderClass] = useState(
    "header header-custom header-fixed inner-header relative"
  );
  const directionPath = () => {
    navigate("/patient/search-doctor1");
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
                <li className="header-theme">
                  <DarkModeToggle />
                </li>
                <li className="d-inline-flex align-items-center drop-header">
                  <div className="dropdown dropdown-country me-3">
                    <Link
                      to="#"
                      className="d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <ImageWithBasePath
                        src="assets/img/flags/us-flag.svg"
                        className="me-2"
                        alt="flag"
                      />
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          to="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/us-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ENG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          to="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/arab-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ARA
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          to="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/france-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          FRA
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown dropdown-amt">
                    <Link
                      to="#"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      USD
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          YEN
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          EURO
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
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
                  to={all_routes.generalHomeOne}
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
                    <Link to={all_routes.generalHomeOne} className="menu-logo">
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
                <ul className="nav header-navbar-rht">
                  <li className="searchbar">
                    <Link to="#" onClick={toggleSearch}>
                      <i className="feather-search" />
                    </Link>
                    <div
                      className={
                        searchField
                          ? "togglesearch d-block"
                          : "togglesearch d-none"
                      }
                    >
                      <form action="/patient/search-doctor1">
                        <div className="input-group">
                          <input type="text" className="form-control" />
                          <button
                            type="submit"
                            className="btn"
                            onClick={directionPath}
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                    >
                      <i className="isax isax-lock-1 me-1" />
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i className="isax isax-user-tick me-1" />
                      Register
                    </Link>
                  </li>
                </ul>
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
