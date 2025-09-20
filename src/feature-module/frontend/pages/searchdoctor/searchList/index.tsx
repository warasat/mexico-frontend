import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../../components/imageWithBasePath";
import DoctorProfileService from "../../../common/services/doctorProfileService";
import { getDiseasesForSpecialty } from "../../../common/data/specialties";
import { useAuth } from "../../../../../core/context/AuthContext";
import { useEffect, useState } from "react";
import SocketService from "../../../../../core/services/socketService";

const SearchList = () => {
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;
  const [doctorAvailability, setDoctorAvailability] = useState<{[key: string]: 'available' | 'unavailable'}>({});

  // Get doctor profile service instance
  const doctorProfileService = DoctorProfileService.getInstance();
  
  // Function to get insurance data for a doctor
  const getDoctorInsurances = (doctorId: number): string[] => {
    const profile = doctorProfileService.getDoctorProfile(doctorId.toString());
    return profile?.selectedInsurances || [];
  };

  // Listen for doctor availability updates
  useEffect(() => {
    const socketService = SocketService.getInstance();
    
    const unsubscribe = socketService.subscribe('doctorAvailabilityUpdate', (data: { doctorId: string; availability: 'available' | 'unavailable' }) => {
      setDoctorAvailability(prev => ({
        ...prev,
        [data.doctorId]: data.availability
      }));
    });

    return unsubscribe;
  }, []);

  // Function to get doctor availability
  const getDoctorAvailability = (doctorId: number): 'available' | 'unavailable' => {
    return doctorAvailability[doctorId.toString()] || 'available'; // Default to available if not set
  };

  // Doctor data for the search list
  const doctors = [
    {
      id: "68cd5ac1f22a2bbb33df46f5",
      name: "Dr. Elena Rivera",
      specialty: "Dentist",
      rating: "5.0",
      location: "Puerto Vallarta",
      experience: "10+ years",
      image: "assets/img/doctor-grid/doc1.png",
      insurance: getDoctorInsurances(1)
    },
    {
      id: 2,
      name: "Dr. Nicholas Tello",
      specialty: "Pediatrician", 
      rating: "4.6",
      location: "Mexico City",
      experience: "8+ years",
      image: "assets/img/doctor-grid/doc2.png",
      insurance: getDoctorInsurances(2)
    },
    {
      id: 3,
      name: "Dr. Harold Bryant",
      specialty: "Neurologist",
      rating: "4.8", 
      location: "Playa del Carmen",
      experience: "12+ years",
      image: "assets/img/doctor-grid/doc3.png",
      insurance: getDoctorInsurances(3)
    },
    {
      id: 4,
      name: "Dr. Sandra Jones",
      specialty: "Cardiologist",
      rating: "4.8",
      location: "Lake Chapala", 
      experience: "15+ years",
      image: "assets/img/doctor-grid/doc4.png",
      insurance: getDoctorInsurances(4)
    },
    {
      id: 5,
      name: "Dr. Charles Scott",
      specialty: "Neurologist",
      rating: "4.2",
      location: "San Miguel de Allende",
      experience: "6+ years", 
      image: "assets/img/doctor-grid/doc5.png",
      insurance: getDoctorInsurances(5)
    },
    {
      id: 6,
      name: "Dr. Lisa Anderson",
      specialty: "Orthopedist",
      rating: "4.7",
      location: "Guadalajara",
      experience: "11+ years",
      image: "assets/img/doctor-grid/doc6.png",
      insurance: getDoctorInsurances(6)
    },
    {
      id: 7,
      name: "Dr. Robert Wilson",
      specialty: "Dermatologist", 
      rating: "4.7",
      location: "Guadalajara",
      experience: "9+ years",
      image: "assets/img/doctor-grid/doc7.png",
      insurance: getDoctorInsurances(7)
    },
    {
      id: 8,
      name: "Dr. Jennifer Davis",
      specialty: "Pediatrician",
      rating: "4.7", 
      location: "Puerto Vallarta",
      experience: "7+ years",
      image: "assets/img/doctor-grid/doc8.png",
      insurance: getDoctorInsurances(8)
    },
    {
      id: 9,
      name: "Dr. Mark Thompson",
      specialty: "Cardiologist",
      rating: "4.9",
      location: "Mexico City",
      experience: "13+ years", 
      image: "assets/img/doctor-grid/doc9.png",
      insurance: getDoctorInsurances(9)
    },
    {
      id: 10,
      name: "Dr. Sarah Johnson",
      specialty: "Psychiatrist",
      rating: "5.0",
      location: "Playa del Carmen",
      experience: "14+ years",
      image: "assets/img/doctor-grid/doc10.png",
      insurance: getDoctorInsurances(10)
    },
    {
      id: 11,
      name: "Dr. David Miller",
      specialty: "Urologist",
      rating: "4.4",
      location: "Lake Chapala", 
      experience: "8+ years",
      image: "assets/img/doctor-grid/doc11.png"
    },
    {
      id: 12,
      name: "Dr. Emily Garcia",
      specialty: "Gynecologist",
      rating: "4.2",
      location: "San Miguel de Allende",
      experience: "5+ years",
      image: "assets/img/doctor-grid/doc12.png"
    }
  ];
  return (
    <div className="row">
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc1.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar align-items-center justify-content-between p-3">
              <Link to="#" className="text-indigo fw-medium fs-14">
                Psychologist
              </Link>
              <span className={`badge ${getDoctorAvailability(1) === 'available' ? 'bg-success-light' : 'bg-danger-light'} d-inline-flex align-items-center`}>
                <i className="fa-solid fa-circle fs-5 me-1" />
                {getDoctorAvailability(1) === 'available' ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Michael Brown</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Minneapolis, MN
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to={isAuthenticated && userType === 'patient' ? "/booking" : "/patient/login"}
                    state={isAuthenticated && userType === 'patient' ? { selectedDoctor: doctors[0] } : undefined}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc2.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-pink align-items-center justify-content-between p-3">
              <Link to="#" className="text-pink fw-medium fs-14">
                Pediatrician
              </Link>
              <span className={`badge ${getDoctorAvailability(2) === 'available' ? 'bg-success-light' : 'bg-danger-light'} d-inline-flex align-items-center`}>
                <i className="fa-solid fa-circle fs-5 me-1" />
                {getDoctorAvailability(2) === 'available' ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Nicholas Tello</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Ogden, IA
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">60 Min</span>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-shield-tick me-2" />
                    {Array.isArray(doctors[0].insurance) ? doctors[0].insurance.join(", ") : doctors[0].insurance}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to={isAuthenticated && userType === 'patient' ? "/booking" : "/patient/login"}
                    state={isAuthenticated && userType === 'patient' ? { selectedDoctor: doctors[0] } : undefined}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc3.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-teal align-items-center justify-content-between p-3">
              <Link to="#" className="text-teal fw-medium fs-14">
                Neurologist
              </Link>
              <span className="badge bg-success-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Available
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Harold Bryant</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Winona, MS
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-shield-tick me-2" />
                    {Array.isArray(doctors[1].insurance) ? doctors[1].insurance.join(", ") : doctors[1].insurance}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc4.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-info align-items-center justify-content-between p-3">
              <Link to="#" className="text-info fw-medium fs-14">
                Cardiologist
              </Link>
              <span className="badge bg-success-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Available
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Sandra Jones</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Beckley, WV
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
                {(() => {
                  const diseases = getDiseasesForSpecialty("Cardiologist");
                  if (diseases.length === 0) return null;
                  return (
                    <div className="d-flex align-items-center mt-2">
                      <p className="d-flex align-items-center mb-0 fs-14">
                        <i className="isax isax-archive-14 me-2" />
                        {diseases.join(", ")}
                      </p>
                    </div>
                  );
                })()}
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc5.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-teal align-items-center justify-content-between p-3">
              <Link to="#" className="text-teal fw-medium fs-14">
                Neurologist
              </Link>
              <span className="badge bg-success-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Available
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Charles Scott</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Hamshire, TX
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc6.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-info align-items-center justify-content-between p-3">
              <Link to="#" className="text-info fw-medium fs-14">
                Cardiologist
              </Link>
              <span className="badge bg-success-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Available
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Robert Thomas</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Oakland, CA
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
                {(() => {
                  const diseases = getDiseasesForSpecialty("Cardiologist");
                  if (diseases.length === 0) return null;
                  return (
                    <div className="d-flex align-items-center mt-2">
                      <p className="d-flex align-items-center mb-0 fs-14">
                        <i className="isax isax-archive-14 me-2" />
                        {diseases.join(", ")}
                      </p>
                    </div>
                  );
                })()}
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc7.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-indigo align-items-center justify-content-between p-3">
              <Link to="#" className="text-indigo fw-medium fs-14">
                Psychologist
              </Link>
              <span className="badge bg-success-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Available
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Margaret Koller</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Killeen, TX
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc8.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-pink align-items-center justify-content-between p-3">
              <Link to="#" className="text-pink fw-medium fs-14">
                Pediatrician
              </Link>
              <span className="badge bg-danger-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Unavailable
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Cath Busick</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Schenectady, NY
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc9.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-indigo align-items-center justify-content-between p-3">
              <Link to="#" className="text-indigo fw-medium fs-14">
                Psychologist
              </Link>
              <span className="badge bg-success-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Available
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Travis Barton</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Metairie, LA
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">60 Min</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc10.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-danger align-items-center justify-content-between p-3">
              <Link to="#" className="text-danger fw-medium fs-14">
                Gastroenterology
              </Link>
              <span className="badge bg-success-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Available
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Daisy Malcolm</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Lexington, KY
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">60 Min</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc11.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-info align-items-center justify-content-between p-3">
              <Link to="#" className="text-info fw-medium fs-14">
                Cardiologist
              </Link>
              <span className="badge bg-danger-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Unavailable
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Tyrone Patrick</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Clark Fork, ID
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-lg-4 col-md-6">
        <div className="card">
          <div className="card-img card-img-hover">
            <Link to="/patient/doctor-profile">
              <ImageWithBasePath src="assets/img/doctor-grid/doc12.png" alt="" />
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="d-flex active-bar active-bar-pink align-items-center justify-content-between p-3">
              <Link to="#" className="text-pink fw-medium fs-14">
                Pediatrician
              </Link>
              <span className="badge bg-danger-light d-inline-flex align-items-center">
                <i className="fa-solid fa-circle fs-5 me-1" />
                Unavailable
              </span>
            </div>
            <div className="p-3 pt-0">
              <div className="doctor-info-detail mb-3 pb-3">
                <h3 className="mb-1">
                  <Link to="/patient/doctor-profile">Dr. Ann Bell</Link>
                </h3>
                <div className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0 fs-14">
                    <i className="isax isax-location me-2" />
                    Minneapolis, MN
                  </p>
                  <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                  <span className="fs-14 fw-medium">30 Min</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {getDoctorAvailability(Number(doctors[0].id)) === 'available' ? (
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctors[0] }}
                    className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button
                    className="btn btn-md btn-secondary d-inline-flex align-items-center rounded-pill"
                    disabled
                    title="Doctor is currently unavailable"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="text-center mb-4">
          <Link
            to="/patient/patient-appointments"
            className="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
          >
            <i className="isax isax-d-cube-scan5 me-2" />
            Load More 425 Doctors
          </Link>
        </div>
      </div>
    </div>

  );
};

export default SearchList;
