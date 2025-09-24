/* eslint-disable no-empty */
import { Link } from "react-router-dom";
import Select from 'react-select'
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useEffect, useMemo, useState, useRef } from 'react'
import doctorProfileApi from "../../../../core/services/doctorProfileApi";
import { useGlobalTranslation } from "../../../../hooks/useGlobalTranslation";
const DoctorSidebar = () => {
  const { t } = useGlobalTranslation();
  const pathnames = window.location.pathname;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [availability, setAvailability] = useState<'available' | 'unavailable'>('unavailable')
  const hasInitialLoad = useRef(false)
  const availablity = useMemo(() => ([
    { value: 'available', label: t("doctor.sidebar.availableNow") },
    { value: 'unavailable', label: t("doctor.sidebar.notAvailable") },
  ]), [t])

  useEffect(() => {
    (async () => {
      try {
        const res = await doctorProfileApi.getMe();
        const doc = res?.doctor;
        setProfile(doc || null)
        if (doc?.availability) setAvailability(doc.availability)
        hasInitialLoad.current = true
      } catch {}
      finally {
        setIsLoading(false)
      }
    })()
    const onUpdated = async () => {
      // Only update if we have already loaded the profile initially
      if (!hasInitialLoad.current) return
      try {
        setIsUpdating(true)
        const res = await doctorProfileApi.getMe();
        setProfile(res?.doctor || null)
      } catch {}
      finally {
        setIsUpdating(false)
      }
    }
    window.addEventListener('doctorProfileUpdated', onUpdated)
    return () => window.removeEventListener('doctorProfileUpdated', onUpdated)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAvailabilityChange = async (opt: any) => {
    try {
      setAvailability(opt?.value)
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors/me/availability`, {
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
              {isLoading ? (
                <div className="placeholder-img" style={{width: '100%', height: '100%', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div style={{position: 'relative'}}>
                  {profile?.profileImage?.url ? (
                    <img src={profile.profileImage.url} alt="User Image" />
                  ) : (
                    <ImageWithBasePath src="assets/img/doctor-grid/doc1.png" alt="User Image" />
                  )}
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
                <Link to="/patient/doctor-profile">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '120px'}}></div>
                  ) : (
                    <span style={{opacity: isUpdating ? 0.7 : 1}}>
                      {profile?.displayName || [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Your Name'}
                    </span>
                  )}
                </Link>
              </h3>
              <div className="patient-details">
                <h5 className="mb-0">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '100px'}}></div>
                  ) : (
                    <span style={{opacity: isUpdating ? 0.7 : 1}}>
                      {profile?.designation || ''}
                    </span>
                  )}
                </h5>
              </div>
              <span className="badge doctor-role-badge">
                <i className="fa-solid fa-circle" />
                {isLoading ? (
                  <div className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '60px', display: 'inline-block'}}></div>
                ) : (
                  <span style={{opacity: isUpdating ? 0.7 : 1}}>
                    {profile?.designation || 'Doctor'}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="doctor-available-head">
          <div className="">
            <label className="form-label" data-key="doctor.sidebar.availability">
              {t("doctor.sidebar.availability")} <span className="text-danger">*</span>
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
                  <span data-key="doctor.sidebar.dashboard">{t("doctor.sidebar.dashboard")}</span>
                </Link>
              </li>

              <li
                className={
                  pathnames.includes("/doctor/doctor-appointments-grid") || pathnames.includes('/doctor/appointments') || pathnames.includes('/doctor/doctor-appointment-start') || pathnames.includes('/doctor/doctor-upcoming-appointment') || pathnames.includes("/doctor/doctor-cancelled-appointment-2") || pathnames.includes('/doctor/doctor-cancelled-appointment') ? "active" : ""
                }
              >
                <Link to="/doctor/appointments">
                <i className="isax isax-calendar-1 me-2"></i>
                  <span data-key="doctor.sidebar.appointments">{t("doctor.sidebar.appointments")}</span>
                </Link>
              </li>

              <li className={pathnames.includes('/doctor/available-timings') ? 'active' : ''}>
                <Link to="/doctor/available-timings">
                <i className="isax isax-calendar-tick me-2"></i>
                  <span data-key="doctor.sidebar.availableTimings">{t("doctor.sidebar.availableTimings")}</span>
                </Link>
              </li>
              <li className={pathnames.includes('/doctor/my-patients') || pathnames.includes('/doctor/patient-profile') ? "active" : ''}>
                <Link to="/doctor/my-patients">
                <i className="fa-solid fa-user-injured me-2"></i>
                  <span data-key="doctor.sidebar.myPatients">{t("doctor.sidebar.myPatients")}</span>
                </Link>
              </li>

              <li className={pathnames.includes('/doctor/profile-setting') || pathnames.includes('/doctor/doctor-experience') || pathnames.includes('/doctor/education') || pathnames.includes('/doctor/doctor-awards-settings') || pathnames.includes('/doctor/doctor-insurance-settings') || pathnames.includes('/doctor/doctor-clinics-settings') || pathnames.includes('doctor/doctor-business-settings') ? 'active' : ''}>
                <Link to="/doctor/profile-setting">
                <i className="isax isax-setting-2 me-2"></i>
                  <span data-key="doctor.sidebar.profileSettings">{t("doctor.sidebar.profileSettings")}</span>
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
