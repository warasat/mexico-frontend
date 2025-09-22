import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../core/context/AuthContext";

const NavLinks: React.FC = () => {
  const [isSideDoctor, setSideDoctor] = useState("");
  const [isSidePatient, setSidePatient] = useState("");
  const [isSideLogin, setSideLogin] = useState("");
  
  const Location = useLocation();
  const pathnames = Location.pathname;
  const { authState } = useAuth();
  const { isAuthenticated, userType, isLoading } = authState;

  // Reset dropdown states when authentication changes
  useEffect(() => {
    // Immediately close all dropdowns when authentication changes
    setSideDoctor("");
    setSidePatient("");
    setSideLogin("");
    
    // Also close the mobile menu if it's open
    const root = document.getElementsByTagName("html")[0];
    if (root.classList.contains("menu-opened")) {
      root.classList.remove("menu-opened");
    }
  }, [isAuthenticated, userType]);

  const onhandleCloseMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  const toggleSidebarDoctor = (value: string) => {
    setSideDoctor(value);
  };

  const toggleSidebarPatient = (value: string) => {
    setSidePatient(value);
  };

  const toggleSidebarLogin = (value: string) => {
    setSideLogin(value);
  };

  return (
    <>
      {/* Home - Simple Link - Hide for doctors */}
      {!(isAuthenticated && userType === 'doctor') && (
        <li>
          <Link to="/index" onClick={() => onhandleCloseMenu()}>
            Home
          </Link>
        </li>
      )}

      {/* Doctors Dropdown - Only show if authenticated as doctor */}
      {isAuthenticated && userType === 'doctor' && (
        <li className={`has-submenu ${pathnames.includes("/doctor") ? "active" : ""}`}>
        <Link
          to="#"
          className={isSideDoctor === "doctors" ? "subdrop" : ""}
          onClick={() => toggleSidebarDoctor(isSideDoctor === "doctors" ? "" : "doctors")}
          onMouseEnter={() => toggleSidebarDoctor("doctors")}
        >
          Doctors <i className="fas fa-chevron-down" />
        </Link>
        {isSideDoctor === "doctors" && (
          <ul className="submenu d-block">
            <li className={pathnames.includes("doctor-dashboard") ? "active" : ""}>
              <Link to="/doctor/doctor-dashboard" onClick={() => onhandleCloseMenu()}>
                Dashboard
              </Link>
            </li>
            <li className={pathnames.includes("available-timings") ? "active" : ""}>
              <Link to="/doctor/available-timings" onClick={() => onhandleCloseMenu()}>
                Manage Availability
              </Link>
            </li>
            <li className={pathnames.includes("appointments") ? "active" : ""}>
              <Link to="/doctor/appointments" onClick={() => onhandleCloseMenu()}>
                Appointments
              </Link>
            </li>
            <li className={pathnames.includes("my-patients") ? "active" : ""}>
              <Link to="/doctor/my-patients" onClick={() => onhandleCloseMenu()}>
                Patient History & Notes
              </Link>
            </li>
            <li className={pathnames.includes("profile-setting") ? "active" : ""}>
              <Link to="/doctor/profile-setting" onClick={() => onhandleCloseMenu()}>
                Profile Settings
              </Link>
            </li>
          </ul>
        )}
      </li>
      )}

      {/* Patients Dropdown - Only show if authenticated as patient */}
      {isAuthenticated && userType === 'patient' && (
      <li className={`has-submenu ${pathnames.includes("/patient") ? "active" : ""}`}>
        <Link
          to="#"
          className={isSidePatient === "patients" ? "subdrop" : ""}
          onClick={() => toggleSidebarPatient(isSidePatient === "patients" ? "" : "patients")}
          onMouseEnter={() => toggleSidebarPatient("patients")}
        >
          Patients <i className="fas fa-chevron-down" />
        </Link>
        {isSidePatient === "patients" && (
          <ul className="submenu d-block">
            <li className={pathnames.includes("profile") ? "active" : ""}>
              <Link to="/patient/profile" onClick={() => onhandleCloseMenu()}>
                Profile Management
              </Link>
            </li>
                <li className={pathnames.includes("search-doctor") ? "active" : ""}>
                  <Link to="/patient/search-doctor1" onClick={() => onhandleCloseMenu()}>
                    Search Doctors
                  </Link>
                </li>
            <li className={pathnames.includes("booking") ? "active" : ""}>
              <Link to="/booking" onClick={() => onhandleCloseMenu()}>
                Book Appointments
              </Link>
            </li>
            <li className={pathnames.includes("appointments") ? "active" : ""}>
              <Link to="/patient/patient-appointments" onClick={() => onhandleCloseMenu()}>
                Appointment History
              </Link>
            </li>
          </ul>
        )}
      </li>
      )}

      {/* About */}
      <li className={pathnames.includes("aboutus") ? "active" : ""}>
        <Link to="/aboutus" onClick={() => onhandleCloseMenu()}>
          About
        </Link>
      </li>

      {/* Contact */}
      <li className={pathnames.includes("contactus") ? "active" : ""}>
        <Link to="/contactus" onClick={() => onhandleCloseMenu()}>
          Contact
        </Link>
      </li>

      {/* Login Dropdown - Show if not authenticated and not loading */}
      {!isLoading && !isAuthenticated && (
        <li className={`has-submenu ${pathnames.includes("login") || pathnames.includes("signup") || pathnames.includes("register") ? "active" : ""}`}>
          <Link
            to="#"
            className={isSideLogin === "login" ? "subdrop" : ""}
            onClick={() => toggleSidebarLogin(isSideLogin === "login" ? "" : "login")}
            onMouseEnter={() => toggleSidebarLogin("login")}
          >
            Login <i className="fas fa-chevron-down" />
          </Link>
          {isSideLogin === "login" && (
            <ul className="submenu d-block">
              <li className={pathnames.includes("patient-signup") ? "active" : ""}>
                <Link to="/pages/patient-signup" onClick={() => onhandleCloseMenu()}>
                  Patient Login
                </Link>
              </li>
              <li className={pathnames.includes("doctor-register") ? "active" : ""}>
                <Link to="/doctor/doctor-register" onClick={() => onhandleCloseMenu()}>
                  Doctor Login
                </Link>
              </li>
            </ul>
          )}
        </li>
      )}
    </>
  );
};

export default NavLinks;
