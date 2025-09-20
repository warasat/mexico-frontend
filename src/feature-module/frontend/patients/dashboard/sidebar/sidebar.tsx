import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { doctordashboardprofile06 } from "../../../imagepath";
import patientProfileService, { type PatientProfileDto } from "../../../../../core/services/patientProfileService";
import { useAuth } from "../../../../../core/context/AuthContext";

export const DashboardSidebar: React.FC = () => {
  const pathnames = window.location.pathname;
  const [profile, setProfile] = useState<PatientProfileDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { authState } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await patientProfileService.getMe();
        setProfile(res.profile || null);
      } catch {
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    })();
    const onUpdated = async () => {
      try {
        setIsUpdating(true);
        const res = await patientProfileService.getMe();
        setProfile(res.profile || null);
      } catch {}
      finally {
        setIsUpdating(false);
      }
    };
    window.addEventListener('patientProfileUpdated', onUpdated);
    return () => window.removeEventListener('patientProfileUpdated', onUpdated);
  }, []);

  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || authState?.user?.name || 'Loading...';
  const patientId = useMemo(() => {
    if (authState?.user?.patientId) return authState.user.patientId;
    const userId = authState?.user?.id || '';
    if (!userId) return 'Loading...';
    const suffix = userId.slice(-6).toUpperCase();
    return `PT${suffix}`;
  }, [authState?.user?.patientId, authState?.user?.id]);
  const gender = (profile as any)?.gender || 'Loading...';
  const ageText = (() => {
    if (!profile?.dateOfBirth) return 'Loading...';
    try {
      const dob = new Date(profile.dateOfBirth);
      const now = new Date();
      let years = now.getFullYear() - dob.getFullYear();
      let months = now.getMonth() - dob.getMonth();
      if (months < 0) { years -= 1; months += 12; }
      return `${years} years ${String(months).padStart(2, '0')} Months`;
    } catch { return 'Loading...'; }
  })();
  return (
    <>
      {/* Profile Sidebar */}
      <div className="profile-sidebar patient-sidebar profile-sidebar-new">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <Link to="/patient/profile" className="booking-doc-img">
              {isLoading ? (
                <div className="placeholder-img" style={{width: '100%', height: '100%', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div style={{position: 'relative'}}>
                  <img src={(profile as any)?.profileImage?.url || doctordashboardprofile06} alt="User Image" />
                  {isUpdating && (
                    <div style={{position: 'absolute', top: '5px', right: '5px', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '50%', padding: '2px'}}>
                      <div className="spinner-border spinner-border-sm text-white" role="status" style={{width: '12px', height: '12px'}}>
                        <span className="visually-hidden">Updating...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Link>
            <div className="profile-det-info">
              <h3>
                <Link to="/patient/profile">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '120px'}}></div>
                  ) : (
                    <span style={{opacity: isUpdating ? 0.7 : 1}}>
                      {fullName}
                    </span>
                  )}
                </Link>
              </h3>
              <div className="patient-details">
                <h5 className="mb-0">
                  Patient ID : 
                  {isLoading ? (
                    <span className="placeholder-text" style={{height: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '80px', display: 'inline-block', marginLeft: '5px'}}></span>
                  ) : (
                    <span style={{opacity: isUpdating ? 0.7 : 1}}>
                      {patientId}
                    </span>
                  )}
                </h5>
              </div>
              <span>
                {isLoading ? (
                  <div className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '100px', display: 'inline-block'}}></div>
                ) : (
                  <span style={{opacity: isUpdating ? 0.7 : 1}}>
                    {gender} <i className="fa-solid fa-circle" /> {ageText}
                  </span>
                )}
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
