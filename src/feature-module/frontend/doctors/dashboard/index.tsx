 
 
 
import DoctorSidebar from "../sidebar";
import Header from "../../header";
import { doctordashboardprofile01, doctordashboardprofile02, doctordashboardprofile04, doctordashboardprofile05, doctordashboardprofile3 } from "../../imagepath";
import ApexCharts from 'react-apexcharts';
import DoctorFooter from "../../common/doctorFooter";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useAuth } from "../../../../core/context/AuthContext";

const DoctorDashboard = (props: any) => {
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;

  // Function to get the appropriate home redirect URL based on user type
  const getHomeRedirectUrl = () => {
    if (isAuthenticated && userType === 'doctor') {
      return '/doctor/doctor-dashboard';
    } else if (isAuthenticated && userType === 'patient') {
      return '/patient/dashboard';
    } else if (isAuthenticated && userType === 'admin') {
      return '/admin/dashboard';
    }
    return '/index'; // Default to landing page for unauthenticated users
  };

  // revenue chart options
  const revenueChartOptions = {
    chart: {
      height: 300,
      type: 'bar' as const,
      stacked: false,
      toolbar: {
        show: false,
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        endingShape: 'rounded',
        borderRadius: 8,
        distributed: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      width: 0
    },
    colors: ['#0E82FD', '#00D4AA', '#FF6B6B'],
    series: [{
      name: 'Revenue',
      data: [50, 40, 15, 45, 35, 48, 65]
    }],
    xaxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return "$" + val + "k"
        },
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return "$" + val + "k"
        }
      },
      theme: 'dark'
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    }
  };

  // appointment chart options
  const appointmentChartOptions = {
    chart: {
      height: 300,
      type: 'bar' as const,
      stacked: false,
      toolbar: {
        show: false,
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        endingShape: 'rounded',
        borderRadius: 8,
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      width: 0,
    },
    colors: ['#00D4AA', '#FF6B6B', '#FFA500'],
    series: [{
      name: 'Appointments',
      data: [40, 20, 30, 60, 90, 40, 110]
    }],
    xaxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return val + " appointments"
        },
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + " appointments"
        }
      },
      theme: 'dark'
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
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
                        <h4>978</h4>
                        <span className="text-success">
                          <i className="fa-solid fa-arrow-up" />
                          15% From Last Week
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
                        <h4>80</h4>
                        <span className="text-danger">
                          <i className="fa-solid fa-arrow-up" />
                          15% From Yesterday
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
                        <h4>50</h4>
                        <span className="text-success">
                          <i className="fa-solid fa-calendar-days" />
                          20% From Yesterday
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
                            <tr>
                              <td>
                                <div className="patient-info-profile">
                                  <Link
                                    to="/doctor/appointments"
                                    className="table-avatar"
                                  >
                                    <img
                                      src={doctordashboardprofile01}
                                      alt="Img"
                                    />
                                  </Link>
                                  <div className="patient-name-info">
                                    <span>#Apt0001</span>
                                    <h5>
                                      <Link to="/doctor/appointments">
                                        Adrian Marshall
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="appointment-date-created">
                                  <h6>11 Nov 2025 10.45 AM</h6>
                                  <span className="badge table-badge">General</span>
                                </div>
                              </td>
                              <td>
                                <div className="apponiment-actions d-flex align-items-center">
                                  <Link to="#" className="text-success me-2">
                                    <i className="fa-solid fa-check" />
                                  </Link>
                                  <Link to="#" className="text-danger">
                                    <i className="fa-solid fa-xmark" />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="patient-info-profile">
                                  <Link
                                    to="/doctor/appointments"
                                    className="table-avatar"
                                  >
                                    <img
                                      src={doctordashboardprofile02}
                                      alt="Img"
                                    />
                                  </Link>
                                  <div className="patient-name-info">
                                    <span>#Apt0002</span>
                                    <h5>
                                      <Link to="/doctor/appointments">Kelly Stevens</Link>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="appointment-date-created">
                                  <h6>10 Nov 2025 11.00 AM</h6>
                                  <span className="badge table-badge">
                                    Clinic Consulting
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="apponiment-actions d-flex align-items-center">
                                  <Link to="#" className="text-success me-2">
                                    <i className="fa-solid fa-check" />
                                  </Link>
                                  <Link to="#" className="text-danger">
                                    <i className="fa-solid fa-xmark" />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="patient-info-profile">
                                  <Link
                                    to="/doctor/appointments"
                                    className="table-avatar"
                                  >
                                    <img
                                      src={doctordashboardprofile3}
                                      alt="Img"
                                    />
                                  </Link>
                                  <div className="patient-name-info">
                                    <span>#Apt0003</span>
                                    <h5>
                                      <Link to="/doctor/appointments">
                                        Samuel Anderson
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="appointment-date-created">
                                  <h6>03 Nov 2025 02.00 PM</h6>
                                  <span className="badge table-badge">General</span>
                                </div>
                              </td>
                              <td>
                                <div className="apponiment-actions d-flex align-items-center">
                                  <Link to="#" className="text-success me-2">
                                    <i className="fa-solid fa-check" />
                                  </Link>
                                  <Link to="#" className="text-danger">
                                    <i className="fa-solid fa-xmark" />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="patient-info-profile">
                                  <Link
                                    to="/doctor/appointments"
                                    className="table-avatar"
                                  >
                                    <img
                                      src={doctordashboardprofile04}
                                      alt="Img"
                                    />
                                  </Link>
                                  <div className="patient-name-info">
                                    <span>#Apt0004</span>
                                    <h5>
                                      <Link to="/doctor/appointments">
                                        Catherine Griffin
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="appointment-date-created">
                                  <h6>01 Nov 2025 04.00 PM</h6>
                                  <span className="badge table-badge">
                                    Clinic Consulting
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="apponiment-actions d-flex align-items-center">
                                  <Link to="#" className="text-success me-2">
                                    <i className="fa-solid fa-check" />
                                  </Link>
                                  <Link to="#" className="text-danger">
                                    <i className="fa-solid fa-xmark" />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="patient-info-profile">
                                  <Link
                                    to="/doctor/appointments"
                                    className="table-avatar"
                                  >
                                    <img
                                      src={doctordashboardprofile05}
                                      alt="Img"
                                    />
                                  </Link>
                                  <div className="patient-name-info">
                                    <span>#Apt0005</span>
                                    <h5>
                                      <Link to="/doctor/appointments">
                                        Robert Hutchinson
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="appointment-date-created">
                                  <h6>28 Oct 2025 05.30 PM</h6>
                                  <span className="badge table-badge">General</span>
                                </div>
                              </td>
                              <td>
                                <div className="apponiment-actions d-flex align-items-center">
                                  <Link to="#" className="text-success me-2">
                                    <i className="fa-solid fa-check" />
                                  </Link>
                                  <Link to="#" className="text-danger">
                                    <i className="fa-solid fa-xmark" />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 d-flex">
                  <div className="dashboard-chart-col w-100">
                    <div className="dashboard-card w-100">
                      <div className="dashboard-card-head border-0">
                        <div className="header-title">
                          <h5>Weekly Overview</h5>
                        </div>
                        <div className="chart-create-date">
                          <h6>Mar 14 - Mar 21</h6>
                        </div>
                      </div>
                      <div className="dashboard-card-body">
                        <div className="chart-tab">
                          <ul
                            className="nav nav-pills product-licence-tab"
                            id="pills-tab2"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="pills-revenue-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-revenue"
                                type="button"
                                role="tab"
                                aria-controls="pills-revenue"
                                aria-selected="false"
                              >
                                Revenue
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-appointment-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-appointment"
                                type="button"
                                role="tab"
                                aria-controls="pills-appointment"
                                aria-selected="true"
                              >
                                Appointments
                              </button>
                            </li>
                          </ul>
                          <div
                            className="tab-content w-100"
                            id="v-pills-tabContent"
                          >
                            <div
                              className="tab-pane fade show active"
                              id="pills-revenue"
                              role="tabpanel"
                              aria-labelledby="pills-revenue-tab"
                            >
                              <ApexCharts 
                                options={revenueChartOptions}
                                series={revenueChartOptions.series}
                                type="bar"
                                height={300}
                              />
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-appointment"
                              role="tabpanel"
                              aria-labelledby="pills-appointment-tab"
                            >
                              <ApexCharts 
                                options={appointmentChartOptions}
                                series={appointmentChartOptions.series}
                                type="bar"
                                height={300}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard-card w-100 mt-4">
                      <div className="dashboard-card-head">
                        <div className="header-title">
                          <h5>Recent Patients</h5>
                        </div>
                        <div className="card-view-link">
                          <Link to="/doctor/my-patients">View All</Link>
                        </div>
                      </div>
                      <div className="dashboard-card-body">
                        <div className="row">
                          <div className="col-lg-3 col-md-6">
                            <div className="recent-patient-grid">
                              <Link to="pages/patient-details" className="patient-img">
                                <img
                                  src={doctordashboardprofile01}
                                  alt="Img"
                                />
                              </Link>
                              <h5>
                                <Link to="pages/patient-details">Adrian Marshall</Link>
                              </h5>
                              <span>Patient ID :&nbsp;P0001</span>
                              <div className="date-info">
                                <p>Last Appointment 15 Mar 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="recent-patient-grid">
                              <Link to="pages/patient-details" className="patient-img">
                                <img
                                  src={doctordashboardprofile02}
                                  alt="Img"
                                />
                              </Link>
                              <h5>
                                <Link to="pages/patient-details">Kelly Stevens</Link>
                              </h5>
                              <span>Patient ID :&nbsp;P0002</span>
                              <div className="date-info">
                                <p>Last Appointment 13 Mar 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="recent-patient-grid">
                              <Link to="pages/patient-details" className="patient-img">
                                <img
                                  src={doctordashboardprofile3}
                                  alt="Img"
                                />
                              </Link>
                              <h5>
                                <Link to="pages/patient-details">Samuel Anderson</Link>
                              </h5>
                              <span>Patient ID :&nbsp;P0003</span>
                              <div className="date-info">
                                <p>Last Appointment 10 Mar 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="recent-patient-grid">
                              <Link to="pages/patient-details" className="patient-img">
                                <img
                                  src={doctordashboardprofile04}
                                  alt="Img"
                                />
                              </Link>
                              <h5>
                                <Link to="pages/patient-details">Catherine Griffin</Link>
                              </h5>
                              <span>Patient ID :&nbsp;P0004</span>
                              <div className="date-info">
                                <p>Last Appointment 08 Mar 2025</p>
                              </div>
                            </div>
                          </div>
                        </div>
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
