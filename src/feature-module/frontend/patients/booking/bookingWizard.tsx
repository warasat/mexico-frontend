/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react'
import ImageWithBasePath from '../../../../components/imageWithBasePath'
import { useNavigate } from "react-router-dom";
import { Calendar, theme } from 'antd';
import type { Dayjs } from 'dayjs';
import InsuranceSelector from './components/InsuranceSelector';
import Header from '../../header';
import '../../../../assets/css/booking-map.css';
import doctorProfileApi from '../../../../core/services/doctorProfileApi';
import { appointmentService, type CreateAppointmentRequest } from '../../../../core/services/appointmentService';
import { useAuth } from '../../../../core/context/AuthContext';
import publicDoctorApi from '../../../../core/services/publicDoctorApi';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  image: string;
  location: string;
  selectedDate?: string;
  selectedTime?: string;
}

interface BookingWizardProps {
  selectedDoctor?: Doctor;
  onBack?: () => void;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ selectedDoctor, onBack }) => {
  const { authState } = useAuth();
  const { user } = authState;
  const navigate = useNavigate();
  
  // Remove step-based navigation - show all sections on single page
  const [isBooking, setIsBooking] = useState(false);
  const [fullDoctorProfile, setFullDoctorProfile] = useState<any>(null);
  
  // Default doctor data if none selected
  const defaultDoctor = {
    id: 1,
    name: "Dr. Michael Brown",
    specialty: "Psychologist",
    rating: 5.0,
    experience: "10+ years",
    image: "assets/img/clients/client-15.jpg",
    location: "5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703"
  };
  
  const doctor = selectedDoctor || defaultDoctor;
  const [selectType, setSelectType] = useState(2); // Default to Video Call
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);

  // Fetch full doctor profile data
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        if (doctor.id) {
          const res = await publicDoctorApi.getById(String(doctor.id));
          setFullDoctorProfile(res?.doctor || null);
        }
      } catch (error) {
        console.error('Failed to fetch doctor profile:', error);
      }
    };

    fetchDoctorProfile();
  }, [doctor.id]);
  const formatDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const [selectedDate, setSelectedDate] = useState<string>(selectedDoctor?.selectedDate || formatDate(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>(selectedDoctor?.selectedTime || '');
  const [bookingId] = useState(() => `BK${Date.now().toString().slice(-6)}`);
  const [weeklyAvailability, setWeeklyAvailability] = useState<Record<string, { morning: string[]; afternoon: string[]; evening: string[] }>>({});
  
  // Basic information form state
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    symptoms: ''
  });
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  // Dynamic map source based on doctor's address
  const mapSrc = useMemo(() => {
    if (fullDoctorProfile?.address) {
      const q = [fullDoctorProfile.address.address, fullDoctorProfile.address.city, fullDoctorProfile.address.state, fullDoctorProfile.address.country]
        .filter(Boolean)
        .join(', ');
      const encoded = encodeURIComponent(q || '');
      return `https://maps.google.com/maps?q=${encoded}&z=13&output=embed`;
    }
    // Fallback to static map if no address data
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.7301009561315!2d-76.13077892422932!3d36.82498697224007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89bae976cfe9f8af%3A0xa61eac05156fbdb9!2sBeachStreet%20USA!5e0!3m2!1sen!2sin!4v1669777904208!5m2!1sen!2sin";
  }, [fullDoctorProfile]);

  const OnPanelChange = (value: Dayjs, mode: string) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    setSelectedDate(value.format('YYYY-MM-DD'));
  };
  const onSelectDate = (value: Dayjs) => {
    setSelectedDate(value.format('YYYY-MM-DD'));
  };

  const validateBasicInfo = () => {
    const { firstName, lastName, phoneNumber, email, symptoms } = basicInfo;
    return firstName.trim() !== '' && 
           lastName.trim() !== '' && 
           phoneNumber.trim() !== '' && 
           email.trim() !== '' && 
           symptoms.trim() !== '';
  };

  const HandleBooking = async () => {
    // Validate basic information before booking
    if (!validateBasicInfo()) {
      alert('Please fill in all required fields before proceeding.');
      return;
    }

    if (!user?.id || !doctor.id || !selectedDate || !selectedTime) {
      alert('Missing required information for booking. Please try again.');
      return;
    }

    setIsBooking(true);
    
    try {
      const appointmentData: CreateAppointmentRequest = {
        doctorId: String(doctor.id),
        patientId: user.id,
        date: selectedDate,
        timeSlot: selectedTime,
        location: doctor.location,
        insurance: selectedInsurance || '',
        service: doctor.specialty || 'General Consultation',
        mode: selectType === 2 ? 'video' : 'clinic',
        patientEmail: basicInfo.email,
        patientPhone: basicInfo.phoneNumber,
        symptoms: basicInfo.symptoms,
        notes: `Appointment booked via online booking system`
      };

      const result = await appointmentService.createAppointment(appointmentData);
      
      if (result.success) {
        // Redirect to appointments page to view the booked appointment
        navigate('/patient/patient-appointments');
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };
  // Fetch doctor availability once when entering step 3 or when doctor changes
  useEffect(() => {
    (async () => {
      try {
        if (!doctor?.id) {
          console.log('No doctor ID available for fetching availability');
          return;
        }
        console.log('Fetching availability for doctor ID:', doctor.id);
        const res = await doctorProfileApi.getWeeklyAvailability(String(doctor.id));
        console.log('Availability response:', res);
        setWeeklyAvailability((res as any)?.weeklyAvailability || {});
      } catch (error) {
        console.error('Error fetching doctor availability:', error);
        // Set empty availability on error
        setWeeklyAvailability({});
      }
    })();
  }, [doctor?.id]);

  const dayKey = useMemo(() => {
    if (!selectedDate) return '';
    const parts = selectedDate.split('-');
    if (parts.length !== 3) return '';
    const y = Number(parts[0]);
    const m = Number(parts[1]) - 1;
    const d = Number(parts[2]);
    const idx = new Date(y, m, d).getDay(); // local day, 0=Sun..6=Sat
    const day = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][idx];
    console.log('Selected date:', selectedDate, 'Day key:', day, 'Day index:', idx);
    return day;
  }, [selectedDate]);

  return (
    <div className="main-wrapper">
      <Header />
      <div className="doctor-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="booking-wizard">
                <div className="card booking-card mb-4">
                  <div className="card-header">
                    <h4 className="mb-0">Book Appointment</h4>
                  </div>
                </div>
              {/* Single Page Booking Form */}
              {/* Section 1: Specialty Selection */}
              <div className="card booking-card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">1. Specialty Selection</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center flex-wrap rpw-gap-2 row-gap-2">
                    <span className="avatar avatar-xxxl avatar-rounded me-2 flex-shrink-0">
                      <ImageWithBasePath
                        src={doctor.image}
                        alt={doctor.name}
                      />
                    </span>
                    <div>
                      <h4 className="mb-1">
                        {doctor.name}{" "}
                        <span className="badge bg-orange fs-12">
                          <i className="fa-solid fa-star me-1" />
                          {doctor.rating}
                        </span>
                      </h4>
                      <p className="text-indigo mb-3 fw-medium">
                        {doctor.specialty}
                      </p>
                      <p className="mb-0">
                        <i className="isax isax-location me-2" />
                        {doctor.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 2: Appointment Type */}
              <div className="card booking-card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">2. Appointment Type</h5>
                </div>
                <div className="card-body">
                  <h6 className="mb-3">Select Appointment Type</h6>
                  <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-6">
                      <div className="radio-select text-center">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="service2"
                          type="radio"
                          id="service8"
                          checked={selectType === 2}
                          onChange={()=>setSelectType(2)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="service8"
                        >
                          <i className="isax isax-video5" />
                          <span className="service-title d-block">
                            Video Call
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-6">
                      <div className="radio-select text-center">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="service2"
                          type="radio"
                          id="service11"
                          checked={selectType === 5}
                          onChange={()=>setSelectType(5)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="service11"
                        >
                          <i className="isax isax-messages-15" />
                          <span className="service-title d-block">
                            Clinic Visit
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 3: Date & Time */}
              <div className="card booking-card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">3. Date & Time</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="card">
                        <div className="card-body p-2 pt-3">
                          <div style={wrapperStyle}>
                            <Calendar fullscreen={false} onPanelChange={OnPanelChange} onSelect={onSelectDate} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="card booking-wizard-slots">
                        <div className="card-body">
                          <div className="book-title">
                            <h6 className="fs-14 mb-2">Morning</h6>
                          </div>
                          <div className="token-slot mt-2 mb-2">
                            {(() => {
                              const morningSlots = (weeklyAvailability as any)?.[dayKey]?.morning;
                              console.log('Morning slots for', dayKey, ':', morningSlots);
                              return morningSlots?.length ? (
                                morningSlots.map((slot: string) => (
                                  <div key={`m-${slot}`} className="form-check-inline visits me-1">
                                    <label className="visit-btns">
                                      <input
                                        type="radio"
                                        className="form-check-input"
                                        name="appointment-time"
                                        value={slot}
                                        checked={selectedTime === slot}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                      />
                                      <span className="visit-rsn">{slot}</span>
                                    </label>
                                  </div>
                                ))
                              ) : (
                                <p className="text-muted mb-0">No morning slots available</p>
                              );
                            })()}
                          </div>
                          <div className="book-title">
                            <h6 className="fs-14 mb-2">Afternoon</h6>
                          </div>
                          <div className="token-slot mt-2 mb-2">
                            {(() => {
                              const afternoonSlots = (weeklyAvailability as any)?.[dayKey]?.afternoon;
                              console.log('Afternoon slots for', dayKey, ':', afternoonSlots);
                              return afternoonSlots?.length ? (
                                afternoonSlots.map((slot: string) => (
                                  <div key={`a-${slot}`} className="form-check-inline visits me-1">
                                    <label className="visit-btns">
                                      <input
                                        type="radio"
                                        className="form-check-input"
                                        name="appointment-time"
                                        value={slot}
                                        checked={selectedTime === slot}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                      />
                                      <span className="visit-rsn">{slot}</span>
                                    </label>
                                  </div>
                                ))
                              ) : (
                                <p className="text-muted mb-0">No afternoon slots available</p>
                              );
                            })()}
                          </div>
                          <div className="book-title">
                            <h6 className="fs-14 mb-2">Evening</h6>
                          </div>
                          <div className="token-slot mt-2 mb-2">
                            {(() => {
                              const eveningSlots = (weeklyAvailability as any)?.[dayKey]?.evening;
                              console.log('Evening slots for', dayKey, ':', eveningSlots);
                              return eveningSlots?.length ? (
                                eveningSlots.map((slot: string) => (
                                  <div key={`e-${slot}`} className="form-check-inline visits me-1">
                                    <label className="visit-btns">
                                      <input
                                        type="radio"
                                        className="form-check-input"
                                        name="appointment-time"
                                        value={slot}
                                        checked={selectedTime === slot}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                      />
                                      <span className="visit-rsn">{slot}</span>
                                    </label>
                                  </div>
                                ))
                              ) : (
                                <p className="text-muted mb-0">No evening slots available</p>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 4: Basic Information */}
              <div className="card booking-card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">4. Basic Information</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">First Name *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={basicInfo.firstName}
                          onChange={(e) => setBasicInfo({...basicInfo, firstName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Last Name *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={basicInfo.lastName}
                          onChange={(e) => setBasicInfo({...basicInfo, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Phone Number *</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          value={basicInfo.phoneNumber}
                          onChange={(e) => setBasicInfo({...basicInfo, phoneNumber: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email Address *</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          value={basicInfo.email}
                          onChange={(e) => setBasicInfo({...basicInfo, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Symptoms *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={basicInfo.symptoms}
                          onChange={(e) => setBasicInfo({...basicInfo, symptoms: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 5: Insurance */}
              <div className="card booking-card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">5. Insurance</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8 d-flex">
                      <div className="card flex-fill mb-3 mb-lg-0">
                        <div className="card-body">
                          <InsuranceSelector
                            selectedInsurance={selectedInsurance}
                            onInsuranceChange={setSelectedInsurance}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 d-flex">
                      <div className="card flex-fill mb-0">
                        <div className="card-body">
                          <h6 className="mb-3">Booking Summary</h6>
                          <div className="mb-3">
                            <label className="form-label">
                              Date &amp; Time
                            </label>
                            <div className="form-plain-text">
                              {selectedDate && selectedTime ? `${selectedTime}, ${selectedDate}` : 'Select date and time'}{" "}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Appointment Type
                            </label>
                            <div className="form-plain-text">
                              {selectType === 2 ? 'Video Call' : 'Clinic Visit'}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Insurance
                            </label>
                            <div className="form-plain-text">
                              {selectedInsurance || 'Not Selected'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 6: Confirmation & Booking */}
              <div className="card booking-card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">6. Confirmation</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="d-flex align-items-center flex-wrap rpw-gap-2">
                            <i className="isax isax-tick-circle5 text-success me-2" />
                            Review Your Appointment
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Doctor</label>
                                <div className="form-plain-text">
                                  {doctor.name}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Specialty
                                </label>
                                <div className="form-plain-text">
                                  {doctor.specialty}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Date &amp; Time
                                </label>
                                <div className="form-plain-text">
                                  {selectedDate && selectedTime ? `${selectedTime}, ${selectedDate}` : 'Select date and time'}{" "}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Appointment Type
                                </label>
                                <div className="form-plain-text">
                                  {selectType === 2 ? 'Video Call' : 'Clinic Visit'}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Insurance
                                </label>
                                <div className="form-plain-text">
                                  {selectedInsurance || 'No Insurance'}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Location
                                </label>
                                <div className="form-plain-text">
                                  {fullDoctorProfile?.address ? 
                                    [fullDoctorProfile.address.address, fullDoctorProfile.address.city, fullDoctorProfile.address.state, fullDoctorProfile.address.pincode]
                                      .filter(Boolean)
                                      .join(', ') || 'Address not available'
                                    : '5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703'
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card">
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div className="text-center">
                            <h6 className="fs-14 mb-2">Booking ID</h6>
                            <span className="booking-id-badge mb-3">
                              {bookingId}
                            </span>
                          </div>
                          <div>
                            <button
                              onClick={HandleBooking}
                              className="btn w-100 btn-md btn-success inline-flex align-items-center rounded-pill mb-2"
                              style={{ pointerEvents: isBooking ? 'none' : 'auto', opacity: isBooking ? 0.7 : 1 }}
                            >
                              {isBooking ? 'Booking...' : 'Confirm Appointment'}
                            </button>
                            {onBack && (
                              <button
                                onClick={onBack}
                                className="btn w-100 btn-md btn-dark inline-flex align-items-center rounded-pill"
                              >
                                <i className="isax isax-arrow-left-2 me-1" />
                                Back to Doctors
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>

            </div>
            <div className="col-lg-4">
              <div className="booking-map-container">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Location</h5>
                    <div className="contact-map">
                      <iframe
                        src={mapSrc}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ width: '100%', height: '400px', border: 'none', borderRadius: '10px' }}
                        title="Doctor Location Map"
                      />
                    </div>
                    <div className="mt-3">
                      <h6>Clinic Address</h6>
                      <p className="mb-2">
                        {fullDoctorProfile?.address ? 
                          [fullDoctorProfile.address.address, fullDoctorProfile.address.city, fullDoctorProfile.address.state, fullDoctorProfile.address.pincode]
                            .filter(Boolean)
                            .join(', ') || 'Address not available'
                          : '5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703'
                        }
                      </p>
                      <div className="d-flex align-items-center mb-2">
                        <i className="isax isax-call5 me-2" />
                        <span>
                          {fullDoctorProfile?.phones && fullDoctorProfile.phones.length > 0 
                            ? fullDoctorProfile.phones[0] 
                            : '+1 315 369 5943'
                          }
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="isax isax-sms5 me-2" />
                        <span>
                          {fullDoctorProfile?.email || 'doccure@example.com'}
                        </span>
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

  )
}

export default BookingWizard