import { Link, useSearchParams } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useEffect, useState } from "react";
import publicDoctorApi from "../../../../core/services/publicDoctorApi";
import { useAuth } from "../../../../core/context/AuthContext";
import SocketService from "../../../../core/services/socketService";


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
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;
  
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

  // Listen for doctor availability updates
  useEffect(() => {
    const socketService = SocketService.getInstance();
    
    const unsubscribe = socketService.subscribe('doctorAvailabilityUpdate', (data: { doctorId: string; availability: 'available' | 'unavailable' }) => {
      setAllDoctors(prevDoctors => 
        prevDoctors.map(doctor => 
          doctor.id === data.doctorId 
            ? { ...doctor, available: data.availability === 'available' }
            : doctor
        )
      );
    });

    return unsubscribe;
  }, []);

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
    const cityParam = searchParams.get("city");
    setSpecialty(specialtyParam || "");
    
    let filtered = allDoctors;
    
    // Filter by specialty if provided
    if (specialtyParam) {
      filtered = filtered.filter(doctor => {
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
    }
    
    // Filter by city if provided
    if (cityParam) {
      filtered = filtered.filter(doctor => {
        const doctorLocation = doctor.location.toLowerCase();
        const paramCity = cityParam.toLowerCase();
        // Check if the doctor's location contains the selected city
        return doctorLocation.includes(paramCity);
      });
    }

    const sorted = filtered
      .map(d => ({...d, specialtyRank: d.specialtyRank ?? 0}))
      .sort((a, b) => (b.specialtyRank ?? 0) - (a.specialtyRank ?? 0));
    setFilteredDoctors(sorted);
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
        <div className="card doctor-list-card" style={{height: 'auto', minHeight: '300px', marginBottom: '15px'}}>
          <div className="d-md-flex align-items-stretch" style={{height: '100%', minHeight: '300px'}}>
            <div className="card-img card-img-hover" style={{minWidth: '200px', maxWidth: '200px', height: '200px', overflow: 'hidden'}}>
              <Link to="/patient/doctor-profile" state={{ selectedDoctor: doctor }}>
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
              <div className="d-flex align-items-center justify-content-between border-bottom p-2" style={{minHeight: '50px'}}>
                    <Link to="#" className={`${doctor.specialtyClass} fw-medium fs-14`}>
                      {doctor.specialty}
                </Link>
                    <span className={`badge ${doctor.available ? 'bg-success-light' : 'bg-danger-light'} d-inline-flex align-items-center`} style={{minWidth: '80px', textAlign: 'center'}}>
                  <i className="fa-solid fa-circle fs-5 me-1" />
                      {doctor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="p-2" style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div className="doctor-info-detail pb-1">
                  <div className="row align-items-center gy-1">
                    <div className="col-sm-6">
                      <div>
                        <h6 className="d-flex align-items-center mb-0">
                              <Link to="/patient/doctor-profile" state={{ selectedDoctor: doctor }}>{doctor.name}</Link>
                          <i className="isax isax-tick-circle5 text-success ms-2" />
                        </h6>
                            <p className="mb-1">{doctor.specialty}</p>
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
                        <p className="d-flex align-items-center mb-0 fs-14 mb-1">
                          <i className="isax isax-language-circle text-dark me-2" />
                          {(() => {
                            // languages from backend are not mapped into card, so render from a hidden map on filteredDoctors
                            // We attach languages onto the doctor object when mapping API response; fallback to empty
                            const lang = (doctor as any).languages;
                            return Array.isArray(lang) && lang.length ? lang.join(', ') : '';
                          })()}
                        </p>
                        {(() => {
                          const services = doctor.servicesOffered;
                          if (!Array.isArray(services) || services.length === 0) return null;
                          return (
                            <p className="d-flex align-items-center mb-0 fs-14 mb-1">
                              <i className="isax isax-archive-14 text-dark me-2" />
                              {services.join(", ")}
                            </p>
                          );
                        })()}
                        <p className="d-flex align-items-center mb-0 fs-14 mb-1">
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
                
                {/* Next Available Time Display with Inline Booking Button */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-1 mt-1">
                  <div>
                    <h6 className="mb-0 text-dark">Next Available</h6>
                    <p className="mb-0 text-muted">
                      Next available at <br />
                      10:00 AM - 15 Oct, Tue
                    </p>
                  </div>
                  <Link
                    to={isAuthenticated && userType === 'patient' ? "/booking" : "/patient/login"}
                    state={isAuthenticated && userType === 'patient' ? { 
                      selectedDoctor: doctor
                    } : undefined}
                    className="btn btn-md d-inline-flex align-items-center rounded-pill btn-primary-gradient"
                  >
                    <i className="isax isax-calendar-1 me-2" />
                    Book Appointment
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
