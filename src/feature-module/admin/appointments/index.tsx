import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SidebarNav from "../sidebar";
import {
  doctor_thumb_01,
  patient1,
} from "../imagepath";
import { Link } from "react-router-dom";
import Header from "../header";
import adminService from "../../../core/services/adminService";

interface AppointmentData {
  id: string;
  DoctorName: string;
  Speciality: string;
  PatientName: string;
  AppointmentTime: string;
  Date: string;
  Status: string;
  DoctorProfileImage: string;
  PatientProfileImage: string;
  CreatedAt: string;
  time: string;
}

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await adminService.getAppointmentsList(currentPage, 10);
        if (response.success) {
          console.log(`[Page ${currentPage}] Appointments fetched successfully:`, response.data);
          // Log profile image data for debugging
          response.data.forEach((appointment, index) => {
            console.log(`[Page ${currentPage}] Appointment ${index + 1}:`, {
              doctorName: appointment.DoctorName,
              doctorImage: appointment.DoctorProfileImage,
              patientName: appointment.PatientName,
              patientImage: appointment.PatientProfileImage,
              specialty: appointment.Speciality,
              debug: appointment._debug
            });
          });
          setAppointments(response.data);
          setCurrentPage(response.pagination.currentPage);
          setTotalPages(response.pagination.totalPages);
          setTotalAppointments(response.pagination.totalAppointments);
          setHasNextPage(response.pagination.hasNextPage);
          setHasPrevPage(response.pagination.hasPrevPage);
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
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Use dynamic data from API
  const data: AppointmentData[] = appointments;
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "DoctorName",
      render: (text: string, record: AppointmentData) => {
        const doctorImageSrc = record.DoctorProfileImage || '/src/assets/admin/assets/img/profiles/doctor-03.jpg';
        console.log(`[Page ${currentPage}] Rendering doctor image:`, { 
          doctorName: text, 
          imageSrc: doctorImageSrc,
          hasImage: !!record.DoctorProfileImage,
          debug: record._debug
        });
        
        return (
          <React.Fragment key={record.id}>
            <Link className="avatar mx-2" to="/admin/profile">
              <img 
                className="rounded-circle" 
                src={doctorImageSrc}
                alt={text || 'Doctor'}
                onError={(e) => {
                  console.log(`[Page ${currentPage}] Doctor image failed to load:`, doctorImageSrc);
                  const target = e.target as HTMLImageElement;
                  target.src = '/src/assets/admin/assets/img/profiles/doctor-03.jpg';
                }}
                onLoad={() => {
                  console.log(`[Page ${currentPage}] Doctor image loaded successfully:`, doctorImageSrc);
                }}
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  border: '2px solid #e9ecef'
                }}
              />
            </Link>
            <span className="text-decoration-none">{text || 'Unknown Doctor'}</span>
          </React.Fragment>
        );
      },
      sorter: (a: AppointmentData, b: AppointmentData) => a.DoctorName.length - b.DoctorName.length,
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      render: (value: string) => (value && value.trim().length ? value : 'General Practice'),
      sorter: (a: AppointmentData, b: AppointmentData) => a.Speciality.length - b.Speciality.length,
    },
    {
      title: "Patient Name",
      dataIndex: "PatientName",
      render: (text: string, record: AppointmentData) => {
        const patientImageSrc = record.PatientProfileImage || '/src/assets/admin/assets/img/profiles/avatar-01.jpg';
        console.log(`[Page ${currentPage}] Rendering patient image:`, { 
          patientName: text, 
          imageSrc: patientImageSrc,
          hasImage: !!record.PatientProfileImage,
          debug: record._debug
        });
        
        return (
          <React.Fragment key={record.id}>
            <Link className="avatar mx-2" to="/admin/profile">
              <img 
                className="rounded-circle" 
                src={patientImageSrc}
                alt={text || 'Patient'}
                onError={(e) => {
                  console.log(`[Page ${currentPage}] Patient image failed to load:`, patientImageSrc);
                  const target = e.target as HTMLImageElement;
                  target.src = '/src/assets/admin/assets/img/profiles/avatar-01.jpg';
                }}
                onLoad={() => {
                  console.log(`[Page ${currentPage}] Patient image loaded successfully:`, patientImageSrc);
                }}
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  border: '2px solid #e9ecef'
                }}
              />
            </Link>
            <span>{text || 'Unknown Patient'}</span>
          </React.Fragment>
        );
      },
      sorter: (a: AppointmentData, b: AppointmentData) => a.PatientName.length - b.PatientName.length,
    },
    {
      title: "Appointment Time",
      render: (record: AppointmentData) => (
        <>
          <span className="user-name">{record.Date}</span>
          <br />
          <span className="d-block">{record.AppointmentTime}</span>
        </>
      ),
      sorter: (a: AppointmentData, b: AppointmentData) => a.Date.length - b.AppointmentTime.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (status: string) => {
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
        
        return getStatusBadge(status);
      },
    }
  ];
  // Render loading state
  if (loading) {
    return (
      <>
        <Header />
        <SidebarNav />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Appointments</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Appointments</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading appointments...</p>
                  </div>
                </div>
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
        <Header />
        <SidebarNav />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Appointments</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Appointments</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
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
          </div>
        </div>
      </>
    );
  }

  // Render empty state when no appointments
  if (!loading && data.length === 0) {
    return (
      <>
        <Header />
        <SidebarNav />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Appointments</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Appointments</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body text-center py-5">
                    <div className="empty-state">
                      <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                      <h5 className="text-muted">No Appointments Yet</h5>
                      <p className="text-muted">There are no appointments in the system yet.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Appointments ({totalAppointments})</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Appointments</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      pagination={false}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={data}
                      rowKey={(record) => record.id}
                    />
                  </div>
                  
                  {/* Custom Pagination Controls */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="text-muted">
                      Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalAppointments)} of {totalAppointments} entries
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handlePrevPage}
                        disabled={!hasPrevPage || loading}
                      >
                        Previous
                      </button>
                      <span className="btn btn-outline-secondary btn-sm disabled">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleNextPage}
                        disabled={!hasNextPage || loading}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAppointments;
