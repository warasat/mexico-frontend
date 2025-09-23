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
  const [blockingDoctor, setBlockingDoctor] = useState<string | null>(null);

  // Fetch doctors data from API
  const fetchDoctors = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response = await adminService.getDoctorsList(page, limit);
      if (response.success) {
        console.log(`[Page ${page}] Doctors fetched successfully:`, response.data);
        // Log doctor data for debugging
        response.data.forEach((doctor, index) => {
          console.log(`[Page ${page}] Doctor ${index + 1}:`, {
            doctorName: doctor.DoctorName,
            doctorImage: doctor.image,
            specialty: doctor.Speciality,
            doctorId: doctor.id,
            doctorIdType: typeof doctor.id,
            isBlocked: doctor.isBlocked,
            debug: doctor._debug,
            rawDoctor: doctor
          });
        });
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

  // Handle block/unblock doctor
  const handleBlockUnblock = async (doctorId: string, isBlocked: boolean) => {
    try {
      console.log('=== BLOCKING DOCTOR DEBUG ===');
      console.log('Input parameters:', { doctorId, isBlocked, type: typeof doctorId });
      console.log('Current doctors state:', doctors);
      console.log('Doctor being blocked:', doctors.find(d => d.id === doctorId));
      
      if (!doctorId || doctorId === 'undefined') {
        console.error('Invalid doctor ID:', doctorId);
        console.error('Available doctor IDs:', doctors.map(d => ({ name: d.DoctorName, id: d.id, type: typeof d.id })));
        alert('Error: Invalid doctor ID. Please refresh the page and try again.');
        return;
      }
      
      setBlockingDoctor(doctorId);
      console.log('Calling adminService.blockUnblockDoctor...');
      const response = await adminService.blockUnblockDoctor(doctorId, isBlocked);
      console.log('API response:', response);
      
      if (response.success) {
        // Update the doctor in the local state
        setDoctors(prevDoctors => 
          prevDoctors.map(doctor => 
            doctor.id === doctorId 
              ? { ...doctor, isBlocked: isBlocked }
              : doctor
          )
        );
        console.log(`Doctor ${doctorId} ${isBlocked ? 'blocked' : 'unblocked'} successfully`);
      } else {
        console.error('Failed to update doctor status:', response.message);
        alert(`Failed to update doctor status: ${response.message}`);
      }
    } catch (error) {
      console.error('Error updating doctor status:', error);
      alert('Error updating doctor status. Please try again.');
    } finally {
      setBlockingDoctor(null);
    }
  };

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

    console.log('Doctor data transformation:', {
      id: doctor.id,
      type: typeof doctor.id,
      doctorName: doctor.DoctorName,
      isBlocked: doctor.isBlocked,
      debug: doctor._debug
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
      render: (text: any, record: any) => {
        const doctorImageSrc = record.image || '/src/assets/admin/assets/img/profiles/doctor-03.jpg';
        console.log(`[Page ${currentPage}] Rendering doctor image:`, { 
          doctorName: text, 
          imageSrc: doctorImageSrc,
          hasImage: !!record.image,
          debug: record._debug
        });
        
        return (
          <>
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
            <Link to="/admin/profile">{text || 'Unknown Doctor'}</Link>
          </>
        );
      },
      sorter: (a: any, b: any) => a.DoctorName.length - b.DoctorName.length,
    },
    {
      title: "Doctor ID",
      dataIndex: "doctorId",
      render: (text: any, record: any) => {
        console.log('Doctor ID render:', { text, record: record.doctorId, debug: record._debug });
        return (
          <span className="badge bg-primary-light">
            {record.doctorId || 'N/A'}
          </span>
        );
      },
      sorter: (a: any, b: any) => (a.doctorId || '').localeCompare(b.doctorId || ''),
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      render: (value: string) => (value && value.trim().length ? value : 'General Practice'),
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
      title: "Block One",
      dataIndex: "AccountStatus",
      render: (record: any) => {
        const isBlocked = record.isBlocked || false;
        const isBlocking = blockingDoctor === record.id;

        return (
          <div className="status-toggle">
            <input
              id={`rating${record?.id}`}
              className="check"
              type="checkbox"
              checked={isBlocked}
              onChange={(e) => {
                const newBlockedStatus = e.target.checked;
                handleBlockUnblock(record.id, newBlockedStatus);
              }}
              disabled={isBlocking}
            />
            <label
              htmlFor={`rating${record?.id}`}
              className={`checktoggle checkbox-bg ${isBlocked ? 'checked' : ''}`}
              style={{
                backgroundColor: isBlocked ? '#28a745' : '#dc3545',
                opacity: isBlocking ? 0.6 : 1
              }}
            >
              {isBlocking ? '...' : 'checkbox'}
            </label>
          </div>
        );
      },
      sorter: (a: any, b: any) => (a.isBlocked ? 1 : 0) - (b.isBlocked ? 1 : 0),
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
