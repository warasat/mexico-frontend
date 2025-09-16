import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { doctordashboardprofile06 } from "../../../imagepath";
import patientProfileService, { type PatientProfileDto } from "../../../../../core/services/patientProfileService";
import { useAuth } from "../../../../../core/context/AuthContext";

export const DashboardSidebar: React.FC = () => {
  const pathnames = window.location.pathname;
  const [profile, setProfile] = useState<PatientProfileDto | null>(null);
  const { authState } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await patientProfileService.getMe();
        setProfile(res.profile || null);
      } catch {
        setProfile(null);
      }
    })();
    const onUpdated = async () => {
      try {
        const res = await patientProfileService.getMe();
        setProfile(res.profile || null);
      } catch {}
    };
    window.addEventListener('patientProfileUpdated', onUpdated);
    return () => window.removeEventListener('patientProfileUpdated', onUpdated);
  }, []);

  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Hendrita';
  const patientId = useMemo(() => {
    if (authState?.user?.patientId) return authState.user.patientId;
    const userId = authState?.user?.id || '';
    if (!userId) return 'PT254654';
    const suffix = userId.slice(-6).toUpperCase();
    return `PT${suffix}`;
  }, [authState?.user?.patientId, authState?.user?.id]);
  const gender = (profile as any)?.gender || 'Female';
  const ageText = (() => {
    if (!profile?.dateOfBirth) return '32 years 03 Months';
    try {
      const dob = new Date(profile.dateOfBirth);
      const now = new Date();
      let years = now.getFullYear() - dob.getFullYear();
      let months = now.getMonth() - dob.getMonth();
      if (months < 0) { years -= 1; months += 12; }
      return `${years} years ${String(months).padStart(2, '0')} Months`;
    } catch { return '32 years 03 Months'; }
  })();
  return (
    <>
      {/* Profile Sidebar */}
      <div className="profile-sidebar patient-sidebar profile-sidebar-new">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <Link to="/patient/profile" className="booking-doc-img">
              <img src={(profile as any)?.profileImage?.url || doctordashboardprofile06} alt="User Image" />
            </Link>
            <div className="profile-det-info">
              <h3>
                <Link to="/patient/profile">{fullName}</Link>
              </h3>
              <div className="patient-details">
                <h5 className="mb-0">Patient ID : {patientId}</h5>
              </div>
              <span>
                {gender} <i className="fa-solid fa-circle" /> {ageText}
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-widget">
          <nav className="dashboard-menu">
            <ul>
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
            </ul>
          </nav>
        </div>
      </div>
      {/* /Profile Sidebar */}
    </>

  );
};
export default DashboardSidebar;
