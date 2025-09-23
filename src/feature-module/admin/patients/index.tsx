import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import SidebarNav from "../sidebar";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { patient1 } from "../imagepath";
import { Link } from "react-router-dom";
import Header from "../header";
import adminService from "../../../core/services/adminService";

interface PatientData {
  id: string;
  PatientID: string;
  PatientName: string;
  Age: string;
  Address: string;
  Phone: string;
  profileImage: string;
  LastVisit: string;
  LastVisitTime: string;
  Date: string;
  time: string;
}

const AdminPatients = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Fetch patients on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await adminService.getPatientsList(currentPage, 10);
        if (response.success) {
          console.log(`[Page ${currentPage}] Patients fetched successfully:`, response.data);
          // Log patient data for debugging
          response.data.forEach((patient, index) => {
            console.log(`[Page ${currentPage}] Patient ${index + 1}:`, {
              patientName: patient.PatientName,
              patientImage: patient.profileImage,
              age: patient.Age,
              address: patient.Address,
              debug: patient._debug
            });
          });
          setPatients(response.data);
          setCurrentPage(response.pagination.currentPage);
          setTotalPages(response.pagination.totalPages);
          setTotalPatients(response.pagination.totalPatients);
          setHasNextPage(response.pagination.hasNextPage);
          setHasPrevPage(response.pagination.hasPrevPage);
        } else {
          setError('Failed to fetch patients');
        }
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
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
  const data: PatientData[] = patients;
  const columns = [
    {
      title: "Patient ID",
      dataIndex: "PatientID",
      sorter: (a: PatientData, b: PatientData) => a.PatientID.length - b.PatientID.length,
    },
    {
      title: "Patient Name",
      dataIndex: "PatientName",
      render: (text: string, record: PatientData) => {
        const patientImageSrc = record.profileImage || '/src/assets/admin/assets/img/profiles/avatar-01.jpg';
        console.log(`[Page ${currentPage}] Rendering patient image:`, { 
          patientName: text, 
          imageSrc: patientImageSrc,
          hasImage: !!record.profileImage,
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
            <Link to="/admin/profile">{text || 'Unknown Patient'}</Link>
          </React.Fragment>
        );
      },
      sorter: (a: PatientData, b: PatientData) => a.PatientName.length - b.PatientName.length,
    },
    {
      title: "Age",
      dataIndex: "Age",
      render: (text: string) => <span>{text || ''}</span>,
      sorter: (a: PatientData, b: PatientData) => {
        const ageA = parseInt(a.Age) || 0;
        const ageB = parseInt(b.Age) || 0;
        return ageA - ageB;
      },
    },
    {
      title: "Address",
      dataIndex: "Address",
      render: (text: string) => <span>{text || ''}</span>,
      sorter: (a: PatientData, b: PatientData) => a.Address.length - b.Address.length,
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      sorter: (a: PatientData, b: PatientData) => a.Phone.length - b.Phone.length,
    },
    {
      title: "Last Visit",
      dataIndex: "LastVisit",
      render: (text: string, record: PatientData) => (
        <span>
          {record.LastVisit} {record.LastVisitTime && `at ${record.LastVisitTime}`}
        </span>
      ),
      sorter: (a: PatientData, b: PatientData) => a.LastVisit.length - b.LastVisit.length,
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
                  <h3 className="page-title">List of Patients</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">List of Patients</li>
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
                    <p className="mt-3">Loading patients...</p>
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
                  <h3 className="page-title">List of Patients</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">List of Patients</li>
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

  // Render empty state when no patients
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
                  <h3 className="page-title">List of Patients</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">List of Patients</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body text-center py-5">
                    <div className="empty-state">
                      <i className="fas fa-user-injured fa-3x text-muted mb-3"></i>
                      <h5 className="text-muted">No Patients Yet</h5>
                      <p className="text-muted">There are no patients registered in the system yet.</p>
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
                <h3 className="page-title">List of Patients ({totalPatients})</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">List of Patients</li>
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
                      Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalPatients)} of {totalPatients} entries
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

export default AdminPatients;
