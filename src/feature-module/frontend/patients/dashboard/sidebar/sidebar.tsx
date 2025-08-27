import React from "react";
import { Link } from "react-router-dom";
import { doctordashboardprofile06 } from "../../../imagepath";

export const DashboardSidebar: React.FC = () => {
  const pathnames = window.location.pathname;
  return (
    <>
      {/* Profile Sidebar */}
      <div className="profile-sidebar patient-sidebar profile-sidebar-new">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <Link to="/patient/profile" className="booking-doc-img">
              <img
                src={doctordashboardprofile06}
                alt="User Image"
              />
            </Link>
            <div className="profile-det-info">
              <h3>
                <Link to="/patient/profile">Hendrita</Link>
              </h3>
              <div className="patient-details">
                <h5 className="mb-0">Patient ID : PT254654</h5>
              </div>
              <span>
                Female <i className="fa-solid fa-circle" /> 32 years 03 Months
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-widget">
          <nav className="dashboard-menu">
            <ul>
              <li className={pathnames.includes('/patient/dashboard') ? 'active' : ''}>
                <Link to="/patient/dashboard">
                  <i className="isax isax-category-2"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className={pathnames.includes('/patient/patient-appointments') || pathnames.includes('/patient/appoinment-grid') || pathnames.includes('/patient/patient-cancelled-appointment') || pathnames.includes('/patient/patient-cancelled-appointment') || pathnames.includes('/patient/patient-completed-appointment') || pathnames.includes('/patient/upcoming-appointment') ? 'active' : ''}>

                <Link to="/patient/patient-appointments">
                  <i className="isax isax-calendar-1"></i>
                  <span>My Appointments</span>
                </Link>
              </li>

              <li className={pathnames.includes('/patient/profile') ? 'active' : pathnames.includes('/patient/change-password') ? 'active' : pathnames.includes('/patient/two-factor-authentication') ? 'active' : pathnames.includes('/patient/delete-account') ? 'active' : ''}>

                <Link to="/patient/profile">
                  <i className="isax isax-setting-2"></i>
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="isax isax-logout"></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* /Profile Sidebar */}
    </>

  );
};
export default DashboardSidebar;
