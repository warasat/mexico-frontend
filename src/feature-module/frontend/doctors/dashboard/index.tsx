import DoctorSidebar from "../sidebar";
import Header from "../../header";
import {
  doctordashboardprofile01,
} from "../../imagepath";
import DoctorFooter from "../../common/doctorFooter";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useAuth } from "../../../../core/context/AuthContext";
import { useState, useEffect } from "react";
import { appointmentService, type Appointment } from "../../../../core/services/appointmentService";
import SocketService from "../../../../core/services/socketService";

const DoctorDashboard = (props: any) => {
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate unique patient counts from appointments data
  const getPatientCounts = () => {
    if (!appointments || appointments.length === 0) {
      console.log('📊 No appointments found, returning zero counts');
      return { totalPatients: 0, todayPatients: 0 };
    }

    // Get unique patient IDs from all appointments
    const uniquePatientIds = new Set(
      appointments.map(appointment => appointment.patient._id)
    );
    const totalPatients = uniquePatientIds.size;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Get unique patient IDs from today's appointments
    const todayAppointments = appointments.filter(appointment => 
      appointment.date === today
    );
    const uniqueTodayPatientIds = new Set(
      todayAppointments.map(appointment => appointment.patient._id)
    );
    const todayPatients = uniqueTodayPatientIds.size;

    console.log('📊 Patient Count Analysis:', {
      totalAppointments: appointments.length,
      uniquePatientIds: Array.from(uniquePatientIds),
      totalPatients,
      todayAppointments: todayAppointments.length,
      uniqueTodayPatientIds: Array.from(uniqueTodayPatientIds),
      todayPatients,
      today
    });

    return { totalPatients, todayPatients };
  };

  const patientCounts = getPatientCounts();

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!isAuthenticated || userType !== 'doctor') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        const response = await appointmentService.getDoctorAppointments();
        if (response.success) {
          setAppointments(response.data);
          setError(null); // Ensure error is cleared on success
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
    if (isAuthenticated && userType === "doctor") {
      return "/doctor/doctor-dashboard";
    } else if (isAuthenticated && userType === "patient") {
      return "/index";
    } else if (isAuthenticated && userType === "admin") {
      return "/admin/dashboard";
    }
    return "/index"; // Default to landing page for unauthenticated users
  };

  // Handle appointment status update
  const handleStatusUpdate = async (appointmentId: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
    try {
      console.log('🔄 Updating appointment status:', { appointmentId, status });
      await appointmentService.updateAppointmentStatus(appointmentId, status);
      console.log('✅ Appointment status updated successfully');
      
      // Clear any previous errors since the operation was successful
      setError(null);
      
      // Update local state with both status and boolean fields
      setAppointments(prev =>
        prev.map(apt => {
          if (apt._id === appointmentId) {
            const updatedAppointment: Appointment = {
              ...apt,
              status: status as 'pending' | 'confirmed' | 'cancelled' | 'completed',
              isCompleted: status === 'completed',
              cancelled: status === 'cancelled'
            };
            console.log('📝 Updated appointment in state:', updatedAppointment);
            return updatedAppointment;
          }
          return apt;
        })
      );
    } catch (error) {
      console.error('❌ Error updating appointment status:', error);
      setError('Failed to update appointment status');
    }
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
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                  <h2 className="breadcrumb-title">Dashboard</h2>
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
              <div className="stickybar">
                {/* Profile Sidebar */}
                <DoctorSidebar />
                {/* /Profile Sidebar */}
              </div>
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="row">
                <div className="col-xl-4 d-flex">
                  <div className="dashboard-box-col w-100">
                    <div className="dashboard-widget-box">
                      <div className="dashboard-content-info">
                        <h6>Total Patient</h6>
                        <h4>{loading ? '...' : patientCounts.totalPatients}</h4>
                        <span className="text-success">
                          <i className="fa-solid fa-arrow-up" />
                          {loading ? 'Loading...' : `${patientCounts.totalPatients} Unique Patients`}
                        </span>
                      </div>
                      <div className="dashboard-widget-icon">
                        <span className="dash-icon-box">
                          <i className="fa-solid fa-user-injured" />
                        </span>
                      </div>
                    </div>
                    <div className="dashboard-widget-box">
                      <div className="dashboard-content-info">
                        <h6>Patients Today</h6>
                        <h4>{loading ? '...' : patientCounts.todayPatients}</h4>
                        <span className="text-danger">
                          <i className="fa-solid fa-arrow-up" />
                          {loading ? 'Loading...' : `${patientCounts.todayPatients} Today's Patients`}
                        </span>
                      </div>
                      <div className="dashboard-widget-icon">
                        <span className="dash-icon-box">
                          <i className="fa-solid fa-user-clock" />
                        </span>
                      </div>
                    </div>
                    <div className="dashboard-widget-box">
                      <div className="dashboard-content-info">
                        <h6>Appointments Today</h6>
                        <h4>{appointments.filter(apt => !apt.isCompleted && !apt.cancelled).length}</h4>
                        <span className="text-success">
                          <i className="fa-solid fa-calendar-days" />
                          {appointments.filter(apt => !apt.isCompleted && !apt.cancelled).length > 0 ? 'Active Appointments' : 'No Appointments'}
                        </span>
                      </div>
                      <div className="dashboard-widget-icon">
                        <span className="dash-icon-box">
                          <i className="fa-solid fa-calendar-days" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 d-flex">
                  <div className="dashboard-card w-100">
                    <div className="dashboard-card-head">
                      <div className="header-title">
                        <h5>Appointment</h5>
                      </div>
                      <div className="dropdown header-dropdown">
                        <Link
                          className="dropdown-toggle nav-tog"
                          data-bs-toggle="dropdown"
                          to="#"
                        >
                          Last 7 Days
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to="#" className="dropdown-item">
                            Today
                          </Link>
                          <Link to="#" className="dropdown-item">
                            This Month
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Last 7 Days
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard-card-body">
                      <div className="table-responsive">
                        <table className="table dashboard-table">
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={3} className="text-center py-4">
                                  <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                  <p className="mt-2">Loading appointments...</p>
                                </td>
                              </tr>
                            ) : error ? (
                              <tr>
                                <td colSpan={3} className="text-center py-4">
                                  <div className="alert alert-danger" role="alert">
                                    <h6>Error loading appointments</h6>
                                    <p>{error}</p>
                                  </div>
                                </td>
                              </tr>
                            ) : appointments.length === 0 ? (
                              <tr>
                                <td colSpan={3} className="text-center py-4">
                                  <div className="alert alert-info" role="alert">
                                    <h6>No appointments found</h6>
                                    <p>You don't have any appointments yet.</p>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              appointments
                                .filter(apt => !apt.isCompleted && !apt.cancelled) // Only show pending/confirmed appointments
                                .slice(0, 5)
                                .map((appointment) => {
                                const patientImage = doctordashboardprofile01;
                                const appointmentDate = new Date(appointment.date);
                                const formattedDate = appointmentDate.toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                });
                                const formattedTime = appointment.timeSlot;

                                return (
                                  <tr key={appointment._id}>
                                    <td>
                                      <div className="patient-info-profile">
                                        <Link
                                          to="/doctor/appointments"
                                          className="table-avatar"
                                        >
                                          <img
                                            src={patientImage}
                                            alt="Patient"
                                          />
                                        </Link>
                                        <div className="patient-name-info">
                                          <span>#{appointment.appointmentId}</span>
                                          <h5>
                                            <Link to="/doctor/appointments">
                                              {appointment.patientName || appointment.patient?.fullName || 'Loading...'}
                                            </Link>
                                          </h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="appointment-date-created">
                                        <h6>{formattedDate} {formattedTime}</h6>
                                        <span className="badge table-badge">
                                          {appointment.service}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="apponiment-actions d-flex align-items-center">
                                        <Link 
                                          to="#" 
                                          className="text-success me-2"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleStatusUpdate(appointment._id, 'completed');
                                          }}
                                        >
                                          <i className="fa-solid fa-check" />
                                        </Link>
                                        <Link 
                                          to="#" 
                                          className="text-danger"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleStatusUpdate(appointment._id, 'cancelled');
                                          }}
                                        >
                                          <i className="fa-solid fa-xmark" />
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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

export default DoctorDashboard;
