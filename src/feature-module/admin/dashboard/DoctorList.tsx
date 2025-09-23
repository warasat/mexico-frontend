import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import {
  doctor_thumb_01,
  doctor_thumb_02,
  doctor_thumb_03,
  doctor_thumb_04,
  doctor_thumb_05,
} from "../imagepath";
import { Link } from "react-router-dom";
import adminService from "../../../core/services/adminService";

// Define Doctor interface locally to avoid import issues
interface Doctor {
  id: string;
  DoctorName: string;
  Speciality: string;
  image: string;
  Date: string;
  time: string;
}

const DoctorListDashboard: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const fetchDoctors = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await adminService.getDoctorsList(page, 10);
      if (response.success) {
        console.log(`[Page ${page}] Doctors fetched successfully:`, response.data);
        // Log doctor data for debugging
        response.data.forEach((doctor, index) => {
          console.log(`[Page ${page}] Doctor ${index + 1}:`, {
            doctorName: doctor.DoctorName,
            doctorImage: doctor.image,
            specialty: doctor.Speciality,
            debug: doctor._debug
          });
        });
        
        // Deduplicate by id as a safeguard
        const uniqueMap = new Map<string, Doctor>();
        (response.data || []).forEach((d: any) => {
          const id = String(d.id);
          if (!uniqueMap.has(id)) {
            uniqueMap.set(id, {
              id,
              DoctorName: d.DoctorName || 'Unknown Doctor',
              Speciality: d.Speciality || 'General Practice',
              image: d.image || '/src/assets/admin/assets/img/profiles/doctor-03.jpg',
              Date: d.Date || '',
              time: d.time || '',
            });
          }
        });
        setDoctors(Array.from(uniqueMap.values()));
        setCurrentPage(response.pagination.currentPage);
        setTotalPages(response.pagination.totalPages);
        setTotalDoctors(response.pagination.totalDoctors);
        setHasNextPage(response.pagination.hasNextPage);
        setHasPrevPage(response.pagination.hasPrevPage);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // Fallback to static data if API fails
      setDoctors([
        {
          id: "1",
          DoctorName: "Dr. Ruby Perrin",
          Speciality: "Dental",
          Date: "27 Sep 2019",
          time: "03.40 PM",
          image: doctor_thumb_01,
        },
        {
          id: "2",
          DoctorName: "Dr. Darren Elder",
          Speciality: "Dental",
          Date: "1 Nov 2019",
          time: "02.59 PM",
          image: doctor_thumb_02,
        },
        {
          id: "3",
          DoctorName: "Dr. Deborah Angel",
          Speciality: "Cardiology",
          Date: "3 Nov 2019",
          time: "09.59 PM",
          image: doctor_thumb_03,
        },
        {
          id: "4",
          DoctorName: "Dr. Sofia Brient",
          Speciality: "Urology",
          Date: "16 Jun 2019",
          time: "04.50 PM",
          image: doctor_thumb_04,
        },
        {
          id: "5",
          DoctorName: "Dr. Marvin Campbell",
          Speciality: "Orthopaedics",
          Date: "22 Aug 2019",
          time: "01.50 PM",
          image: doctor_thumb_05,
        },
      ]);
      setTotalPages(1);
      setTotalDoctors(5);
      setHasNextPage(false);
      setHasPrevPage(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(1);
  }, []);

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchDoctors(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      fetchDoctors(currentPage - 1);
    }
  };

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "DoctorName",
      render: (text: any, record: any) => {
        const doctorImageSrc = record.image || '/src/assets/admin/assets/img/profiles/doctor-03.jpg';
        console.log(`[Page ${currentPage}] Rendering doctor image:`, { 
          doctorName: text, 
          imageSrc: doctorImageSrc,
          hasImage: !!record.image
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
            <Link to="/admin/profile">{text || 'Unknown Doctor'}</Link>
          </React.Fragment>
        );
      },
      sorter: (a: any, b: any) => a.DoctorName.length - b.DoctorName.length,
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      render: (value: any) => (value && String(value).trim().length ? value : 'General Practice'),
      sorter: (a: any, b: any) => a.Speciality.length - b.Speciality.length,
    },
  ];

  return (
    <div className="col-md-6 d-flex">
      {/* Recent Orders */}
      <div className="card card-table flex-fill">
        <div className="card-header">
          <h4 className="card-title">Doctors List</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Table
              loading={loading}
              pagination={false}
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={doctors}
              rowKey={(record) => record.id}
            />
          </div>
          
          {/* Custom Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalDoctors)} of {totalDoctors} entries
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
  );
};

export default DoctorListDashboard;
