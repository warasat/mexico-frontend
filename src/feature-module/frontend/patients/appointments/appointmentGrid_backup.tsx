import Header from "../../header";
import StickyBox from "react-sticky-box";
import DashboardSidebar from "../dashboard/sidebar/sidebar";
import Footer from "../../footer";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";

const AppointmentGrid = (props: any) => {
  return (
    <div className="main-wrapper">
      <Header {...props} />
      
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">
                      <i className="isax isax-home-15" />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/patient/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Appointments
                  </li>
                </ol>
              </nav>
              <h1 className="breadcrumb-title">Appointments</h1>
            </div>
          </div>
        </div>
        <ImageWithBasePath
          src="assets/img/bg/breadcrumb-icon.png"
          alt="img"
          className="breadcrumb-bg-04"
        />
      </div>
      {/* /Breadcrumb */}

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar />
              </StickyBox>
            </div>

            <div className="col-lg-8 col-xl-9">
              <div className="dashboard-header">
                <h3>Appointments</h3>
                <ul className="header-list-btns">
                  <li>
                    <div className="input-block dash-search-input">
                      <input type="text" className="form-control" placeholder="Search" />
                      <span className="search-icon">
                        <i className="isax isax-search-normal" />
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="input-block dash-filter">
                      <select className="form-control">
                        <option>All</option>
                        <option>Today</option>
                        <option>Tomorrow</option>
                        <option>This Week</option>
                        <option>This Month</option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="dashboard-content">
                <div className="appointment-tab">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="upcoming-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#upcoming"
                        type="button"
                        role="tab"
                        aria-controls="upcoming"
                        aria-selected="true"
                      >
                        Upcoming
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="past-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#past"
                        type="button"
                        role="tab"
                        aria-controls="past"
                        aria-selected="false"
                      >
                        Past
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="upcoming"
                      role="tabpanel"
                      aria-labelledby="upcoming-tab"
                    >
                      <div className="appointment-list">
                        <div className="appointment-item">
                          <div className="appointment-info">
                            <div className="appointment-date">
                              <span className="date">15</span>
                              <span className="month">Dec</span>
                            </div>
                            <div className="appointment-details">
                              <h4>Dr. John Smith</h4>
                              <p>Cardiologist</p>
                              <p>10:00 AM - 11:00 AM</p>
                            </div>
                          </div>
                          <div className="appointment-actions">
                            <button className="btn btn-primary btn-sm">View Details</button>
                            <button className="btn btn-outline-danger btn-sm">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="past"
                      role="tabpanel"
                      aria-labelledby="past-tab"
                    >
                      <div className="appointment-list">
                        <div className="appointment-item">
                          <div className="appointment-info">
                            <div className="appointment-date">
                              <span className="date">10</span>
                              <span className="month">Dec</span>
                            </div>
                            <div className="appointment-details">
                              <h4>Dr. Sarah Johnson</h4>
                              <p>Dermatologist</p>
                              <p>2:00 PM - 3:00 PM</p>
                            </div>
                          </div>
                          <div className="appointment-actions">
                            <button className="btn btn-outline-primary btn-sm">View Details</button>
                            <button className="btn btn-outline-success btn-sm">Book Again</button>
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

      <Footer {...props} />
    </div>
  );
};

export default AppointmentGrid;
