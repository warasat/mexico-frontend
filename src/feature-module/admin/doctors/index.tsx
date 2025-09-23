import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender } from "../paginationfunction";
import SidebarNav from "../sidebar";
import { Link } from "react-router-dom";
import Header from "../header";
import { useState, useEffect } from "react";
import adminService, { type Doctor } from "../../../core/services/adminService";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [pageSize] = useState(10);

  // Fetch doctors data from API
  const fetchDoctors = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response = await adminService.getDoctorsList(page, limit);
      if (response.success) {
        setDoctors(response.data);
        setTotalDoctors(response.pagination.totalDoctors);
        setCurrentPage(response.pagination.currentPage);
      } else {
        setError('Failed to fetch doctors');
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(currentPage, pageSize);
  }, [currentPage, pageSize]);

  // Transform API data to match table structure
  const data = doctors.map(doctor => {
    // Format the registration date from createdAt
    const registrationDate = doctor.createdAt ? new Date(doctor.createdAt) : new Date();
    const formattedDate = registrationDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const formattedTime = registrationDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return {
      ...doctor,
      Date: formattedDate,
      time: formattedTime,
      AccountStatus: "checkbox", // Keep account status as checkbox
    };
  });
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "DoctorName",
      render: (text: any, record: any) => (
        <>
          <Link className="avatar mx-2" to="/admin/profile">
            <img className="rounded-circle" src={record.image || 'assets/img/doctor-grid/doc1.png'} />
          </Link>
          <Link to="/admin/profile">{text}</Link>
        </>
      ),
      sorter: (a: any, b: any) => a.DoctorName.length - b.DoctorName.length,
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      sorter: (a: any, b: any) => a.Speciality.length - b.Speciality.length,
    },
    {
      title: "Member Since",
      render: (record: any) => (
        <>
          <span className="user-name">{record.Date}</span>
          <br />
          <span>{record.time}</span>
        </>
      ),
      sorter: (a: any, b: any) => a.length - b.length,
    },

    {
      title: "Account Status",
      dataIndex: "AccountStatus",
      render: (record: any) => {
        return (
          <div className="status-toggle">
            <input
              id={`rating${record?.id}`}
              className="check"
              type="checkbox"
              //  checked={false}
            />
            <label
              htmlFor={`rating${record?.id}`}
              className="checktoggle checkbox-bg"
            >
              checkbox
            </label>
          </div>
        );
      },
      sorter: (a: any, b: any) => a.AccountStatus.length - b.AccountStatus.length,
    },
  ];
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
                <h3 className="page-title">List of Doctors</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">List of Doctors</li>
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
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading doctors...</p>
                      </div>
                    ) : error ? (
                      <div className="text-center py-5">
                        <div className="alert alert-warning" role="alert">
                          <h5>Unable to load doctors</h5>
                          <p>{error}</p>
                          <button 
                            className="btn btn-primary" 
                            onClick={() => window.location.reload()}
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    ) : (
                                <Table
                                  pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: totalDoctors,
                                    showTotal: (total, range) =>
                                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger: false,
                                    onChange: (page) => {
                                      setCurrentPage(page);
                                    },
                                    itemRender: itemRender,
                                  }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        dataSource={data}
                        rowKey={(record) => record.id}
                        //  onChange={this.handleTableChange}
                      />
                    )}
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

export default AdminDoctors;
