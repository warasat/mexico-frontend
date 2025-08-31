import React from 'react'
import { doctordashboardprofile06 } from '../../imagepath'
import { Link } from 'react-router-dom'

const PatientSidebar: React.FC = () => {
    return (
        <div>
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
                                Female <i className="fa-solid fa-circle" /> 32 years 03
                                Months
                            </span>
                        </div>
                    </div>
                </div>
                <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                        <ul>
                            <li className="active">
                                <Link to="/patient/dashboard">
                                    <i className="fa-solid fa-shapes" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/patient/patient-appointments">
                                    <i className="fa-solid fa-calendar-days" />
                                    <span>My Appointments</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/patient/profile">
                                    <i className="fa-solid fa-user-pen" />
                                    <span>Profile Settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/patient/change-password">
                                    <i className="fa-solid fa-key" />
                                    <span>Change Password</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default PatientSidebar
