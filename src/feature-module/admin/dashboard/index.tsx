import React, { useState, useEffect } from "react";
import SidebarNav from "../sidebar";
import Header from "../header";
import DoctorListDesboard from "./DoctorList";
import PatientsListDesboard from "./PatientsList";
import AppointmentList from "./AppointmentList";
import StatusCharts from "./StatusCharts";
import { useBackButtonHandler } from "../../../core/hooks/useBackButtonHandler";
import adminService, { type DashboardStats } from "../../../core/services/adminService";

const AdminDashboard: React.FC = () => {
  // Handle browser back button behavior
  useBackButtonHandler();
  
  const [stats, setStats] = useState<DashboardStats>({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <SidebarNav />
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Welcome Admin!</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon text-primary border-primary">
                        <i className="feather feather-users"></i>
                      </span>
                      <div className="dash-count">
                        <h3>{loading ? '...' : stats.totalDoctors}</h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-muted">Doctors</h6>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-primary w-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="dash-widget-header">
                        <span className="dash-widget-icon text-success">
                          <i className="feather feather-credit-card"></i>
                        </span>
                        <div className="dash-count">
                          <h3>{loading ? '...' : stats.totalPatients}</h3>
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6 className="text-muted">Patients</h6>
                        <div className="progress progress-sm">
                          <div className="progress-bar bg-success w-50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="dash-widget-header">
                        <span className="dash-widget-icon text-danger border-danger">
                          <i className="feather feather-dollar-sign"></i>
                        </span>
                        <div className="dash-count">
                          <h3>{loading ? '...' : stats.totalAppointments}</h3>
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6 className="text-muted">Appointment</h6>
                        <div className="progress progress-sm">
                          <div className="progress-bar bg-danger w-50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12">
                {/* Invoice Chart */}
                <div className="card card-chart">
                  <div className="card-header">
                    <h4 className="card-title">Status</h4>
                  </div>
                  <div className="card-body">
                    <div id="morrisLine" />
                    {/* <LineChart /> */}
                    {/* <StatusChart /> */}
                    <StatusCharts />
                  </div>
                </div>
                {/* /Invoice Chart */}
              </div>
            </div>

            <div className="row">
              <DoctorListDesboard />
              <PatientsListDesboard />
            </div>
            {/* Today’s  Appointment */}
            <div className="row">
              <AppointmentList />
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default AdminDashboard;
