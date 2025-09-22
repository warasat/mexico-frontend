import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { patient1, patient2, patient3, patient4, patient5 } from "../imagepath";
// import SidebarNav from '../sidebar';
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { Link } from "react-router-dom";
import adminService from "../../../core/services/adminService";

// Define Patient interface locally to avoid import issues
interface Patient {
  id: string;
  PatientName: string;
  Phone: string;
  profileImage: string;
  LastVisit: string;
  LastVisitTime: string;
  Date: string;
  time: string;
}

const PatientsListDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const fetchPatients = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await adminService.getPatientsList(page, 10);
      if (response.success) {
        setPatients(response.data);
        setCurrentPage(response.pagination.currentPage);
        setTotalPages(response.pagination.totalPages);
        setTotalPatients(response.pagination.totalPatients);
        setHasNextPage(response.pagination.hasNextPage);
        setHasPrevPage(response.pagination.hasPrevPage);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Fallback to static data if API fails
      setPatients([
        {
          id: "1",
          PatientName: "Charlene Reed",
          Phone: "8286329170",
          LastVisit: "20 Oct 2019",
          LastVisitTime: "10:00 AM",
          Date: "20 Oct 2019",
          time: "10:00 AM",
        },
        {
          id: "2",
          PatientName: "Travis Trimble",
          Phone: "2077299974",
          LastVisit: "22 Oct 2019",
          LastVisitTime: "02:30 PM",
          Date: "22 Oct 2019",
          time: "02:30 PM",
        },
        {
          id: "3",
          PatientName: "Carl Kelly",
          Phone: "2607247769",
          LastVisit: "21 Oct 2019",
          LastVisitTime: "09:15 AM",
          Date: "21 Oct 2019",
          time: "09:15 AM",
        },
        {
          id: "4",
          PatientName: "Michelle Fairfax",
          Phone: "5043686874",
          LastVisit: "21 Sep 2019",
          LastVisitTime: "11:45 AM",
          Date: "21 Sep 2019",
          time: "11:45 AM",
        },
        {
          id: "5",
          PatientName: "Gina Moore",
          Phone: "9548207887",
          LastVisit: "18 Sep 2019",
          LastVisitTime: "03:20 PM",
          Date: "18 Sep 2019",
          time: "03:20 PM",
        },
      ]);
      setTotalPages(1);
      setTotalPatients(5);
      setHasNextPage(false);
      setHasPrevPage(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients(1);
  }, []);

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchPatients(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      fetchPatients(currentPage - 1);
    }
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "PatientName",
      render: (text: any, record: any) => (
        <React.Fragment key={record.id}>
          <Link className="avatar mx-2" to="/admin/profile">
            <img 
              className="rounded-circle" 
              src={record.profileImage} 
              alt={text}
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                objectPosition: 'center top',
                border: '2px solid #e9ecef'
              }}
            />
          </Link>
          <Link to="/admin/profile">{text}</Link>
        </React.Fragment>
      ),
      sorter: (a: any, b: any) => a.PatientName.length - b.PatientName.length,
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      sorter: (a: any, b: any) => a.Phone.length - b.Phone.length,
    },
    {
      title: "Last Visit",
      dataIndex: "LastVisit",
      render: (text: any, record: any) => (
        <span>
          {record.LastVisit} {record.LastVisitTime && `at ${record.LastVisitTime}`}
        </span>
      ),
      sorter: (a: any, b: any) => a.LastVisit.length - b.LastVisit.length,
    },
  ];

  return (
    <>
      <div className="col-md-6 d-flex">
        {/* Recent Orders */}
        <div className="card card-table flex-fill">
          <div className="card-header">
            <h4 className="card-title">Patients List</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <Table
                loading={loading}
                pagination={false}
                style={{ overflowX: "auto" }}
                columns={columns}
                dataSource={patients}
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
        {/* /Recent Orders */}
      </div>
    </>
  );
};

export default PatientsListDashboard;
