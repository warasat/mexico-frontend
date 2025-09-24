import { useState, useEffect } from "react";
import Header from "../../header";
import DoctorSidebar from "../sidebar";
import DoctorFooter from "../../common/doctorFooter";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useAuth } from "../../../../core/context/AuthContext";
import { appointmentService, type Appointment } from "../../../../core/services/appointmentService";
import SocketService from "../../../../core/services/socketService";
import { useGlobalTranslation } from "../../../../hooks/useGlobalTranslation";

const Appointments = (props: any) => {
  const { t } = useGlobalTranslation();
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!isAuthenticated || userType !== 'doctor') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await appointmentService.getDoctorAppointments();
        
        if (response.success) {
          setAppointments(response.data);
        } else {
          setError('Failed to fetch appointments');
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isAuthenticated, userType, authState.user?.id]);

  // Socket.IO integration for real-time updates
  useEffect(() => {
    if (!isAuthenticated || userType !== 'doctor' || !authState.user?.id) {
      return;
    }

    const socketService = SocketService.getInstance();
    
    // Join doctor room
    socketService.joinDoctorRoom(authState.user.id);

    // Subscribe to appointment events
    const unsubscribeAppointmentCreated = socketService.subscribe('appointmentCreated', (data: { doctorId: string; appointment: Appointment }) => {
      if (data.doctorId === authState.user?.id) {
        console.log('New appointment created for doctor:', data.appointment);
        setAppointments(prev => [data.appointment, ...prev]);
      }
    });

    const unsubscribeAppointmentUpdated = socketService.subscribe('appointmentUpdated', (data: { appointmentId: string; appointment: Appointment }) => {
      console.log('Appointment updated:', data.appointment);
      setAppointments(prev => 
        prev.map(apt => 
          apt._id === data.appointmentId ? data.appointment : apt
        )
      );
    });

    const unsubscribeAppointmentCancelled = socketService.subscribe('appointmentCancelled', (data: { appointmentId: string; appointment: Appointment }) => {
      console.log('Appointment cancelled:', data.appointment);
      setAppointments(prev => 
        prev.map(apt => 
          apt._id === data.appointmentId ? data.appointment : apt
        )
      );
    });

    // Cleanup on unmount
    return () => {
      if (authState.user?.id) {
        socketService.leaveDoctorRoom(authState.user.id);
      }
      unsubscribeAppointmentCreated();
      unsubscribeAppointmentUpdated();
      unsubscribeAppointmentCancelled();
    };
  }, [isAuthenticated, userType, authState.user?.id]);

  // Function to get the appropriate home redirect URL based on user type
  const getHomeRedirectUrl = () => {
    if (isAuthenticated && userType === 'doctor') {
      return '/doctor/doctor-dashboard';
    } else if (isAuthenticated && userType === 'patient') {
      return '/index';
    } else if (isAuthenticated && userType === 'admin') {
      return '/admin/dashboard';
    }
    return '/index'; // Default to landing page for unauthenticated users
  };

  // Helper function to render appointment item (doctor's view - shows patient info)
  const renderAppointmentItem = (appointment: Appointment) => {
    // Get patient profile image with fallback
    const patientImage = appointment.patient?.profileImage || '/src/assets/admin/assets/img/profiles/avatar-01.jpg';
    const appointmentDate = new Date(appointment.date);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const formattedTime = appointment.timeSlot;
    
    // Get patient name with proper fallback
    const patientName = appointment.patientName || appointment.patient?.fullName || '';
    
    console.log('Rendering patient image for appointment:', {
      appointmentId: appointment.appointmentId,
      patientName: patientName,
      patientImage: patientImage,
      hasProfileImage: !!appointment.patient?.profileImage
    });

    return (
      <div className="appointment-wrap" key={appointment._id}>
        <ul>
          <li>
            <div className="patinet-information">
              <Link to={`/doctor/doctor-upcoming-appointment?id=${appointment._id}`}>
                <img
                  src={patientImage}
                  alt="Patient Image"
                  onError={(e) => {
                    console.log('Patient image failed to load:', patientImage);
                    const target = e.target as HTMLImageElement;
                    target.src = '/src/assets/admin/assets/img/profiles/avatar-01.jpg';
                  }}
                  onLoad={() => {
                    console.log('Patient image loaded successfully:', patientImage);
                  }}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '50%',
                    border: '2px solid #e9ecef'
                  }}
                />
              </Link>
              <div className="patient-info">
                <p>#{appointment.appointmentId}</p>
                <h6>
                  <Link to={`/doctor/doctor-upcoming-appointment?id=${appointment._id}`}>
                    {patientName || 'Loading...'}
                  </Link>
                </h6>
              </div>
            </div>
          </li>
          <li className="appointment-info">
            <p>
              <i className="fa-solid fa-clock" />
              {formattedDate} {formattedTime}
            </p>
            <ul className="d-flex apponitment-types">
              <li>{appointment.service}</li>
              <li>{appointment.mode === 'video' ? 'Video Call' : 'Clinic Visit'}</li>
            </ul>
          </li>
          <li className="mail-info-patient">
            <ul>
              <li>
                <i className="fa-solid fa-envelope" />
                {appointment.patientEmail || appointment.patient?.email || 'N/A'}
              </li>
              <li>
                <i className="fa-solid fa-phone" />
                {appointment.patientPhone || appointment.patient?.phone || 'N/A'}
              </li>
            </ul>
          </li>
          <li className="appointment-detail-btn">
            {appointment.mode === 'video' ? (
              <Link
                to="#"
                className="start-link"
                onClick={(e) => {
                  e.preventDefault();
                  // Open Google Meet landing page in new tab
                  window.open(import.meta.env.VITE_GOOGLE_MEET_URL, '_blank');
                }}
              >
                {t("doctor.appointments.googleMeet")}
                <i className="fa-brands fa-google me-1" />
              </Link>
            ) : (
              <Link
                to="#"
                className="start-link"
                onClick={(e) => {
                  e.preventDefault();
                  // Clinic visit functionality can be implemented here
                  alert('Clinic visit details will be implemented here');
                }}
              >
                {t("doctor.appointments.clinicVisit")}
                <i className="fa-solid fa-hospital me-1" />
              </Link>
            )}
          </li>
        </ul>
      </div>
    );
  };

  // Filter appointments by boolean fields
  const upcomingAppointments = appointments.filter(apt => !apt.isCompleted && !apt.cancelled);
  const cancelledAppointments = appointments.filter(apt => apt.cancelled);
  const completedAppointments = appointments.filter(apt => apt.isCompleted);

  // Render loading state
  if (loading) {
    return (
      <>
        <Header {...props} />
        <div className="doctor-content">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3" data-key="doctor.appointments.loading">{t("doctor.appointments.loading")}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <Header {...props} />
        <div className="doctor-content">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="alert alert-danger" role="alert">
                  <h4 className="alert-heading">Error!</h4>
                  <p>{error}</p>
                  <hr />
                  <p className="mb-0">
                    <button 
                      className="btn btn-primary" 
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header {...props} />
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={getHomeRedirectUrl()}>
                        <i className="isax isax-home-15" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Doctor
                    </li>
                    <li className="breadcrumb-item active">Appointments</li>
                  </ol>
                  <h2 className="breadcrumb-title" data-key="doctor.appointments.title">{t("doctor.appointments.title")}</h2>
                </nav>
              </div>
            </div>
          </div>
          <div className="breadcrumb-bg">
          <ImageWithBasePath
              src="assets/img/bg/breadcrumb-bg-01.png"
              alt="img"
              className="breadcrumb-bg-01"
            />
            <ImageWithBasePath
              src="assets/img/bg/breadcrumb-bg-02.png"
              alt="img"
              className="breadcrumb-bg-02"
            />
            <ImageWithBasePath
              src="assets/img/bg/breadcrumb-icon.png"
              alt="img"
              className="breadcrumb-bg-03"
            />
            <ImageWithBasePath
              src="assets/img/bg/breadcrumb-icon.png"
              alt="img"
              className="breadcrumb-bg-04"
            />
          </div>
        </div>
        {/* /Breadcrumb */}
      </>

      {/* Page Content */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3 theiaStickySidebar">
              {/* Profile Sidebar */}
              <DoctorSidebar />
              {/* /Profile Sidebar */}
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="dashboard-header">
                <h3 data-key="doctor.appointments.title">{t("doctor.appointments.title")}</h3>
                <ul className="header-list-btns">
                  <li>
                    <div className="input-block dash-search-input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("common.search")}
                        data-key="common.search"
                      />
                      <span className="search-icon">
                        <i className="fa-solid fa-magnifying-glass" />
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="appointment-tab-head">
                <div className="appointment-tabs">
                  <ul
                    className="nav nav-pills inner-tab "
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-upcoming-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-upcoming"
                        type="button"
                        role="tab"
                        aria-controls="pills-upcoming"
                        aria-selected="false"
                      >
                        {t("doctor.appointments.upcoming")}<span>{upcomingAppointments.length}</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-cancel-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-cancel"
                        type="button"
                        role="tab"
                        aria-controls="pills-cancel"
                        aria-selected="true"
                      >
                        {t("doctor.appointments.cancelled")}<span>{cancelledAppointments.length}</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-complete-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-complete"
                        type="button"
                        role="tab"
                        aria-controls="pills-complete"
                        aria-selected="true"
                      >
                        {t("doctor.appointments.completed")}<span>{completedAppointments.length}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab-content appointment-tab-content">
                <div
                  className="tab-pane fade show active"
                  id="pills-upcoming"
                  role="tabpanel"
                  aria-labelledby="pills-upcoming-tab"
                >
                  {/* Dynamic Appointment List */}
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map(appointment => renderAppointmentItem(appointment))
                  ) : (
                    <div className="text-center py-5">
                      <div className="alert alert-info" role="alert">
                        <h5>No Upcoming Appointments</h5>
                        <p>You don't have any upcoming appointments.</p>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-cancel"
                  role="tabpanel"
                  aria-labelledby="pills-cancel-tab"
                >
                  {/* Dynamic Cancelled Appointments */}
                  {cancelledAppointments.length > 0 ? (
                    cancelledAppointments.map(appointment => renderAppointmentItem(appointment))
                  ) : (
                    <div className="text-center py-5">
                      <div className="alert alert-info" role="alert">
                        <h5>No Cancelled Appointments</h5>
                        <p>You don't have any cancelled appointments.</p>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-complete"
                  role="tabpanel"
                  aria-labelledby="pills-complete-tab"
                >
                  {/* Dynamic Completed Appointments */}
                  {completedAppointments.length > 0 ? (
                    completedAppointments.map(appointment => renderAppointmentItem(appointment))
                  ) : (
                    <div className="text-center py-5">
                      <div className="alert alert-info" role="alert">
                        <h5>No Completed Appointments</h5>
                        <p>You don't have any completed appointments.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <DoctorFooter {...props} />
    </div>
  );
};

export default Appointments;
