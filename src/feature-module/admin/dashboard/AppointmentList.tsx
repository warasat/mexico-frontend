import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
// import SidebarNav from '../sidebar';
import {
  doctor_thumb_01,
  patient1,
} from "../imagepath";
import { Link } from "react-router-dom";
import { appointmentService, type Appointment } from "../../../core/services/appointmentService";
import { useAuth } from "../../../core/context/AuthContext";
import SocketService from "../../../core/services/socketService";
interface AppointmentData {
  id: number;
  DoctorName: string;
  Speciality: string;
  PatientName: string;
  Earned: string;
  Date: string;
  time: string;

  image: string;
  images1: string;

}

const AppointmentList: React.FC = () => {
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

  // Transform appointments data for the table
  const transformedData: AppointmentData[] = appointments.map((appointment, index) => ({
    id: index + 1,
    DoctorName: appointment.doctorName,
    Speciality: appointment.service,
    PatientName: appointment.patientName,
    Earned: "$100.00", // Default value since it's not in the appointment model
    Date: new Date(appointment.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    time: appointment.timeSlot,
    image: appointment.doctor?.imageUrl || doctor_thumb_01,
    images1: patient1, // Default patient image
  }));

  // Use only dynamic data - no static fallback
  const data: AppointmentData[] = transformedData;
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "DoctorName",
      render: (text: string, record: AppointmentData) => (
        <>
          <Link className="avatar mx-2" to="/admin/profile">
            <img className="rounded-circle" src={record.image} />
          </Link>
          <Link to="/admin/profile" className="text-decoration-none">
            {text}
          </Link>
        </>
      ),
      sorter: (a: AppointmentData, b: AppointmentData) => a.DoctorName.length - b.DoctorName.length,
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      sorter: (a: AppointmentData, b: AppointmentData) => a.Speciality.length - b.Speciality.length,
    },

    {
      title: "Patient Name",
      dataIndex: "PatientName",
      render: (text: string, record: AppointmentData) => (
        <>
          <Link className="avatar mx-2" to="/admin/profile">
            <img className="rounded-circle" src={record.images1} />
          </Link>
          <Link to="/admin/profile">{text}</Link>
        </>
      ),
      sorter: (a: AppointmentData, b: AppointmentData) => a.PatientName.length - b.PatientName.length,
    },

    {
      title: "Appointment Time",
      render: (record: AppointmentData) => (
        <>
          <span className="user-name">{record.Date}</span>
          <br />
          <span className="d-block">{record.time}</span>
        </>
      ),
      sorter: (a: AppointmentData, b: AppointmentData) => a.Date.length - b.time.length,
    },
    {
      title: "Status",
      render: (record: any) => {
        const appointment = appointments.find(apt => apt.doctorName === record.DoctorName && apt.patientName === record.PatientName);
        if (!appointment) return <span className="badge bg-secondary">Unknown</span>;
        
        const getStatusBadge = (status: string) => {
          switch (status) {
            case 'pending':
              return <span className="badge bg-warning">Pending</span>;
            case 'confirmed':
              return <span className="badge bg-success">Confirmed</span>;
            case 'cancelled':
              return <span className="badge bg-danger">Cancelled</span>;
            case 'completed':
              return <span className="badge bg-info">Completed</span>;
            default:
              return <span className="badge bg-secondary">{status}</span>;
          }
        };
        
        return getStatusBadge(appointment.status);
      },
    },
    {
      title: "Actions",
      render: (record: any) => {
        const appointment = appointments.find(apt => apt.doctorName === record.DoctorName && apt.patientName === record.PatientName);
        if (!appointment) return null;
        
        const handleStatusUpdate = async (newStatus: string) => {
          try {
            await appointmentService.updateAppointmentStatus(appointment._id, newStatus as any);
            // The socket event will automatically update the UI
          } catch (error) {
            console.error('Error updating appointment status:', error);
            alert('Failed to update appointment status');
          }
        };
        
        return (
          <div className="btn-group" role="group">
            {appointment.status === 'pending' && (
              <>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleStatusUpdate('confirmed')}
                  title="Accept Appointment"
                >
                  <i className="fas fa-check"></i> Accept
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleStatusUpdate('cancelled')}
                  title="Reject Appointment"
                >
                  <i className="fas fa-times"></i> Reject
                </button>
              </>
            )}
            {appointment.status === 'confirmed' && (
              <button
                className="btn btn-info btn-sm"
                onClick={() => handleStatusUpdate('completed')}
                title="Mark as Completed"
              >
                <i className="fas fa-check-circle"></i> Complete
              </button>
            )}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleStatusUpdate('cancelled')}
              title="Cancel Appointment"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        );
      },
    },

  ];
  // Render loading state
  if (loading) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div>
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading appointments...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div>
            <div className="card-body text-center py-5">
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
    );
  }

  // Render empty state when no appointments
  if (!loading && data.length === 0) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div>
            <div className="card-body text-center py-5">
              <div className="empty-state">
                <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">No Appointments Yet</h5>
                <p className="text-muted">You don't have any appointments scheduled. New appointments will appear here in real-time.</p>
                <div className="mt-3">
                  <small className="text-muted">
                    <i className="fas fa-info-circle me-1"></i>
                    Make sure you're available and patients can book appointments with you.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {/* Recent Orders */}
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List ({data.length})</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <Table
                  pagination={{
                    total: data.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record.id}
                  //  onChange={this.handleTableChange}
                />
              </div>
            </div>
          </div>
          {/* /Recent Orders */}
        </div>
      </div>
    </>
  );
};
export default AppointmentList;
