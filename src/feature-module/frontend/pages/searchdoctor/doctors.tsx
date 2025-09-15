import { Link, useSearchParams } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useEffect, useState } from "react";
import publicDoctorApi from "../../../../core/services/publicDoctorApi";
import { getDiseasesForSpecialty } from "../../common/data/specialties";
import { useAuth } from "../../../../core/context/AuthContext";

// Utility function to generate one week of dates starting from today
const generateWeekDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    dates.push({
      date: date.getDate(),
      day: dayNames[date.getDay()],
      month: monthNames[date.getMonth()],
      fullDate: date.toISOString().split('T')[0],
      isToday: i === 0
    });
  }
  
  return dates;
};

type DoctorCard = {
  id: string;
  name: string;
  specialty: string;
  specialtyClass: string;
  image: string;
  rating: string;
  location: string;
  duration: string;
  available: boolean;
  insurance: string[];
  specialtyRank?: number;
  languages?: string[];
  experience?: string;
  servicesOffered?: string[];
};

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorCard[]>([]);
  const [specialty, setSpecialty] = useState<string>("");
  const [selectedDates, setSelectedDates] = useState<{[doctorId: number]: string}>({});
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;
  
<<<<<<< HEAD
  // Helper to colorize specialties (kept for UI styling)
  const specialtyColor = (spec: string): string => {
    const key = spec.toLowerCase();
    if (key.includes('psych')) return 'text-indigo';
    if (key.includes('pediatric')) return 'text-pink';
    if (key.includes('neuro')) return 'text-teal';
    if (key.includes('cardio')) return 'text-info';
    if (key.includes('denti')) return 'text-purple';
    if (key.includes('chiro')) return 'text-yellow';
    if (key.includes('opto')) return 'text-cyan';
    if (key.includes('ophthal')) return 'text-indigo';
    if (key.includes('podi')) return 'text-brown';
    if (key.includes('derma')) return 'text-pink';
    if (key.includes('ortho')) return 'text-dark';
    return 'text-primary';
  };

  const [allDoctors, setAllDoctors] = useState<DoctorCard[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await publicDoctorApi.list({ sort: 'rank', limit: 100 });
        const cards: DoctorCard[] = res.results.map((d) => ({
          id: d.id,
          name: d.displayName,
          specialty: d.designation || 'Doctor',
          specialtyClass: specialtyColor(d.designation || ''),
          image: d.image || 'assets/img/doctor-grid/doc1.png',
          rating: '4.8',
          location: d.location || '',
          duration: '30 Min',
          available: d.availability === 'available',
          insurance: Array.isArray(d.insurances) ? d.insurances : [],
          specialtyRank: d.specialtyRank ?? 0,
          languages: (d as any).knownLanguages || (d as any).languages || [],
          experience: (d as any).experience || '',
          servicesOffered: (d as any).servicesOffered || [],
        }));
        setAllDoctors(cards);
      } catch {
        setAllDoctors([]);
      }
    })();
  }, []);
=======
  // Get doctor profile service instance
  const doctorProfileService = DoctorProfileService.getInstance();

  // Function to handle date selection for a specific doctor
  const handleDateSelect = (dateInfo: any, doctorId: number) => {
    // Clear all previous selections and set only the current doctor's date
    setSelectedDates({
      [doctorId]: dateInfo.fullDate
    });
  };

  // Function to get insurance data for a doctor
  const getDoctorInsurances = (doctorId: number): string[] => {
    const profile = doctorProfileService.getDoctorProfile(doctorId.toString());
    return profile?.selectedInsurances || [];
  };
  // Function to get specialty rank for a doctor
  const getDoctorSpecialtyRank = (doctorId: number): number => {
    return doctorProfileService.getDoctorSpecialtyRank(doctorId.toString());
  };

  // Doctor data matching the sectionDoctor.tsx structure
  const allDoctors = [
    {
      id: 1,
      name: "Dr. Michael Brown",
      specialty: "Psychologist",
      specialtyClass: "text-indigo",
      image: "assets/img/doctor-grid/doc1.png",
      rating: "5.0",
      location: "Puerto Vallarta",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(1),
      specialtyRank: getDoctorSpecialtyRank(1)
    },
    {
      id: 2,
      name: "Dr. Nicholas Tello",
      specialty: "Pediatrician",
      specialtyClass: "text-pink",
      image: "assets/img/doctor-grid/doc2.png",
      rating: "4.6",
      location: "Mexico City",
      duration: "60 Min",
      available: true,
      insurance: getDoctorInsurances(2),
      specialtyRank: getDoctorSpecialtyRank(2)
    },
    {
      id: 3,
      name: "Dr. Harold Bryant",
      specialty: "Neurologist",
      specialtyClass: "text-teal",
      image: "assets/img/doctor-grid/doc3.png",
      rating: "4.8",
      location: "Playa del Carmen",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(3),
      specialtyRank: getDoctorSpecialtyRank(3)
    },
    {
      id: 4,
      name: "Dr. Sandra Jones",
      specialty: "Cardiologist",
      specialtyClass: "text-info",
      image: "assets/img/doctor-grid/doc4.png",
      rating: "4.8",
      location: "Lake Chapala",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(4),
      specialtyRank: getDoctorSpecialtyRank(4)
    },
    {
      id: 5,
      name: "Dr. Charles Scott",
      specialty: "Neurologist",
      specialtyClass: "text-teal",
      image: "assets/img/doctor-grid/doc5.png",
      rating: "4.2",
      location: "San Miguel de Allende",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(5),
      specialtyRank: getDoctorSpecialtyRank(5)
    },
    {
      id: 6,
      name: "Dr. Maria Rodriguez",
      specialty: "Dentist",
      specialtyClass: "text-purple",
      image: "assets/img/doctor-grid/doc6.png",
      rating: "4.7",
      location: "Guadalajara",
      duration: "45 Min",
      available: true,
      insurance: getDoctorInsurances(6),
      specialtyRank: getDoctorSpecialtyRank(6)
    },
    {
      id: 7,
      name: "Dr. Ana Martinez",
      specialty: "OB-GYN (Obstetrician-Gynecologist)",
      specialtyClass: "text-green",
      image: "assets/img/doctor-grid/doc7.png",
      rating: "4.9",
      location: "Puerto Vallarta",
      duration: "60 Min",
      available: true,
      insurance: getDoctorInsurances(7),
      specialtyRank: getDoctorSpecialtyRank(7)
    },
    {
      id: 8,
      name: "Dr. Carlos Lopez",
      specialty: "Psychiatrist",
      specialtyClass: "text-orange",
      image: "assets/img/doctor-grid/doc8.png",
      rating: "4.5",
      location: "Mexico City",
      duration: "45 Min",
      available: true,
      insurance: getDoctorInsurances(8),
      specialtyRank: getDoctorSpecialtyRank(8)
    },
    {
      id: 9,
      name: "Dr. Elena Garcia",
      specialty: "Psychologist",
      specialtyClass: "text-blue",
      image: "assets/img/doctor-grid/doc1.png",
      rating: "4.6",
      location: "Playa del Carmen",
      duration: "50 Min",
      available: true,
      insurance: getDoctorInsurances(9),
      specialtyRank: getDoctorSpecialtyRank(9)
    },
    {
      id: 10,
      name: "Dr. Roberto Silva",
      specialty: "Urgent Care Specialist",
      specialtyClass: "text-red",
      image: "assets/img/doctor-grid/doc2.png",
      rating: "4.4",
      location: "Lake Chapala",
      duration: "20 Min",
      available: true,
      insurance: getDoctorInsurances(10),
      specialtyRank: getDoctorSpecialtyRank(10)
    },
    {
      id: 11,
      name: "Dr. Carmen Vega",
      specialty: "Chiropractor",
      specialtyClass: "text-yellow",
      image: "assets/img/doctor-grid/doc3.png",
      rating: "4.8",
      location: "San Miguel de Allende",
      duration: "40 Min",
      available: true,
      insurance: getDoctorInsurances(11),
      specialtyRank: getDoctorSpecialtyRank(11)
    },
    {
      id: 12,
      name: "Dr. Fernando Ruiz",
      specialty: "Optometrist",
      specialtyClass: "text-cyan",
      image: "assets/img/doctor-grid/doc4.png",
      rating: "4.7",
      location: "Guadalajara",
      duration: "35 Min",
      available: true,
      insurance: getDoctorInsurances(12),
      specialtyRank: getDoctorSpecialtyRank(12)
    },
    {
      id: 13,
      name: "Dr. Patricia Morales",
      specialty: "Ophthalmologist",
      specialtyClass: "text-indigo",
      image: "assets/img/doctor-grid/doc5.png",
      rating: "4.9",
      location: "Puerto Vallarta",
      duration: "45 Min",
      available: true,
      insurance: getDoctorInsurances(13),
      specialtyRank: getDoctorSpecialtyRank(13)
    },
    {
      id: 14,
      name: "Dr. Alejandro Torres",
      specialty: "Podiatrist",
      specialtyClass: "text-brown",
      image: "assets/img/doctor-grid/doc6.png",
      rating: "4.5",
      location: "Mexico City",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(14),
      specialtyRank: getDoctorSpecialtyRank(14)
    },
    {
      id: 15,
      name: "Dr. Sofia Herrera",
      specialty: "Dermatologist",
      specialtyClass: "text-pink",
      image: "assets/img/doctor-grid/doc7.png",
      rating: "4.8",
      location: "Playa del Carmen",
      duration: "40 Min",
      available: true,
      insurance: getDoctorInsurances(15),
      specialtyRank: getDoctorSpecialtyRank(15)
    },
    {
      id: 16,
      name: "Dr. Miguel Castro",
      specialty: "Orthopedic Surgeon (Orthopedist)",
      specialtyClass: "text-dark",
      image: "assets/img/doctor-grid/doc8.png",
      rating: "4.9",
      location: "Lake Chapala",
      duration: "60 Min",
      available: true,
      insurance: getDoctorInsurances(16),
      specialtyRank: getDoctorSpecialtyRank(16)
    },
    {
      id: 17,
      name: "Dr. Laura Jimenez",
      specialty: "Primary Care Physician (PCP)",
      specialtyClass: "text-primary",
      image: "assets/img/doctor-grid/doc1.png",
      rating: "4.6",
      location: "San Miguel de Allende",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(17),
      specialtyRank: getDoctorSpecialtyRank(17)
    }
  ];
>>>>>>> 138eeec3caa5d95f3760a61b478ae31889740ed4

  // Specialty mapping from URL parameters to display names
  const specialtyMapping: { [key: string]: string } = {
    "primary-care": "Primary Care Physicians",
    "dentists": "Dentists",
    "obgyn": "OBGYNs",
    "psychologists": "Psychologists",
    "psychiatrists": "Psychiatrists",
    "therapists": "Therapist-Counselors",
    "urgent-care": "Urgent Care",
    "chiropractors": "Chiropractors",
    "optometrists": "Optometrists",
    "ophthalmologists": "Ophthalmologists",
    "podiatrists": "Podiatrists",
    "pediatricians": "Pediatricians",
    "dermatologists": "Dermatologists",
    "orthopedic-surgeons": "Orthopedic Surgeons"
  };

  useEffect(() => {
    const specialtyParam = searchParams.get("specialty");
    setSpecialty(specialtyParam || "");
    
    const diseaseParam = searchParams.get("disease")?.toLowerCase() || "";
    if (specialtyParam) {
      // Filter doctors based on specialty
      const filtered = allDoctors.filter(doctor => {
        const doctorSpecialty = doctor.specialty.toLowerCase();
        const paramSpecialty = specialtyParam.toLowerCase();
        
        // Map URL parameters to actual specialties
        switch (paramSpecialty) {
          case "psychologists":
            return doctorSpecialty === "psychologist";
          case "pediatricians":
            return doctorSpecialty === "pediatrician";
          case "dermatologists":
            return doctorSpecialty === "dermatologist";
          case "orthopedic-surgeons":
            return doctorSpecialty === "orthopedic surgeon (orthopedist)";
          case "cardiologists":
            return doctorSpecialty === "cardiologist";
          case "neurologists":
            return doctorSpecialty === "neurologist";
          case "dentists":
            return doctorSpecialty === "dentist";
          case "obgyn":
            return doctorSpecialty === "ob-gyn (obstetrician-gynecologist)";
          case "psychiatrists":
            return doctorSpecialty === "psychiatrist";
          case "therapists":
            return doctorSpecialty === "psychologist";
          case "urgent-care":
            return doctorSpecialty === "urgent care specialist";
          case "chiropractors":
            return doctorSpecialty === "chiropractor";
          case "optometrists":
            return doctorSpecialty === "optometrist";
          case "ophthalmologists":
            return doctorSpecialty === "ophthalmologist";
          case "podiatrists":
            return doctorSpecialty === "podiatrist";
          case "primary-care":
            return doctorSpecialty === "primary care physician (pcp)";
          default:
            return doctorSpecialty.includes(paramSpecialty) || paramSpecialty.includes(doctorSpecialty);
        }
      });
      
      const diseaseFiltered = diseaseParam
        ? filtered.filter(d => getDiseasesForSpecialty(d.specialty).some(x => x.toLowerCase() === diseaseParam))
        : filtered;

      const sorted = diseaseFiltered
        .map(d => ({...d, specialtyRank: d.specialtyRank ?? 0}))
        .sort((a, b) => (b.specialtyRank ?? 0) - (a.specialtyRank ?? 0));
      setFilteredDoctors(sorted);
    } else {
      const sortedAll = allDoctors
        .map(d => ({...d, specialtyRank: d.specialtyRank ?? 0}))
        .sort((a, b) => (b.specialtyRank ?? 0) - (a.specialtyRank ?? 0));
      setFilteredDoctors(sortedAll);
    }
  }, [searchParams, allDoctors]);

  return (
    <>
    <div className="row align-items-center">
      <div className="col-md-12">
        <div className="mb-4">
          <h3>
            {specialty ? (
              <>
                Showing <span className="text-secondary">{filteredDoctors.length}</span> {specialtyMapping[specialty] || specialty} For You
              </>
            ) : (
              <>
                Showing <span className="text-secondary">{filteredDoctors.length}</span> Doctors For You
              </>
            )}
          </h3>
        </div>
      </div>
    </div>
    <div className="row">
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="col-lg-12">
        <div className="card doctor-list-card" style={{height: 'auto', minHeight: '400px', marginBottom: '20px'}}>
          <div className="d-md-flex align-items-stretch" style={{height: '100%', minHeight: '400px'}}>
            <div className="card-img card-img-hover" style={{minWidth: '200px', maxWidth: '200px', height: '200px', overflow: 'hidden'}}>
              <Link to="/patient/doctor-profile">
                    <ImageWithBasePath src={doctor.image} alt="" />
              </Link>
              <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                <span className="badge bg-orange">
                  <i className="fa-solid fa-star me-1" />
                      {doctor.rating}
                </span>
                <Link to="javascript:void(0)" className="fav-icon">
                  <i className="fa fa-heart" />
                </Link>
              </div>
            </div>
            <div className="card-body p-0" style={{flex: '1', display: 'flex', flexDirection: 'column'}}>
              <div className="d-flex align-items-center justify-content-between border-bottom p-3" style={{minHeight: '60px'}}>
                    <Link to="#" className={`${doctor.specialtyClass} fw-medium fs-14`}>
                      {doctor.specialty}
                </Link>
                    <span className={`badge ${doctor.available ? 'bg-success-light' : 'bg-danger-light'} d-inline-flex align-items-center`} style={{minWidth: '80px', textAlign: 'center'}}>
                  <i className="fa-solid fa-circle fs-5 me-1" />
                      {doctor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="p-3" style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div className="doctor-info-detail pb-3">
                  <div className="row align-items-center gy-3">
                    <div className="col-sm-6">
                      <div>
                        <h6 className="d-flex align-items-center mb-1">
                              <Link to="/patient/doctor-profile">{doctor.name}</Link>
                          <i className="isax isax-tick-circle5 text-success ms-2" />
                        </h6>
                            <p className="mb-2">{doctor.specialty}</p>
                        <p className="d-flex align-items-center mb-0 fs-14">
                          <i className="isax isax-location me-2" />
                              {doctor.location}
                          <Link
                            to="#"
                            className="text-primary text-decoration-underline ms-2"
                          >
                            Get Direction
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <p className="d-flex align-items-center mb-0 fs-14 mb-2">
                          <i className="isax isax-language-circle text-dark me-2" />
                          {(() => {
                            // languages from backend are not mapped into card, so render from a hidden map on filteredDoctors
                            // We attach languages onto the doctor object when mapping API response; fallback to empty
                            const lang = (doctor as any).languages;
                            return Array.isArray(lang) && lang.length ? lang.join(', ') : '';
                          })()}
                        </p>
                        {(() => {
                          const services = (doctor as any).servicesOffered;
                          if (!Array.isArray(services) || services.length === 0) return null;
                          return (
                            <p className="d-flex align-items-center mb-0 fs-14 mb-2">
                              <i className="isax isax-archive-14 text-dark me-2" />
                              {services.join(", ")}
                            </p>
                          );
                        })()}
                        {(() => {
                          const diseases = getDiseasesForSpecialty(doctor.specialty);
                          if (diseases.length === 0) return null;
                          return (
                            <p className="d-flex align-items-center mb-0 fs-14 mb-2">
                              <i className="isax isax-archive-14 text-dark me-2" />
                              {diseases.join(", ")}
                            </p>
                          );
                        })()}
                        <p className="d-flex align-items-center mb-0 fs-14 mb-2">
                          <i className="isax isax-shield-tick text-dark me-2" />
                          {Array.isArray(doctor.insurance) ? doctor.insurance.join(", ") : doctor.insurance}
                        </p>
                        <p className="d-flex align-items-center mb-0 fs-14">
                          <i className="isax isax-archive-14 text-dark me-2" />
                          {(() => {
                            const exp = (doctor as any).experience;
                            return exp ? `${exp}`.replace(/years?/i, 'Years of Experience') : '';
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* One Week Date Display */}
                <div className="mb-3">
                  <h6 className="mb-2 text-dark">Available Dates</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {generateWeekDates().map((dateInfo, index) => (
                      <div
                        key={index}
                        onClick={() => handleDateSelect(dateInfo, doctor.id)}
                        className={`d-flex flex-column align-items-center justify-content-center p-2 rounded border cursor-pointer ${
                          selectedDates[doctor.id] === dateInfo.fullDate
                            ? 'bg-success text-white border-success'
                            : Object.keys(selectedDates).length > 0
                            ? 'bg-light border-secondary hover-bg-light'
                            : dateInfo.isToday 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-light border-secondary hover-bg-light'
                        }`}
                        style={{ 
                          minWidth: '60px', 
                          minHeight: '60px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span className="fw-bold fs-14">{dateInfo.date}</span>
                        <span className="fs-12">{dateInfo.day}</span>
                        <span className="fs-10">{dateInfo.month}</span>
                      </div>
                    ))}
                  </div>
                  {selectedDates[doctor.id] && (
                    <p className="text-success fs-14 mt-2 mb-0">
                      <i className="isax isax-tick-circle me-1" />
                      Selected: {new Date(selectedDates[doctor.id]).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </div>
                
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mt-3">
                  <div className="d-flex align-items-center flex-wrap row-gap-3">
                    <p className="mb-0">
                      Next available at <br />
                      10:00 AM - 15 Oct, Tue
                    </p>
                  </div>
                  <Link
                    to={isAuthenticated && userType === 'patient' ? "/booking" : "/patient/login"}
                    state={isAuthenticated && userType === 'patient' ? { 
                      selectedDoctor: doctor,
                      selectedDate: selectedDates[doctor.id] 
                    } : undefined}
                    className={`btn btn-md d-inline-flex align-items-center rounded-pill ${
                      selectedDates[doctor.id] 
                        ? 'btn-primary-gradient' 
                        : 'btn-secondary'
                    }`}
                    onClick={(e) => {
                      if (!selectedDates[doctor.id]) {
                        e.preventDefault();
                        alert('Please select a date first');
                      }
                    }}
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    {selectedDates[doctor.id] ? 'Book Appointment' : 'Select Date First'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        ))
      ) : (
      <div className="col-lg-12">
          <div className="card">
            <div className="card-body text-center py-5">
              <h4 className="text-muted">No doctors found for this specialty</h4>
              <p className="text-muted">Try searching for a different specialty or check back later.</p>
                      </div>
                    </div>
                  </div>
                           )}
    </div>
  </>
  
  );
};

export default Doctors;
