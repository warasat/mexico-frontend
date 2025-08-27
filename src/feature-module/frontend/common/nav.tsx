import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavLinks: React.FC = () => {
  const [isSideMenu, setSideMenu] = useState("");
  const [isSideDoctor, setSideDoctor] = useState("");
  const [isSidePatient, setSidePatient] = useState("");
  const [isSideAdmin, setSideAdmin] = useState("");
  const [isSideHome, setSideHome] = useState("");
  
  const Location = useLocation();
  const pathnames = Location.pathname;

  const onhandleCloseMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  const toggleSidebar = (value: string) => {
    setSideMenu(value);
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
              <Link to="/home-2" onClick={() => onhandleCloseMenu()}>
                General Home
              </Link>
            </li>
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

      {/* Doctors Dropdown */}
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
            <li className={pathnames.includes("doctor-register") ? "active" : ""}>
              <Link to="/doctor/doctor-register" onClick={() => onhandleCloseMenu()}>
                Register & Profile Approval
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
          </ul>
        )}
      </li>

      {/* Patients Dropdown */}
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
            <li className={pathnames.includes("patient-signup") || pathnames.includes("login") ? "active" : ""}>
              <Link to="/pages/patient-signup" onClick={() => onhandleCloseMenu()}>
                Register / Login
              </Link>
            </li>
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
            <li className={pathnames.includes("doctor-profile") ? "active" : ""}>
              <Link to="/patient/doctor-profile" onClick={() => onhandleCloseMenu()}>
                View Doctor Profile & Ratings
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

      {/* Admin Dropdown */}
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
            <li className={pathnames.includes("admin/login") ? "active" : ""}>
              <Link to="/admin/login" onClick={() => onhandleCloseMenu()}>
                Admin Login & Dashboard
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
          </ul>
        )}
      </li>

      {/* About */}
      <li className={pathnames.includes("aboutus") ? "active" : ""}>
        <Link to="/pages/aboutus" onClick={() => onhandleCloseMenu()}>
          About
        </Link>
      </li>

      {/* Contact */}
      <li className={pathnames.includes("contactus") ? "active" : ""}>
        <Link to="/pages/contactus" onClick={() => onhandleCloseMenu()}>
          Contact
        </Link>
      </li>
    </>
  );
};

export default NavLinks;
