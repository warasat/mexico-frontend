import { Link } from "react-router-dom";
import { doctorprofileimg } from "../../imagepath";
import Select from 'react-select'
const DoctorSidebar = () => {
  const pathnames = window.location.pathname;

  const availablity = [
    { value: 'I am Available Now', label: 'I am Available Now' },
    { value: 'Not Available', label: 'Not Available' },
  ]

  return (
    <>
      {/* Profile Sidebar */}
      <div className="profile-sidebar doctor-sidebar profile-sidebar-new">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <Link to="/patient/doctor-profile" className="booking-doc-img">
              <img
                src={doctorprofileimg}
                alt="User Image"
              />
            </Link>
            <div className="profile-det-info">
              <h3>
                <Link to="/patient/doctor-profile">Dr Edalin Hendry</Link>
              </h3>
              <div className="patient-details">
                <h5 className="mb-0">
                  BDS, MDS - Oral &amp; Maxillofacial Surgery
                </h5>
              </div>
              <span className="badge doctor-role-badge">
                <i className="fa-solid fa-circle" />
                Dentist
              </span>
            </div>
          </div>
        </div>
        <div className="doctor-available-head">
          <div className="">
            <label className="form-label">
              Availability <span className="text-danger">*</span>
            </label>

            <Select
              className='select'
              options={availablity}
              defaultValue={availablity[0]} />

          </div>
        </div>
        <div className="dashboard-widget">
          <nav className="dashboard-menu">
            <ul>
              <li className={pathnames.includes("/doctor/doctor-dashboard") ? "active" : ""}>

                <Link to="/doctor/doctor-dashboard">
                <i className="isax isax-category-2 me-2"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className={pathnames.includes("/doctor/doctor-request") ? "active" : ""}>
                <Link to="/doctor/doctor-request">
                <i className="isax isax-clipboard-tick me-2"></i>
                  <span>Requests</span>
                  <small className="unread-msg">2</small>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/doctor-appointments-grid") || pathnames.includes('/doctor/appointments') || pathnames.includes('/doctor/doctor-appointment-start') || pathnames.includes('/doctor/doctor-upcoming-appointment') || pathnames.includes("/doctor/doctor-cancelled-appointment-2") || pathnames.includes('/doctor/doctor-cancelled-appointment') ? "active" : ""
                }
              >
                <Link to="/doctor/appointments">
                <i className="isax isax-calendar-1 me-2"></i>
                  <span>Appointments</span>
                </Link>
              </li>

              <li className={pathnames.includes('/doctor/available-timings') ? 'active' : ''}>
                <Link to="/doctor/available-timings">
                <i className="isax isax-calendar-tick me-2"></i>
                  <span>Available Timings</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/my-patients') || pathnames.includes('/doctor/patient-profile') ? "active" : ''}>
                <Link to="/doctor/my-patients">
                <i className="fa-solid fa-user-injured me-2"></i>
                  <span>My Patients</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/doctor-specialities') ? 'active' : ''}>
                <Link to="/doctor/doctor-specialities">
                <i className="isax isax-clock me-2"></i>
                  <span>Specialties &amp; Services</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/review') ? 'active' : ''}>
                <Link to="/doctor/review">
                <i className="isax isax-star-1 me-2"></i>
                  <span>Reviews</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/account') ? 'active' : ''}>

                <Link to="/doctor/account">
                <i className="isax isax-profile-tick me-2"></i>
                  <span>Accounts</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/invoices') ? 'active' : ''}>
                <Link to="/doctor/invoices">
                <i className="isax isax-document-text me-2"></i>
                  <span>Invoices</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/doctor-payment') ? 'active' : ''}>
                <Link to="/doctor/doctor-payment">
                <i className="fa-solid fa-money-bill-1 me-2"></i>
                  <span>Payout Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/doctor/chat-doctor">
                <i className="isax isax-messages-1 me-2"></i>
                  <span>Message</span>
                  <small className="unread-msg">7</small>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/profile-setting') || pathnames.includes('/doctor/doctor-experience') || pathnames.includes('/doctor/education') || pathnames.includes('/doctor/doctor-awards-settings') || pathnames.includes('/doctor/doctor-insurance-settings') || pathnames.includes('/doctor/doctor-clinics-settings') || pathnames.includes('doctor/doctor-business-settings') ? 'active' : ''}>
                <Link to="/doctor/profile-setting">
                <i className="isax isax-setting-2 me-2"></i>
                  <span>Profile Settings</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/social-media') ? 'active' : ''}>
                <Link to="/doctor/social-media">
                <i className="fa-solid fa-shield-halved me-2"></i>
                  <span>Social Media</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/doctor-change-password') ? 'active' : ''}>
                <Link to="/doctor/doctor-change-password">
                <i className="isax isax-key me-2"></i>
                  <span>Change Password</span>
                </Link>
              </li>
              <li className={pathnames.includes("/login") ? 'active' : ''}>
                <Link to="/login">
                <i className="isax isax-logout me-2"></i>
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

export default DoctorSidebar;
