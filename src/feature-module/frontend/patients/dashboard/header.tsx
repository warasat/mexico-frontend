import { Link } from "react-router-dom";

const Header = () => {
  const OnHandleMobileMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };

  const OnhandleCloseMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  return (
    <>
      <header className="header header-fixed header-one">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
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
              <Link to="/index" className="navbar-brand logo">
                <img src="/assets/img/logo.png" className="img-fluid" alt="Logo" />
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                                      <Link to="/index" className="menu-logo">
                  <img src="/assets/img/logo.png" className="img-fluid" alt="Logo" />
                </Link>
                <Link
                  to="#"
                  id="menu_close"
                  className="menu-close"
                  onClick={() => OnhandleCloseMenu()}
                >
                  <i className="fas fa-times"></i>
                </Link>
              </div>
              <ul className="main-nav">
                <li className="active">
                  <Link to="/patient/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/patient/search-doctor1">Find Doctor</Link>
                </li>
                <li>
                  <Link to="/patient/patient-appointments">Appointments</Link>
                </li>
                <li>
                  <Link to="/patient/profile">Profile</Link>
                </li>
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item dropdown has-arrow logged-item">
                <Link to="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                  <span className="user-img">
                    <img className="rounded-circle" src="/assets/img/patients/patient.jpg" width="31" alt="Ryan Taylor" />
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  <div className="user-header">
                    <div className="avatar avatar-sm">
                      <img src="/assets/img/patients/patient.jpg" alt="User Image" className="avatar-img rounded-circle" />
                    </div>
                    <div className="user-text">
                      <h6>Patient Name</h6>
                      <p className="text-muted mb-0">Patient</p>
                    </div>
                  </div>
                  <Link className="dropdown-item" to="/patient/profile">My Profile</Link>
                  <Link className="dropdown-item" to="/patient/patient-appointments">Appointments</Link>
                  <Link className="dropdown-item" to="/patient/search-doctor1">Find Doctor</Link>
                  <Link className="dropdown-item" to="/">Logout</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
