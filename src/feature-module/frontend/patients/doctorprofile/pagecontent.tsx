import { IMG01, IMG02 } from "./img";
import MyComponent from "./mycomponent";
import { Link, useLocation } from "react-router-dom";
import { doctorthumb02 } from "../../imagepath";
import { useAuth } from "../../../../core/context/AuthContext";

const Pagecontent = () => {
  const location = useLocation();
  const selectedDoctor = location.state?.selectedDoctor;
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;

  // Default doctor data (Dr. Darren Elder)
  const defaultDoctor = {
    id: 1,
    name: "Dr. Darren Elder",
    specialty: "Dentist",
    department: "BDS, MDS - Oral & Maxillofacial Surgery",
    rating: 4.0,
    totalReviews: 35,
    image: "assets/img/doctor-grid/doc3.png",
    location: "Guadalajara",
    servicesOffered: [],
  };

  // Use selected doctor or default
  const doctor = selectedDoctor || defaultDoctor;
  return (
    <>
      <div>
        <div className="card">
          <div className="card-body">
            <div className="doctor-widget justify-content-between align-items-center">
              <div className="doc-info-left">
                <div className="doctor-img">
                  <img
                    src={doctor.image}
                    className="img-fluid"
                    alt="User Image"
                    onError={(e) => {
                      e.currentTarget.src = IMG01;
                    }}
                  />
                </div>

                <div className="doc-info-cont">
                  <h4 className="doc-name">{doctor.name}</h4>
                  <p className="doc-speciality">{doctor.department}</p>
                  <p className="doc-department">
                    <img src={IMG02} className="img-fluid" alt="Speciality" />
                    {doctor.specialty}
                  </p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < Math.floor(doctor.rating) ? "filled" : ""
                        }`}
                      />
                    ))}
                    <span className="d-inline-block average-rating ms-1">
                      ({doctor.totalReviews})
                    </span>
                  </div>
                  <div className="clinic-details">
                    <p className="doc-location">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {doctor.location} -
                    </p>

                    {/* <i className="fas fa-map-marker-alt" /> Newyork, USA -{" "}
                  <Link to="#;">Get Directions</Link> */}

                    <div>
                      <MyComponent />
                    </div>
                  </div>
                  <div className="clinic-services">
                    {doctor.servicesOffered && doctor.servicesOffered.length > 0 ? (
                      doctor.servicesOffered.map((service: string, index: number) => (
                        <span key={index}>{service}</span>
                      ))
                    ) : null}
                  </div>
                </div>
              </div>
              <Link
                  to={
                    isAuthenticated && userType === "patient"
                      ? "/booking"
                      : "/patient/login"
                  }
                  state={
                    isAuthenticated && userType === "patient"
                      ? {
                          selectedDoctor: doctor,
                        }
                      : undefined
                  }
                  // ${
                  //   selectedDates[doctor.id]
                  //     ? 'btn-primary-gradient'
                  //     : 'btn-secondary'
                  // }
                  className={`btn btn-lg d-inline-flex align-items-center rounded-pill btn-primary-gradient
                                      `}
                  // onClick={(e) => {
                  //   if (!selectedDates[doctor.id]) {
                  //     e.preventDefault();
                  //     alert('Please select a date first');
                  //   }
                  // }}
                >
                  <i className="isax isax-calendar-1 me-2" />
                  Book Appointment
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade call-modal" id="voice_call">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              {/* Outgoing Call */}
              <div className="call-box incoming-box">
                <div className="call-wrapper">
                  <div className="call-inner">
                    <div className="call-user">
                      <img
                        alt="User Image"
                        src={doctorthumb02}
                        className="call-avatar"
                      />
                      <h4>Dr. Darren Elder</h4>
                      <span>Connecting...</span>
                    </div>
                    <div className="call-items">
                      <Link
                        to="#"
                        className="btn call-item call-end"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="material-icons">call_end</i>
                      </Link>
                      <Link
                        to="/pages/voice-call"
                        className="btn call-item call-start"
                      >
                        <i className="material-icons">call</i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Outgoing Call */}
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade call-modal" id="video_call">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              {/* Incoming Call */}
              <div className="call-box incoming-box">
                <div className="call-wrapper">
                  <div className="call-inner">
                    <div className="call-user">
                      <img
                        className="call-avatar"
                        src={doctorthumb02}
                        alt="User Image"
                      />
                      <h4>Dr. Darren Elder</h4>
                      <span>Calling ...</span>
                    </div>
                    <div className="call-items">
                      <Link
                        to="#"
                        className="btn call-item call-end"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="material-icons">call_end</i>
                      </Link>
                      <Link
                        to="/pages/video-call"
                        className="btn call-item call-start"
                      >
                        <i className="material-icons">videocam</i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Incoming Call */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagecontent;
