import { Link, useSearchParams } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useEffect, useState } from "react";
import DoctorProfileService from "../../common/services/doctorProfileService";

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [specialty, setSpecialty] = useState<string>("");
  
  // Get doctor profile service instance
  const doctorProfileService = DoctorProfileService.getInstance();

  // Function to get insurance data for a doctor
  const getDoctorInsurances = (doctorId: number): string[] => {
    const profile = doctorProfileService.getDoctorProfile(doctorId.toString());
    return profile?.selectedInsurances || [];
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
      location: "Guadalajara, Mexico",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(1)
    },
    {
      id: 2,
      name: "Dr. Nicholas Tello",
      specialty: "Pediatrician",
      specialtyClass: "text-pink",
      image: "assets/img/doctor-grid/doc2.png",
      rating: "4.6",
      location: "Monterrey, Mexico",
      duration: "60 Min",
      available: true,
      insurance: getDoctorInsurances(2)
    },
    {
      id: 3,
      name: "Dr. Harold Bryant",
      specialty: "Neurologist",
      specialtyClass: "text-teal",
      image: "assets/img/doctor-grid/doc3.png",
      rating: "4.8",
      location: "Puebla, Mexico",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(3)
    },
    {
      id: 4,
      name: "Dr. Sandra Jones",
      specialty: "Cardiologist",
      specialtyClass: "text-info",
      image: "assets/img/doctor-grid/doc4.png",
      rating: "4.8",
      location: "Tijuana, Mexico",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(4)
    },
    {
      id: 5,
      name: "Dr. Charles Scott",
      specialty: "Neurologist",
      specialtyClass: "text-teal",
      image: "assets/img/doctor-grid/doc5.png",
      rating: "4.2",
      location: "León, Mexico",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(5)
    },
    {
      id: 6,
      name: "Dr. Maria Rodriguez",
      specialty: "Dentist",
      specialtyClass: "text-purple",
      image: "assets/img/doctor-grid/doc6.png",
      rating: "4.7",
      location: "Mexico City, Mexico",
      duration: "45 Min",
      available: true,
      insurance: getDoctorInsurances(6)
    },
    {
      id: 7,
      name: "Dr. Ana Martinez",
      specialty: "OBGYN",
      specialtyClass: "text-green",
      image: "assets/img/doctor-grid/doc7.png",
      rating: "4.9",
      location: "Cancún, Mexico",
      duration: "60 Min",
      available: true,
      insurance: getDoctorInsurances(7)
    },
    {
      id: 8,
      name: "Dr. Carlos Lopez",
      specialty: "Psychiatrist",
      specialtyClass: "text-orange",
      image: "assets/img/doctor-grid/doc8.png",
      rating: "4.5",
      location: "Querétaro, Mexico",
      duration: "45 Min",
      available: true,
      insurance: getDoctorInsurances(8)
    },
    {
      id: 9,
      name: "Dr. Elena Garcia",
      specialty: "Therapist",
      specialtyClass: "text-blue",
      image: "assets/img/doctor-grid/doc1.png",
      rating: "4.6",
      location: "Mérida, Mexico",
      duration: "50 Min",
      available: true,
      insurance: getDoctorInsurances(9)
    },
    {
      id: 10,
      name: "Dr. Roberto Silva",
      specialty: "Urgent Care",
      specialtyClass: "text-red",
      image: "assets/img/doctor-grid/doc2.png",
      rating: "4.4",
      location: "Toluca, Mexico",
      duration: "20 Min",
      available: true,
      insurance: getDoctorInsurances(10)
    },
    {
      id: 11,
      name: "Dr. Carmen Vega",
      specialty: "Chiropractor",
      specialtyClass: "text-yellow",
      image: "assets/img/doctor-grid/doc3.png",
      rating: "4.8",
      location: "San Luis Potosí, Mexico",
      duration: "40 Min",
      available: true,
      insurance: getDoctorInsurances(11)
    },
    {
      id: 12,
      name: "Dr. Fernando Ruiz",
      specialty: "Optometrist",
      specialtyClass: "text-cyan",
      image: "assets/img/doctor-grid/doc4.png",
      rating: "4.7",
      location: "Chihuahua, Mexico",
      duration: "35 Min",
      available: true,
      insurance: getDoctorInsurances(12)
    },
    {
      id: 13,
      name: "Dr. Patricia Morales",
      specialty: "Ophthalmologist",
      specialtyClass: "text-indigo",
      image: "assets/img/doctor-grid/doc5.png",
      rating: "4.9",
      location: "Guadalajara, Mexico",
      duration: "45 Min",
      available: true,
      insurance: getDoctorInsurances(13)
    },
    {
      id: 14,
      name: "Dr. Alejandro Torres",
      specialty: "Podiatrist",
      specialtyClass: "text-brown",
      image: "assets/img/doctor-grid/doc6.png",
      rating: "4.5",
      location: "Puebla, Mexico",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(14)
    },
    {
      id: 15,
      name: "Dr. Sofia Herrera",
      specialty: "Dermatologist",
      specialtyClass: "text-pink",
      image: "assets/img/doctor-grid/doc7.png",
      rating: "4.8",
      location: "Monterrey, Mexico",
      duration: "40 Min",
      available: true,
      insurance: getDoctorInsurances(15)
    },
    {
      id: 16,
      name: "Dr. Miguel Castro",
      specialty: "Orthopedic Surgeon",
      specialtyClass: "text-dark",
      image: "assets/img/doctor-grid/doc8.png",
      rating: "4.9",
      location: "Tijuana, Mexico",
      duration: "60 Min",
      available: true,
      insurance: getDoctorInsurances(16)
    },
    {
      id: 17,
      name: "Dr. Laura Jimenez",
      specialty: "Primary Care",
      specialtyClass: "text-primary",
      image: "assets/img/doctor-grid/doc1.png",
      rating: "4.6",
      location: "León, Mexico",
      duration: "30 Min",
      available: true,
      insurance: getDoctorInsurances(17)
    }
  ];

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
            return doctorSpecialty === "orthopedic surgeon";
          case "cardiologists":
            return doctorSpecialty === "cardiologist";
          case "neurologists":
            return doctorSpecialty === "neurologist";
          case "dentists":
            return doctorSpecialty === "dentist";
          case "obgyn":
            return doctorSpecialty === "obgyn";
          case "psychiatrists":
            return doctorSpecialty === "psychiatrist";
          case "therapists":
            return doctorSpecialty === "therapist";
          case "urgent-care":
            return doctorSpecialty === "urgent care";
          case "chiropractors":
            return doctorSpecialty === "chiropractor";
          case "optometrists":
            return doctorSpecialty === "optometrist";
          case "ophthalmologists":
            return doctorSpecialty === "ophthalmologist";
          case "podiatrists":
            return doctorSpecialty === "podiatrist";
          case "primary-care":
            return doctorSpecialty === "primary care";
          default:
            return doctorSpecialty.includes(paramSpecialty) || paramSpecialty.includes(doctorSpecialty);
        }
      });
      
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(allDoctors);
    }
  }, [searchParams]);

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
        <div className="card doctor-list-card">
          <div className="d-md-flex align-items-center">
            <div className="card-img card-img-hover">
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
            <div className="card-body p-0">
              <div className="d-flex align-items-center justify-content-between border-bottom p-3">
                    <Link to="#" className={`${doctor.specialtyClass} fw-medium fs-14`}>
                      {doctor.specialty}
                </Link>
                    <span className={`badge ${doctor.available ? 'bg-success-light' : 'bg-danger-light'} d-inline-flex align-items-center`}>
                  <i className="fa-solid fa-circle fs-5 me-1" />
                      {doctor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="p-3">
                <div className="doctor-info-detail pb-3">
                  <div className="row align-items-center gy-3">
                    <div className="col-sm-6">
                      <div>
                        <h6 className="d-flex align-items-center mb-1">
                              <Link to="/patient/doctor-profile">{doctor.name}</Link>
                          <i className="isax isax-tick-circle5 text-success ms-2" />
                        </h6>
                            <p className="mb-2">MBBS, MD - {doctor.specialty}</p>
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
                          English, French
                        </p>
                        <p className="d-flex align-items-center mb-0 fs-14 mb-2">
                          <i className="isax isax-shield-tick text-dark me-2" />
                          {Array.isArray(doctor.insurance) ? doctor.insurance.join(", ") : doctor.insurance}
                        </p>
                        <p className="d-flex align-items-center mb-0 fs-14">
                          <i className="isax isax-archive-14 text-dark me-2" />
                          20 Years of Experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mt-3">
                  <div className="d-flex align-items-center flex-wrap row-gap-3">
                    <p className="mb-0">
                      Next available at <br />
                      10:00 AM - 15 Oct, Tue
                    </p>
                  </div>
                  <Link
                    to="/booking"
                    state={{ selectedDoctor: doctor }}
                    className="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
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
