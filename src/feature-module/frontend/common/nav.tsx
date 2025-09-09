import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../core/context/AuthContext";

const NavLinks: React.FC = () => {
  const [isSideDoctor, setSideDoctor] = useState("");
  const [isSidePatient, setSidePatient] = useState("");
  const [isSideAdmin, setSideAdmin] = useState("");
  const [isSideHome, setSideHome] = useState("");
  
  const Location = useLocation();
  const pathnames = Location.pathname;
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;

  // Reset dropdown states when authentication changes
  useEffect(() => {
    // Immediately close all dropdowns when authentication changes
    setSideDoctor("");
    setSidePatient("");
    setSideAdmin("");
    setSideHome("");
    
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

  const toggleSidebarAdmin = (value: string) => {
    setSideAdmin(value);
  };

  const toggleSidebarHome = (value: string) => {
    setSideHome(value);
  };

  // Helper function to determine if a module should be visible
  const shouldShowModule = (moduleType: 'doctor' | 'patient' | 'admin') => {
    // If not authenticated, show all modules
    if (!isAuthenticated) {
      return true;
    }
    
    // If authenticated, only show the user's own module
    return userType === moduleType;
  };

  return (
    <>
      {/* Home Dropdown */}
      <li className={`has-submenu ${pathnames.includes("home") || pathnames.includes("index") ? "active" : ""}`}>
        <Link
          to="#"
          className={isSideHome === "home" ? "subdrop" : ""}
          onClick={() => toggleSidebarHome(isSideHome === "home" ? "" : "home")}
          onMouseEnter={() => toggleSidebarHome("home")}
        >
          Home <i className="fas fa-chevron-down" />
        </Link>
        {isSideHome === "home" && (
          <ul className="submenu d-block">

            <li>
              <Link to="/specialty-doctors?specialty=primary-care" onClick={() => onhandleCloseMenu()}>
                Primary Care Physicians
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=dentists" onClick={() => onhandleCloseMenu()}>
                Dentists
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=obgyn" onClick={() => onhandleCloseMenu()}>
                OBGYNs
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=psychologists" onClick={() => onhandleCloseMenu()}>
                Psychologists
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=psychiatrists" onClick={() => onhandleCloseMenu()}>
                Psychiatrists
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=therapists" onClick={() => onhandleCloseMenu()}>
                Therapist-Counselors
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=urgent-care" onClick={() => onhandleCloseMenu()}>
                Urgent Care
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=chiropractors" onClick={() => onhandleCloseMenu()}>
                Chiropractors
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=optometrists" onClick={() => onhandleCloseMenu()}>
                Optometrists
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=ophthalmologists" onClick={() => onhandleCloseMenu()}>
                Ophthalmologists
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=podiatrists" onClick={() => onhandleCloseMenu()}>
                Podiatrists
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=pediatricians" onClick={() => onhandleCloseMenu()}>
                Pediatricians
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=dermatologists" onClick={() => onhandleCloseMenu()}>
                Dermatologists
              </Link>
            </li>
            <li>
              <Link to="/specialty-doctors?specialty=orthopedic-surgeons" onClick={() => onhandleCloseMenu()}>
                Orthopedic Surgeons
              </Link>
            </li>
          </ul>
        )}
      </li>

      {/* Doctors Dropdown - Only show if not authenticated or if user is doctor */}
      {shouldShowModule('doctor') && (
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
            {/* Show Register/Login if not authenticated as doctor */}
            {!isAuthenticated || userType !== 'doctor' ? (
              <>
                <li className={pathnames.includes("doctor-register") ? "active" : ""}>
                  <Link to="/doctor/doctor-register" onClick={() => onhandleCloseMenu()}>
                    Register/Login
                  </Link>
                </li>
              </>
            ) : (
              /* Show doctor features if authenticated as doctor */
              <>
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
              </>
            )}
          </ul>
        )}
      </li>
      )}

      {/* Patients Dropdown - Only show if not authenticated or if user is patient */}
      {shouldShowModule('patient') && (
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
            {/* Show Register/Login if not authenticated as patient */}
            {!isAuthenticated || userType !== 'patient' ? (
              <>
                <li className={pathnames.includes("patient-signup") ? "active" : ""}>
                  <Link to="/pages/patient-signup" onClick={() => onhandleCloseMenu()}>
                    Register/Login
                  </Link>
                </li>
                <li>
                  <Link to="/booking" onClick={() => onhandleCloseMenu()}>
                    Book Appointment
                  </Link>
                </li>
              </>
            ) : (
              /* Show patient features if authenticated as patient */
              <>
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
                <li className={pathnames.includes("doctor-ratings") ? "active" : ""}>
                  <Link to="/patient/doctor-ratings" onClick={() => onhandleCloseMenu()}>
                    View Doctor Ratings
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
              </>
            )}
          </ul>
        )}
      </li>
      )}

      {/* Admin Dropdown - Only show if not authenticated or if user is admin */}
      {shouldShowModule('admin') && (
      <li className={`has-submenu ${pathnames.includes("/admin") ? "active" : ""}`}>
        <Link
          to="#"
          className={isSideAdmin === "admin" ? "subdrop" : ""}
          onClick={() => toggleSidebarAdmin(isSideAdmin === "admin" ? "" : "admin")}
          onMouseEnter={() => toggleSidebarAdmin("admin")}
        >
          Admin <i className="fas fa-chevron-down" />
        </Link>
        {isSideAdmin === "admin" && (
          <ul className="submenu d-block">
            {/* Show Login if not authenticated as admin */}
            {!isAuthenticated || userType !== 'admin' ? (
              <>
                <li className={pathnames.includes("admin/login") ? "active" : ""}>
                  <Link to="/admin/login" onClick={() => onhandleCloseMenu()}>
                    Login
                  </Link>
                </li>
              </>
            ) : (
              /* Show admin features if authenticated as admin */
              <>
                <li className={pathnames.includes("admin") ? "active" : ""}>
                  <Link to="/admin" onClick={() => onhandleCloseMenu()}>
                    Dashboard
                  </Link>
                </li>
                <li className={pathnames.includes("admin/doctor-list") ? "active" : ""}>
                  <Link to="/admin/doctor-list" onClick={() => onhandleCloseMenu()}>
                    Manage Doctors
                  </Link>
                </li>
                <li className={pathnames.includes("admin/patient-list") ? "active" : ""}>
                  <Link to="/admin/patient-list" onClick={() => onhandleCloseMenu()}>
                    Manage Patients
                  </Link>
                </li>
                <li className={pathnames.includes("admin/reviews") ? "active" : ""}>
                  <Link to="/admin/reviews" onClick={() => onhandleCloseMenu()}>
                    Manage Ratings
                  </Link>
                </li>
                <li className={pathnames.includes("admin/appointment-list") ? "active" : ""}>
                  <Link to="/admin/appointment-list" onClick={() => onhandleCloseMenu()}>
                    Manage Appointments
                  </Link>
                </li>
              </>
            )}
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
    </>
  );
};

export default NavLinks;
