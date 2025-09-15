import { Link } from "react-router-dom";
import Select from 'react-select'
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useEffect, useMemo, useState } from 'react'
import doctorProfileApi from "../../../../core/services/doctorProfileApi";
const DoctorSidebar = () => {
  const pathnames = window.location.pathname;

  const [profile, setProfile] = useState<any>(null)
  const [availability, setAvailability] = useState<'available' | 'unavailable'>('unavailable')
  const availablity = useMemo(() => ([
    { value: 'available', label: 'I am Available Now' },
    { value: 'unavailable', label: 'Not Available' },
  ]), [])

  useEffect(() => {
    (async () => {
      try {
        const res = await doctorProfileApi.getMe();
        const doc = res?.doctor;
        setProfile(doc || null)
        if (doc?.availability) setAvailability(doc.availability)
      } catch {}
    })()
    const onUpdated = async () => {
      try {
        const res = await doctorProfileApi.getMe();
        setProfile(res?.doctor || null)
      } catch {}
    }
    window.addEventListener('doctorProfileUpdated', onUpdated)
    return () => window.removeEventListener('doctorProfileUpdated', onUpdated)
  }, [])

  const onAvailabilityChange = async (opt: any) => {
    try {
      setAvailability(opt?.value)
      await fetch('http://localhost:5000/api/doctors/me/availability', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {})
        },
        body: JSON.stringify({ availability: opt?.value })
      })
    } catch {}
  }

  return (
    <>
      {/* Profile Sidebar */}
      <div className="profile-sidebar doctor-sidebar profile-sidebar-new">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <Link to="/patient/doctor-profile" className="booking-doc-img">
              {profile?.profileImage?.url ? (
                <img src={profile.profileImage.url} alt="User Image" />
              ) : (
                <ImageWithBasePath src="assets/img/doctor-grid/doc1.png" alt="User Image" />
              )}
            </Link>
            <div className="profile-det-info">
              <h3>
                <Link to="/patient/doctor-profile">{profile?.displayName || [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Your Name'}</Link>
              </h3>
              <div className="patient-details">
                <h5 className="mb-0">
                  {profile?.designation || ''}
                </h5>
              </div>
              <span className="badge doctor-role-badge">
                <i className="fa-solid fa-circle" />
                {profile?.designation || 'Doctor'}
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
              value={availablity.find(a => a.value === availability)}
              onChange={onAvailabilityChange}
            />

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

              <li className={pathnames.includes('/doctor/profile-setting') || pathnames.includes('/doctor/doctor-experience') || pathnames.includes('/doctor/education') || pathnames.includes('/doctor/doctor-awards-settings') || pathnames.includes('/doctor/doctor-insurance-settings') || pathnames.includes('/doctor/doctor-clinics-settings') || pathnames.includes('doctor/doctor-business-settings') ? 'active' : ''}>
                <Link to="/doctor/profile-setting">
                <i className="isax isax-setting-2 me-2"></i>
                  <span>Profile Settings</span>
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
