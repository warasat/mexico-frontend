import Header from "../../header";
import DashboardSidebar from "../dashboard/sidebar/sidebar";
import Footer from "../../footer";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import { doctor_thumb_13, doctor_thumb_14, doctor_thumb_15, doctor_thumb_16, doctor_thumb_17, doctor_thumb_18, doctor_thumb_19, doctor_thumb_21 } from "../../imagepath";
import ImageWithBasePath from "../../../../components/imageWithBasePath";


const PatientAppointments = (props: any) => {
  return (
    <>
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
                      <Link to="/index">
                        <i className="isax isax-home-15" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Patient
                    </li>
                    <li className="breadcrumb-item active">Appointments</li>
                  </ol>
                  <h2 className="breadcrumb-title">Appointments</h2>
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


      <div className="content doctor-content">
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <span className="search-icon">
                        <i className="fa-solid fa-magnifying-glass" />
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="appointment-tab-head">
                <div className="appointment-tabs">
                  <ul
                    className="nav nav-pills inner-tab "
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-upcoming-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-upcoming"
                        type="button"
                        role="tab"
                        aria-controls="pills-upcoming"
                        aria-selected="false"
                      >
                        Upcoming<span>21</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-cancel-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-cancel"
                        type="button"
                        role="tab"
                        aria-controls="pills-cancel"
                        aria-selected="true"
                      >
                        Cancelled<span>16</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-complete-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-complete"
                        type="button"
                        role="tab"
                        aria-controls="pills-complete"
                        aria-selected="true"
                      >
                        Completed<span>214</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab-content appointment-tab-content" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div
                  className="tab-pane fade show active"
                  id="pills-upcoming"
                  role="tabpanel"
                  aria-labelledby="pills-upcoming-tab"
                >
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/upcoming-appointment">
                            <img
                              src={doctor_thumb_21}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0001</p>
                            <h6>
                              <Link to="/patient/upcoming-appointment">
                                Dr Edalin
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          11 Nov 2025 10.45 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="fa-solid fa-envelope" />
                            edalin@example.com
                          </li>
                          <li>
                            <i className="fa-solid fa-phone" />
                            +1 504 368 6874
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link to="#" className="start-link">
                          <i className="fa-solid fa-calendar-check me-1" />
                          Attend
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/upcoming-appointment">
                            <img
                              src={doctor_thumb_13}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0002</p>
                            <h6>
                              <Link to="/patient/upcoming-appointment">
                                Dr.Shanta
                              </Link>
                              <span className="badge new-tag">New</span>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          05 Nov 2025 11.50 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Audio Call</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="fa-solid fa-envelope" />
                            shanta@example.com
                          </li>
                          <li>
                            <i className="fa-solid fa-phone" />
                            +1 832 891 8403
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link to="#" className="start-link">
                          <i className="fa-solid fa-calendar-check me-1" />
                          Attend
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/upcoming-appointment">
                            <img
                              src={doctor_thumb_14}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0003</p>
                            <h6>
                              <Link to="/patient/upcoming-appointment">
                                Dr.John
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          27 Oct 2025 09.30 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="fa-solid fa-envelope" />
                            john@example.com
                          </li>
                          <li>
                            <i className="fa-solid fa-phone" />
                            +1 749 104 6291
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link to="#" className="start-link">
                          <i className="fa-solid fa-calendar-check me-1" />
                          Attend
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/upcoming-appointment">
                            <img
                              src={doctor_thumb_15}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0004</p>
                            <h6>
                              <Link to="/patient/upcoming-appointment">
                                Dr.Susan
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          18 Oct 2025 12.20 PM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Direct Visit</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="fa-solid fa-envelope" />
                            susan@example.com
                          </li>
                          <li>
                            <i className="fa-solid fa-phone" />
                            +1 584 920 7183
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link to="#" className="start-link">
                          <i className="fa-solid fa-calendar-check me-1" />
                          Attend
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/upcoming-appointment">
                            <img
                              src={doctor_thumb_16}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0005</p>
                            <h6>
                              <Link to="/patient/upcoming-appointment">
                                Dr.Juliet
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          10 Oct 2025 11.30 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="fa-solid fa-envelope" />
                            juliet@example.com
                          </li>
                          <li>
                            <i className="fa-solid fa-phone" />
                            +1 059 327 6729
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link to="#" className="start-link">
                          <i className="fa-solid fa-calendar-check me-1" />
                          Attend
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/upcoming-appointment">
                            <img
                              src={doctor_thumb_17}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0006</p>
                            <h6>
                              <Link to="/patient/upcoming-appointment">
                                Dr.Joseph
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          26 Sep 2025 10.20 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="fa-solid fa-envelope" />
                            joseph@example.com
                          </li>
                          <li>
                            <i className="fa-solid fa-phone" />
                            +1 278 402 7103
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link to="#" className="start-link">
                          <i className="fa-solid fa-calendar-check me-1" />
                          Attend
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/upcoming-appointment">
                            <img
                              src={doctor_thumb_18}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0007</p>
                            <h6>
                              <Link to="/patient/upcoming-appointment">
                                Dr.Victoria
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          14 Sep 2025 08.10 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="fa-solid fa-envelope" />
                            victoria@example.com
                          </li>
                          <li>
                            <i className="fa-solid fa-phone" />
                            +1 638 278 0249
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link to="#" className="start-link">
                          <i className="fa-solid fa-calendar-check me-1" />
                          Attend
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/upcoming-appointment">
                            <img
                              src={doctor_thumb_19}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0008</p>
                            <h6>
                              <Link to="/patient/upcoming-appointment">
                                Dr.Benjamin
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          03 Sep 2025 06.00 PM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="mail-info-patient">
                        <ul>
                          <li>
                            <i className="fa-solid fa-envelope" />
                            benjamin@example.com
                          </li>
                          <li>
                            <i className="fa-solid fa-phone" />
                            +1 261 039 1873
                          </li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link to="#" className="start-link">
                          <i className="fa-solid fa-calendar-check me-1" />
                          Attend
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-cancel"
                  role="tabpanel"
                  aria-labelledby="pills-cancel-tab"
                >
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-cancelled-appointment">
                            <img
                              src={doctor_thumb_21}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt00011</p>
                            <h6>
                              <Link to="/patient/patient-cancelled-appointment">
                                Dr Edalin
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          11 Nov 2025 10.45 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-cancelled-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-cancelled-appointment">
                            <img
                              src={doctor_thumb_13}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0002</p>
                            <h6>
                              <Link to="/patient/patient-cancelled-appointment">
                                Dr.Shanta
                              </Link>
                              <span className="badge new-tag">New</span>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          05 Nov 2025 11.50 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Audio Call</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-cancelled-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-cancelled-appointment">
                            <img
                              src={doctor_thumb_14}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0003</p>
                            <h6>
                              <Link to="/patient/patient-cancelled-appointment">
                                Dr.John
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          27 Oct 2025 09.30 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-cancelled-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-cancelled-appointment">
                            <img
                              src={doctor_thumb_15}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0004</p>
                            <h6>
                              <Link to="/patient/patient-cancelled-appointment">
                                Dr.Susan
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          18 Oct 2025 12.20 PM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Direct Visit</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-cancelled-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-cancelled-appointment">
                            <img
                              src={doctor_thumb_16}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0005</p>
                            <h6>
                              <Link to="/patient/patient-cancelled-appointment">
                                Dr.Juliet
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          10 Oct 2025 11.30 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-cancelled-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-cancelled-appointment">
                            <img
                              src={doctor_thumb_17}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0006</p>
                            <h6>
                              <Link to="/patient/patient-cancelled-appointment">
                                Dr.Joseph
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          26 Sep 2025 10.20 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-cancelled-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-cancelled-appointment">
                            <img
                              src={doctor_thumb_18}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0007</p>
                            <h6>
                              <Link to="/patient/patient-cancelled-appointment">
                                Dr.Victoria
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          14 Sep 2025 08.10 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-cancelled-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-cancelled-appointment">
                            <img
                              src={doctor_thumb_19}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0008</p>
                            <h6>
                              <Link to="/patient/patient-cancelled-appointment">
                                Dr.Benjamin
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          03 Sep 2025 06.00 PM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-cancelled-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-complete"
                  role="tabpanel"
                  aria-labelledby="pills-complete-tab"
                >
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-completed-appointment">
                            <img
                              src={doctor_thumb_21}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0001</p>
                            <h6>
                              <Link to="/patient/patient-completed-appointment">
                                Dr Edalin
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          11 Nov 2025 10.45 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-completed-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-completed-appointment">
                            <img
                              src={doctor_thumb_13}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0002</p>
                            <h6>
                              <Link to="/patient/patient-completed-appointment">
                                Dr.Shanta
                              </Link>
                              <span className="badge new-tag">New</span>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          05 Nov 2025 11.50 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Audio Call</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-completed-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-completed-appointment">
                            <img
                              src={doctor_thumb_14}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0003</p>
                            <h6>
                              <Link to="/patient/patient-completed-appointment">
                                Dr.John
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          27 Oct 2025 09.30 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-completed-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-completed-appointment">
                            <img
                              src={doctor_thumb_15}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0004</p>
                            <h6>
                              <Link to="/patient/patient-completed-appointment">
                                Dr.Susan
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          18 Oct 2025 12.20 PM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Direct Visit</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-completed-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-completed-appointment">
                            <img
                              src={doctor_thumb_16}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0005</p>
                            <h6>
                              <Link to="/patient/patient-completed-appointment">
                                Dr.Juliet
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          10 Oct 2025 11.30 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-completed-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-completed-appointment">
                            <img
                              src={doctor_thumb_17}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0006</p>
                            <h6>
                              <Link to="/patient/patient-completed-appointment">
                                Dr.Joseph
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          26 Sep 2025 10.20 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-completed-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-completed-appointment">
                            <img
                              src={doctor_thumb_18}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0007</p>
                            <h6>
                              <Link to="/patient/patient-completed-appointment">
                                Dr.Victoria
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          14 Sep 2025 08.10 AM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Chat</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-completed-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                  {/* Appointment List */}
                  <div className="appointment-wrap">
                    <ul>
                      <li>
                        <div className="patinet-information">
                          <Link to="/patient/patient-completed-appointment">
                            <img
                              src={doctor_thumb_19}
                              alt="User Image"
                            />
                          </Link>
                          <div className="patient-info">
                            <p>#Apt0008</p>
                            <h6>
                              <Link to="/patient/patient-completed-appointment">
                                Dr.Benjamin
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="appointment-info">
                        <p>
                          <i className="fa-solid fa-clock" />
                          03 Sep 2025 06.00 PM
                        </p>
                        <ul className="d-flex apponitment-types">
                          <li>General Visit</li>
                          <li>Video Call</li>
                        </ul>
                      </li>
                      <li className="appointment-detail-btn">
                        <Link
                          to="/patient/patient-completed-appointment"
                          className="start-link"
                        >
                          View Details
                          <i className="fa-regular fa-circle-right ms-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Appointment List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer {...props} />
    </>
  );
};

export default PatientAppointments;
