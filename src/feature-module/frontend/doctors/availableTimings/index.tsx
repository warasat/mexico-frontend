import Header from "../../header";
import DoctorSidebar from "../sidebar";
import DoctorFooter from "../../common/doctorFooter";
import Select from "react-select";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import CommonDatePicker from "../../common/common-datePicker/commonDatePicker";
import { useAuth } from "../../../../core/context/AuthContext";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimings = (props: any) => {
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;
  
  // State for selected time slot (single selection)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Function to handle time slot selection (single selection mode)
  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(prev => {
      // If clicking the same slot, deselect it
      if (prev === timeSlot) {
        return null;
      }
      // Otherwise, select the new slot (this automatically deselects the previous one)
      return timeSlot;
    });
  };

  // Function to get the appropriate home redirect URL based on user type
  const getHomeRedirectUrl = () => {
    if (isAuthenticated && userType === 'doctor') {
      return '/doctor/doctor-dashboard';
    } else if (isAuthenticated && userType === 'patient') {
      return '/index';
    } else if (isAuthenticated && userType === 'admin') {
      return '/admin/dashboard';
    }
    return '/index'; // Default to landing page for unauthenticated users
  };

  const interval = [
    { label: "10 Minutes", value: "10 Minutes" },
    { label: "20 Minutes", value: "20 Minutes" },
    { label: "30 Minutes", value: "30 Minutes" },
  ];
  const duration = [
    { label: "30 Minutes", value: "30 Minutes" },
    { label: "1 hour", value: "1 hour" },
  ];

  return (
    <>
      <div className="main-wrapper">
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
                      <li className="breadcrumb-item active">Available Timings</li>
                    </ol>
                    <h2 className="breadcrumb-title">Available Timings</h2>
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
        <div className="content doctor-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-xl-3 theiaStickySidebar">
                {/* Profile Sidebar */}
                <DoctorSidebar />
                {/* /Profile Sidebar */}
              </div>
              <div className="col-lg-8 col-xl-9">
                <div className="dashboard-header">
                  <h3>Available Timings</h3>
                </div>
                <div className="appointment-tabs">
                  <ul className="nav available-nav">
                    <li className="nav-item" role="presentation">
                      <Link
                        className="nav-link active"
                        to="#"
                        data-bs-toggle="tab"
                        data-bs-target="#general-availability"
                      >
                        General Availability
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="tab-content pt-0 timing-content">
                  {/* General Availability */}
                  <div className="tab-pane fade show active" id="general-availability">
                    <div className="card custom-card">
                      <div className="card-body">
                        <div className="card-header">
                          <h3>Select Available Slots</h3>
                        </div>
                        <div className="available-tab">
                          <label className="form-label">Select Available days</label>
                          <ul className="nav">
                            <li>
                              <Link
                                to="#"
                                className="active"
                                data-bs-toggle="tab"
                                data-bs-target="#monday"
                              >
                                Monday
                              </Link>
                            </li>
                            <li>
                              <Link to="#" data-bs-toggle="tab" data-bs-target="#tuesday">
                                Tuesday
                              </Link>
                            </li>
                            <li>
                              <Link to="#" data-bs-toggle="tab" data-bs-target="#wednesday">
                                Wednesday
                              </Link>
                            </li>
                            <li>
                              <Link to="#" data-bs-toggle="tab" data-bs-target="#thursday">
                                Thursday
                              </Link>
                            </li>
                            <li>
                              <Link to="#" data-bs-toggle="tab" data-bs-target="#friday">
                                Friday
                              </Link>
                            </li>
                            <li>
                              <Link to="#" data-bs-toggle="tab" data-bs-target="#saturday">
                                Saturday
                              </Link>
                            </li>
                            <li>
                              <Link to="#" data-bs-toggle="tab" data-bs-target="#sunday">
                                Sunday
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="tab-content pt-0">
                          {/* Slot */}
                          <div className="tab-pane active show" id="monday">
                            <div className="row">
                              {/* Morning Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Morning</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-09:00-09:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-09:00-09:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:00 - 09:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-09:30-10:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-09:30-10:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:30 - 10:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-10:00-10:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-10:00-10:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:00 - 10:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-10:30-11:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-10:30-11:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:30 - 11:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-11:00-11:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-11:00-11:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 11:00 - 11:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Afternoon Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Afternoon</h4>
                                  <div className="time-slot-list">
                                <ul>
                                  <li>
                                    <Link
                                          className={`timing ${selectedTimeSlot === 'monday-12:00-12:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-12:00-12:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:00 - 12:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-12:30-01:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-12:30-01:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:30 - 01:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-01:00-01:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-01:00-01:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:00 - 01:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-01:30-02:00' ? 'active' : ''}`} 
                                      to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-01:30-02:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:30 - 02:00
                                          </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                          className={`timing ${selectedTimeSlot === 'monday-02:00-02:30' ? 'active' : ''}`} 
                                      to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-02:00-02:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 02:00 - 02:30
                                          </span>
                                    </Link>
                                  </li>
                                </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Evening Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Evening</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-05:00-05:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-05:00-05:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:00 - 05:30
                                          </span>
                                        </Link>
                                  </li>
                                  <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-05:30-06:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-05:30-06:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:30 - 06:00
                                          </span>
                                        </Link>
                                  </li>
                                  <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-06:00-06:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-06:00-06:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:00 - 06:30
                                          </span>
                                        </Link>
                                  </li>
                                  <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-06:30-07:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-06:30-07:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:30 - 07:00
                                          </span>
                                        </Link>
                                  </li>
                                  <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'monday-07:00-07:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('monday-07:00-07:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 07:00 - 07:30
                                          </span>
                                        </Link>
                                  </li>
                                </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Slot */}
                          {/* Slot */}
                          <div className="tab-pane fade" id="tuesday">
                            <div className="row">
                              {/* Morning Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Morning</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-09:00-09:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-09:00-09:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:00 - 09:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-09:30-10:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-09:30-10:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:30 - 10:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-10:00-10:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-10:00-10:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:00 - 10:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-10:30-11:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-10:30-11:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:30 - 11:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-11:00-11:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-11:00-11:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 11:00 - 11:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Afternoon Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Afternoon</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-12:00-12:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-12:00-12:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:00 - 12:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-12:30-01:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-12:30-01:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:30 - 01:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-01:00-01:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-01:00-01:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:00 - 01:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-01:30-02:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-01:30-02:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:30 - 02:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-02:00-02:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-02:00-02:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 02:00 - 02:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Evening Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Evening</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-05:00-05:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-05:00-05:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:00 - 05:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-05:30-06:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-05:30-06:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:30 - 06:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-06:00-06:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-06:00-06:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:00 - 06:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-06:30-07:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-06:30-07:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:30 - 07:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'tuesday-07:00-07:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('tuesday-07:00-07:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 07:00 - 07:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Slot */}
                          {/* Slot */}
                          <div className="tab-pane fade" id="wednesday">
                            <div className="row">
                              {/* Morning Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Morning</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-09:00-09:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-09:00-09:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:00 - 09:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-09:30-10:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-09:30-10:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:30 - 10:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-10:00-10:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-10:00-10:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:00 - 10:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-10:30-11:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-10:30-11:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:30 - 11:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-11:00-11:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-11:00-11:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 11:00 - 11:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Afternoon Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Afternoon</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-12:00-12:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-12:00-12:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:00 - 12:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-12:30-01:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-12:30-01:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:30 - 01:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-01:00-01:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-01:00-01:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:00 - 01:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-01:30-02:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-01:30-02:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:30 - 02:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-02:00-02:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-02:00-02:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 02:00 - 02:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Evening Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Evening</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-05:00-05:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-05:00-05:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:00 - 05:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-05:30-06:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-05:30-06:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:30 - 06:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-06:00-06:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-06:00-06:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:00 - 06:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-06:30-07:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-06:30-07:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:30 - 07:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'wednesday-07:00-07:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('wednesday-07:00-07:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 07:00 - 07:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Slot */}
                          {/* Slot */}
                          <div className="tab-pane fade" id="thursday">
                            <div className="row">
                              {/* Morning Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Morning</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-09:00-09:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-09:00-09:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:00 - 09:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-09:30-10:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-09:30-10:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:30 - 10:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-10:00-10:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-10:00-10:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:00 - 10:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-10:30-11:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-10:30-11:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:30 - 11:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-11:00-11:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-11:00-11:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 11:00 - 11:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Afternoon Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Afternoon</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-12:00-12:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-12:00-12:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:00 - 12:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-12:30-01:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-12:30-01:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:30 - 01:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-01:00-01:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-01:00-01:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:00 - 01:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-01:30-02:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-01:30-02:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:30 - 02:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-02:00-02:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-02:00-02:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 02:00 - 02:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Evening Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Evening</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-05:00-05:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-05:00-05:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:00 - 05:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-05:30-06:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-05:30-06:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:30 - 06:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-06:00-06:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-06:00-06:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:00 - 06:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-06:30-07:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-06:30-07:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:30 - 07:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'thursday-07:00-07:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('thursday-07:00-07:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 07:00 - 07:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Slot */}
                          {/* Slot */}
                          <div className="tab-pane fade" id="friday">
                            <div className="row">
                              {/* Morning Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Morning</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-09:00-09:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-09:00-09:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:00 - 09:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-09:30-10:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-09:30-10:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:30 - 10:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-10:00-10:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-10:00-10:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:00 - 10:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-10:30-11:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-10:30-11:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:30 - 11:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-11:00-11:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-11:00-11:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 11:00 - 11:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Afternoon Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Afternoon</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-12:00-12:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-12:00-12:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:00 - 12:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-12:30-01:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-12:30-01:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:30 - 01:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-01:00-01:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-01:00-01:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:00 - 01:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-01:30-02:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-01:30-02:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:30 - 02:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-02:00-02:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-02:00-02:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 02:00 - 02:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Evening Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Evening</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-05:00-05:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-05:00-05:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:00 - 05:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-05:30-06:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-05:30-06:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:30 - 06:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-06:00-06:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-06:00-06:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:00 - 06:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-06:30-07:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-06:30-07:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:30 - 07:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'friday-07:00-07:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('friday-07:00-07:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 07:00 - 07:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Slot */}
                          {/* Slot */}
                          <div className="tab-pane fade" id="saturday">
                            <div className="row">
                              {/* Morning Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Morning</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-09:00-09:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-09:00-09:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:00 - 09:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-09:30-10:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-09:30-10:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:30 - 10:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-10:00-10:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-10:00-10:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:00 - 10:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-10:30-11:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-10:30-11:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:30 - 11:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-11:00-11:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-11:00-11:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 11:00 - 11:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Afternoon Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Afternoon</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-12:00-12:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-12:00-12:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:00 - 12:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-12:30-01:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-12:30-01:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:30 - 01:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-01:00-01:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-01:00-01:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:00 - 01:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-01:30-02:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-01:30-02:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:30 - 02:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-02:00-02:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-02:00-02:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 02:00 - 02:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Evening Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Evening</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-05:00-05:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-05:00-05:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:00 - 05:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-05:30-06:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-05:30-06:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:30 - 06:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-06:00-06:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-06:00-06:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:00 - 06:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-06:30-07:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-06:30-07:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:30 - 07:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'saturday-07:00-07:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('saturday-07:00-07:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 07:00 - 07:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Slot */}
                          {/* Slot */}
                          <div className="tab-pane fade" id="sunday">
                            <div className="row">
                              {/* Morning Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Morning</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-09:00-09:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-09:00-09:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:00 - 09:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-09:30-10:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-09:30-10:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 09:30 - 10:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-10:00-10:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-10:00-10:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:00 - 10:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-10:30-11:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-10:30-11:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 10:30 - 11:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-11:00-11:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-11:00-11:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 11:00 - 11:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Afternoon Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Afternoon</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-12:00-12:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-12:00-12:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:00 - 12:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-12:30-01:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-12:30-01:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 12:30 - 01:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-01:00-01:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-01:00-01:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:00 - 01:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-01:30-02:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-01:30-02:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 01:30 - 02:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-02:00-02:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-02:00-02:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 02:00 - 02:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Evening Section */}
                              <div className="col-lg-4 col-md-4">
                                <div className="time-slot time-slot-blk">
                                  <h4>Evening</h4>
                                  <div className="time-slot-list">
                                    <ul>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-05:00-05:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-05:00-05:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:00 - 05:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-05:30-06:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-05:30-06:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 05:30 - 06:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-06:00-06:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-06:00-06:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:00 - 06:30
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-06:30-07:00' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-06:30-07:00');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 06:30 - 07:00
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link 
                                          className={`timing ${selectedTimeSlot === 'sunday-07:00-07:30' ? 'active' : ''}`} 
                                          to="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleTimeSlotClick('sunday-07:00-07:30');
                                          }}
                                        >
                                          <span>
                                            <i className="isax isax-clock" /> 07:00 - 07:30
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Slot */}
                          <div className="modal-btn text-end">
                            <Link
                              to="#"
                              className="btn btn-gray"
                              data-bs-toggle="modal"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </Link>
                            <button className="btn btn-primary prime-btn">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /General Availability */}
                </div>
              </div>

            </div>
          </div>
        </div>  

        {/* /Page Content */}
        <DoctorFooter />
      </div>
      {/* Add Slots */}
      <div className="modal fade custom-modals" id="add_slot">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Appointment Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="timing-modal">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Start Time</label>

                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">End Time</label>
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">
                          Appointment Intervals
                        </label>

                        <Select
                          options={interval}
                          className="select"
                          placeholder="10 Minutes"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">
                          Appointment Durations
                        </label>

                        <Select
                          options={duration}
                          className="select"
                          placeholder="30 Minutes"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-wrap mb-0">
                        <label className="col-form-label d-block">
                          Assign Appointment Spaces
                        </label>
                        <div className="custom-control form-check custom-control-inline">
                          <input
                            type="radio"
                            id="space1"
                            name="rating_option"
                            className="form-check-input"
                            defaultValue="price_free"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="space1">
                            Space 1
                          </label>
                        </div>
                        <div className="custom-control form-check custom-control-inline">
                          <input
                            type="radio"
                            id="space2"
                            name="rating_option"
                            className="form-check-input"
                            defaultValue="price_free"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="space2">
                            Space 2
                          </label>
                        </div>
                        <div className="custom-control form-check custom-control-inline">
                          <input
                            type="radio"
                            id="space3"
                            name="rating_option"
                            className="form-check-input"
                            defaultValue="price_free"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="space3">
                            Space 3
                          </label>
                        </div>
                        <div className="custom-control form-check custom-control-inline">
                          <input
                            type="radio"
                            id="space4"
                            name="rating_option"
                            className="form-check-input"
                            defaultValue="price_free"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="space4">
                            Space 4
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-btn text-end">
                  <Link
                    to="#"
                    className="btn btn-gray"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-primary prime-btn"
                    data-bs-dismiss="modal"
                  >
                    Save Changes
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Add Slots */}
      {/* Remove Slots */}
      <div className="modal fade info-modal" id="delete_slot">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="success-wrap">
                <div className="success-info">
                  <div className="text-center">
                    <span className="icon-success bg-red">
                      <i className="fa-solid fa-xmark" />
                    </span>
                    <h3>Remove Slots</h3>
                    <p>Are you sure you want to remove this slots?</p>
                  </div>
                </div>
              </div>
              <div className="modal-btn text-center">
                <Link to="#" className="btn btn-gray" data-bs-dismiss="modal">
                  Yes, Remove
                </Link>
                <button
                  className="btn btn-primary prime-btn"
                  data-bs-dismiss="modal"
                >
                  No, i Changed my mind
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Remove Slots */}
    </>
  );
};

export default AvailableTimings;
