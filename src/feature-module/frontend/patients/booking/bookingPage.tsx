import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ImageWithBasePath from '../../../../components/imageWithBasePath'
import Header from '../../header'
import BookingWizard from './bookingWizard'
import { useAuth } from '../../../../core/context/AuthContext'

const BookingPage: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [showBookingWizard, setShowBookingWizard] = useState(false)
  const { authState } = useAuth()
  const { isAuthenticated, userType } = authState
  const navigate = useNavigate()
  const location = useLocation()

  // Check if a doctor was passed from navigation state
  useEffect(() => {
    if (location.state?.selectedDoctor) {
      setSelectedDoctor(location.state.selectedDoctor)
      setShowBookingWizard(true)
    }
  }, [location.state])

  // Sample doctors data (you can replace this with API data)
  const doctors = [
    {
      id: 1,
      name: "Dr. Michael Brown",
      specialty: "Psychologist",
      rating: 5.0,
      experience: "10+ years",
      image: "assets/img/doctor-grid/doc1.png",
      location: "Guadalajara, Mexico"
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      experience: "8+ years",
      image: "assets/img/doctor-grid/doc2.png",
      location: "Monterrey, Mexico"
    },
    {
      id: 3,
      name: "Dr. David Wilson",
      specialty: "Neurologist",
      rating: 4.9,
      experience: "12+ years",
      image: "assets/img/doctor-grid/doc3.png",
      location: "Puebla, Mexico"
    },
    {
      id: 4,
      name: "Dr. Emily Davis",
      specialty: "Pediatrician",
      rating: 4.7,
      experience: "6+ years",
      image: "assets/img/doctor-grid/doc4.png",
      location: "Tijuana, Mexico"
    },
    {
      id: 5,
      name: "Dr. James Miller",
      specialty: "Dermatologist",
      rating: 4.9,
      experience: "15+ years",
      image: "assets/img/doctor-grid/doc5.png",
      location: "León, Mexico"
    },
    {
      id: 6,
      name: "Dr. Lisa Anderson",
      specialty: "Orthopedist",
      rating: 4.8,
      experience: "11+ years",
      image: "assets/img/doctor-grid/doctor-grid-06.jpg",
      location: "Cancún, Mexico"
    }
  ]

  const handleBookNow = (doctor: any) => {
    if (!isAuthenticated || userType !== 'patient') {
      // Redirect to patient login with return path
      navigate('/patient/login', { 
        state: { 
          from: { pathname: '/booking' },
          message: 'Please login first to book an appointment with our doctors.'
        }
      })
    } else {
      // User is authenticated as patient, proceed to booking
      setSelectedDoctor(doctor)
      setShowBookingWizard(true)
    }
  }

  const handleBackToDoctors = () => {
    setSelectedDoctor(null)
    setShowBookingWizard(false)
  }

  // If booking wizard is active, show it
  if (showBookingWizard && selectedDoctor) {
    return <BookingWizard selectedDoctor={selectedDoctor} onBack={handleBackToDoctors} />
  }

  return (
    <div className="main-wrapper">
      <Header />
      <div className="doctor-content">
        <div className="container">
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
                      <li className="breadcrumb-item active">Book Appointment</li>
                    </ol>
                    <h2 className="breadcrumb-title">Book Appointment</h2>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors Section */}
          <section className="doctor-section">
            <div className="container">
              <div
                className="section-header sec-header-one text-center aos"
                data-aos="fade-up"
              >
                <span className="badge badge-primary">Available Doctors</span>
                <h2>Choose Your Doctor</h2>
              </div>
              
              <div className="row">
                {doctors.map((doctor, index) => (
                  <div key={doctor.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card">
                      <div className="card-img card-img-hover">
                        <Link to="/patient/doctor-profile">
                          <ImageWithBasePath src={doctor.image} alt={doctor.name} />
                        </Link>
                        <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                          <span className="badge bg-orange">
                            <i className="fa-solid fa-star me-1" />
                            {doctor.rating}
                          </span>
                          <Link to="#" className="fav-icon">
                            <i className="fa fa-heart" />
                          </Link>
                        </div>
                      </div>
                      <div className="card-body p-0">
                        <div className={`d-flex active-bar ${index % 2 === 0 ? 'active-bar-pink' : ''} align-items-center justify-content-between p-3`}>
                          <Link to="#" className={`${index % 2 === 0 ? 'text-pink' : 'text-indigo'} fw-medium fs-14`}>
                            {doctor.specialty}
                          </Link>
                          <span className="badge bg-success-light d-inline-flex align-items-center">
                            <i className="fa-solid fa-circle fs-5 me-1" />
                            Available
                          </span>
                        </div>
                        <div className="p-3 pt-0">
                          <div className="doctor-info-detail mb-3 pb-3">
                            <h3 className="mb-1">
                              <Link to="/patient/doctor-profile">{doctor.name}</Link>
                            </h3>
                            <div className="d-flex align-items-center">
                              <p className="d-flex align-items-center mb-0 fs-14">
                                <i className="isax isax-location me-2" />
                                {doctor.location}
                              </p>
                              <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                              <span className="fs-14 fw-medium">30 Min</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              onClick={() => handleBookNow(doctor)}
                              className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
