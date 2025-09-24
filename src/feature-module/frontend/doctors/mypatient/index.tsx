import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import DoctorFooter from "../../common/doctorFooter";
import DoctorSidebar from "../sidebar";
import { doctordashboardprofile01 } from "../../imagepath";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useAuth } from "../../../../core/context/AuthContext";
import { appointmentService, type Appointment } from "../../../../core/services/appointmentService";
import SocketService from "../../../../core/services/socketService";
import { useGlobalTranslation } from "../../../../hooks/useGlobalTranslation";

const MyPatient: React.FC = (props) => {
  const { t } = useGlobalTranslation();
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!isAuthenticated || userType !== 'doctor') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
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
  }, [isAuthenticated, userType]);

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

    // Cleanup on unmount
    return () => {
      if (authState.user?.id) {
        socketService.leaveDoctorRoom(authState.user.id);
      }
      unsubscribeAppointmentCreated();
      unsubscribeAppointmentUpdated();
    };
  }, [isAuthenticated, userType, authState.user?.id]);

  // Extract unique patients from appointments
  const getUniquePatients = () => {
    if (!appointments || appointments.length === 0) {
      return [];
    }

    // Create a map to store unique patients by patient ID
    const patientMap = new Map();
    
    appointments.forEach(appointment => {
      const patientId = appointment.patient._id;
      if (!patientMap.has(patientId)) {
        // Get the most recent appointment for this patient
        const patientAppointments = appointments.filter(apt => apt.patient._id === patientId);
        const mostRecentAppointment = patientAppointments.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];

        patientMap.set(patientId, {
          id: patientId,
          name: appointment.patientName || appointment.patient.fullName || 'Unknown Patient',
          email: appointment.patient.email || '',
          phone: appointment.patient.phone || '',
          imageUrl: doctordashboardprofile01,
          appointmentId: mostRecentAppointment.appointmentId,
          lastAppointmentDate: mostRecentAppointment.date,
          lastAppointmentTime: mostRecentAppointment.timeSlot,
          location: mostRecentAppointment.location,
          status: mostRecentAppointment.status,
          isCompleted: mostRecentAppointment.isCompleted,
          cancelled: mostRecentAppointment.cancelled,
          totalAppointments: patientAppointments.length
        });
      }
    });

    return Array.from(patientMap.values());
  };

  // Filter patients based on search term
  const filteredPatients = getUniquePatients().filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.appointmentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to render patient card
  const renderPatientCard = (patient: any) => {
    const formattedDate = formatDate(patient.lastAppointmentDate);
    const formattedTime = patient.lastAppointmentTime;

    return (
      <div className="col-xl-4 col-lg-6 col-md-6 d-flex" key={patient.id}>
        <div className="appointment-wrap appointment-grid-wrap" style={{
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          transition: 'all 0.3s ease',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        }}>
          <ul>
            <li>
              <div className="appointment-grid-head">
                <div className="patinet-information">
                  <Link to={`/doctor/patient-profile?id=${patient.id}`}>
                    <img
                      src={patient.imageUrl}
                      alt="Patient Image"
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        border: '3px solid #fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        objectFit: 'cover'
                      }}
                    />
                  </Link>
                  <div className="patient-info">
                    <p>{patient.appointmentId}</p>
                    <h6>
                      <Link to={`/doctor/patient-profile?id=${patient.id}`} style={{
                        color: '#2c3e50',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        {patient.name}
                      </Link>
                    </h6>
                    <ul>
                      <li>{t("doctor.myPatients.email")}: {patient.email}</li>
                      <li>{t("doctor.myPatients.phone")}: {patient.phone}</li>
                      <li>{t("doctor.myPatients.appointments")}: {patient.totalAppointments}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="appointment-info">
              <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '8px' }}>
                <i className="fa-solid fa-clock" style={{ color: '#007bff', marginRight: '8px' }} />
                {formattedDate} {formattedTime}
              </p>
              <p className="mb-0" style={{ color: '#6c757d', fontSize: '14px' }}>
                <i className="fa-solid fa-location-dot" style={{ color: '#28a745', marginRight: '8px' }} />
                {patient.location}
              </p>
            </li>
            <li className="appointment-action">
              <div className="patient-book">
                <p style={{ color: '#495057', fontSize: '13px', marginBottom: '0' }}>
                  <i className="isax isax-calendar-1" style={{ color: '#6f42c1', marginRight: '8px' }} />
                  {t("doctor.myPatients.lastBooking")} <span style={{ fontWeight: '600', color: '#2c3e50' }}>{formattedDate}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

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
                    <li className="breadcrumb-item active" data-key="doctor.myPatients.title">{t("doctor.myPatients.title")}</li>
                  </ol>
                  <h2 className="breadcrumb-title" data-key="doctor.myPatients.title">{t("doctor.myPatients.title")}</h2>
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
      <div className="content doctor-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3 theiaStickySidebar">
              {/* Profile Sidebar */}
              <DoctorSidebar />
              {/* /Profile Sidebar */}
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="dashboard-header">
                <h3 data-key="doctor.myPatients.title">{t("doctor.myPatients.title")}</h3>
                <ul className="header-list-btns">
                  <li>
                    <div className="input-block dash-search-input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("doctor.myPatients.searchPatients")}
                        data-key="doctor.myPatients.searchPatients"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="search-icon">
                        <i className="fa-solid fa-magnifying-glass" />
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="appointment-tab-content grid-patient">
                  <div className="row">
                  {loading ? (
                    <div className="col-12 text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3" data-key="doctor.myPatients.loading">{t("doctor.myPatients.loading")}</p>
                    </div>
                  ) : error ? (
                    <div className="col-12 text-center py-5">
                      <div className="alert alert-danger" role="alert">
                        <h6 data-key="doctor.myPatients.error">{t("doctor.myPatients.error")}</h6>
                        <p>{error}</p>
                      </div>
                    </div>
                  ) : filteredPatients.length === 0 ? (
                    <div className="col-12 text-center py-5">
                      <div className="alert alert-info" role="alert">
                        <h6>No patients found</h6>
                        <p>You don't have any patients yet.</p>
                      </div>
                    </div>
                  ) : (
                    filteredPatients.map(renderPatientCard)
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <DoctorFooter />
    </div>
  );
};

export default MyPatient;
