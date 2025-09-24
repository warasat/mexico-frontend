import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ImageWithBasePath from '../../../../components/imageWithBasePath'
import Header from '../../header'
import BookingWizard from './bookingWizard'
import { useAuth } from '../../../../core/context/AuthContext'
import publicDoctorApi, { type PublicDoctor } from '../../../../core/services/publicDoctorApi'
import SocketService from '../../../../core/services/socketService'
import { useGlobalTranslation } from '../../../../hooks/useGlobalTranslation'

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: string
  image: string
  location: string
  insurance: string[]
  available: boolean
  servicesOffered: string[]
}

const BookingPage: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [showBookingWizard, setShowBookingWizard] = useState(false)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [doctorAvailability, setDoctorAvailability] = useState<{[key: string]: 'available' | 'unavailable'}>({})
  const { authState } = useAuth()
  const { isAuthenticated, userType } = authState
  const navigate = useNavigate()
  const { t } = useGlobalTranslation()
  const location = useLocation()

  // Check if a doctor was passed from navigation state
  useEffect(() => {
    if (location.state?.selectedDoctor) {
      setSelectedDoctor(location.state.selectedDoctor)
      setShowBookingWizard(true)
    }
  }, [location.state])
  useEffect(() => {
    (async () => {
      try {
        const res = await publicDoctorApi.list({ sort: 'rank', limit: 100 })
        const mapped: Doctor[] = res.results.map((d: PublicDoctor) => ({
          id: d.id,
          name: d.displayName,
          specialty: d.designation || 'Doctor',
          rating: 4.8,
          experience: d.experience || '',
          image: d.image || 'assets/img/doctor-grid/doc1.png',
          location: d.location || '',
          insurance: Array.isArray(d.insurances) ? d.insurances : [],
          available: d.availability === 'available', // Get availability from database
          servicesOffered: d.servicesOffered || [], // Get services from database
        }))
        setDoctors(mapped)
      } catch {
        setDoctors([])
      }
    })()
  }, [])

  // Subscribe to real-time availability updates
  useEffect(() => {
    const socketService = SocketService.getInstance()
    const unsubscribe = socketService.subscribe('doctorAvailabilityUpdate', (data: { doctorId: string; availability: 'available' | 'unavailable' }) => {
      console.log('Booking page received availability update:', data)
      
      setDoctorAvailability(prev => ({
        ...prev,
        [data.doctorId]: data.availability
      }))
      
      // Also update the doctors array
      setDoctors(prevDoctors => 
        prevDoctors.map(doctor => 
          doctor.id.toString() === data.doctorId 
            ? { ...doctor, available: data.availability === 'available' }
            : doctor
        )
      )
    })
    return unsubscribe
  }, [])

  const handleBookNow = (doctor: Doctor) => {
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

  // Helper function to get doctor availability
  const getDoctorAvailability = (doctor: Doctor): 'available' | 'unavailable' => {
    // First check if we have a real-time update for this doctor
    const realTimeAvailability = doctorAvailability[doctor.id.toString()]
    if (realTimeAvailability) {
      return realTimeAvailability
    }
    // Fall back to the doctor's stored availability
    return doctor.available ? 'available' : 'unavailable'
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
                      <li className="breadcrumb-item active" data-key="patient.booking.title">{t("patient.booking.title")}</li>
                    </ol>
                    <h2 className="breadcrumb-title" data-key="patient.booking.title">{t("patient.booking.title")}</h2>
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
                <span className="badge badge-primary" data-key="patient.booking.availableDoctors">{t("patient.booking.availableDoctors")}</span>
                <h2 data-key="patient.booking.chooseDoctor">{t("patient.booking.chooseDoctor")}</h2>
              </div>
              
              <div className="row">
                {doctors.map((doctor, index) => (
                  <div key={doctor.id} className="col-lg-4 col-md-6 mb-4 d-flex">
                    <div className="card w-100" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                      <div className="card-img card-img-hover" style={{height: '250px', overflow: 'hidden'}}>
                        <Link 
                          to="/patient/doctor-profile"
                          state={{ selectedDoctor: doctor }}
                        >
                          <ImageWithBasePath 
                            src={doctor.image} 
                            alt={doctor.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center top'
                            }}
                          />
                        </Link>
                      </div>
                      <div className="card-body p-0" style={{flex: '1', display: 'flex', flexDirection: 'column'}}>
                        <div className={`d-flex active-bar ${index % 2 === 0 ? 'active-bar-pink' : ''} align-items-center justify-content-between p-3`}>
                          <Link to="#" className={`${index % 2 === 0 ? 'text-pink' : 'text-indigo'} fw-medium fs-14`}>
                            {doctor.specialty}
                          </Link>
                          <span className={`badge ${getDoctorAvailability(doctor) === 'available' ? 'bg-success-light' : 'bg-danger-light'} d-inline-flex align-items-center`}>
                            <i className="fa-solid fa-circle fs-5 me-1" />
                            {getDoctorAvailability(doctor) === 'available' ? t("common.available") : t("common.unavailable")}
                          </span>
                        </div>
                        <div className="p-3 pt-0" style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                          <div className="doctor-info-detail mb-3 pb-3">
                            <h3 className="mb-1">
                              <Link 
                                to="/patient/doctor-profile"
                                state={{ selectedDoctor: doctor }}
                              >
                                {doctor.name}
                              </Link>
                            </h3>
                            <div className="d-flex align-items-center">
                              <p className="d-flex align-items-center mb-0 fs-14" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                <i className="isax isax-location me-2" />
                                {doctor.location}
                              </p>
                              <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                              <span className="fs-14 fw-medium">30 Min</span>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                              <p className="d-flex align-items-center mb-0 fs-14">
                                <i className="isax isax-shield-tick me-2" />
                                {Array.isArray(doctor.insurance) ? doctor.insurance.join(", ") : doctor.insurance}
                              </p>
                            </div>
                            {(() => {
                              const services = doctor.servicesOffered;
                              if (!Array.isArray(services) || services.length === 0) return null;
                              return (
                                <div className="d-flex align-items-center mt-2">
                                  <p className="d-flex align-items-center mb-0 fs-14">
                                    <i className="isax isax-archive-14 me-2" />
                                    {services.join(", ")}
                                  </p>
                                </div>
                              );
                            })()}
                          </div>
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              onClick={() => handleBookNow(doctor)}
                              disabled={getDoctorAvailability(doctor) === 'unavailable'}
                              className={`btn btn-md d-inline-flex align-items-center rounded-pill text-truncate ${
                                getDoctorAvailability(doctor) === 'available' ? 'btn-dark' : 'btn-secondary'
                              }`}
                            >
                              {getDoctorAvailability(doctor) === 'available' ? t("common.bookNow") : t("common.unavailable")}
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
