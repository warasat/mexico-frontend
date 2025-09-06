import { Link, useSearchParams } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useEffect, useState } from "react";

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [specialty, setSpecialty] = useState<string>("");

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
      available: true
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
      available: true
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
      available: true
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
      available: true
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
      available: true
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
      <div className="col-md-6">
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
      <div className="col-md-6">
        <div className="d-flex align-items-center justify-content-end mb-4">
          <div className="doctor-filter-availability me-2">
            <p>Availability</p>
            <div className="status-toggle status-tog">
              <input type="checkbox" id="status_6" className="check" />
              <label htmlFor="status_6" className="checktoggle">
                checkbox
              </label>
            </div>
          </div>
          <div className="dropdown header-dropdown me-2">
            <Link
              className="dropdown-toggle sort-dropdown"
              data-bs-toggle="dropdown"
              to="#"
              aria-expanded="false"
            >
              <span>Sort By</span>Price (Low to High)
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link to="#" className="dropdown-item">
                Price (Low to High)
              </Link>
              <Link to="#" className="dropdown-item">
                Price (High to Low)
              </Link>
            </div>
          </div>
          <Link to="/patient/doctor-grid" className="btn btn-sm head-icon me-2">
            <i className="isax isax-grid-7" />
          </Link>
          <Link to="/patient/search-doctor2" className="btn btn-sm head-icon active me-2">
            <i className="isax isax-row-vertical" />
          </Link>
          <Link to="/patient/doctor-list" className="btn btn-sm head-icon">
            <i className="isax isax-location" />
          </Link>
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
                          <i className="isax isax-like-1 text-dark me-2" />
                          98% (252 / 287 Votes)
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
      <div className="col-md-12">
        <div className="pagination dashboard-pagination mt-md-3 mt-0 mb-4">
          <ul>
            <li>
              <Link to="#" className="page-link prev">
                Prev
              </Link>
            </li>
            <li>
              <Link to="#" className="page-link">
                1
              </Link>
            </li>
            <li>
              <Link to="#" className="page-link active">
                2
              </Link>
            </li>
            <li>
              <Link to="#" className="page-link">
                3
              </Link>
            </li>
            <li>
              <Link to="#" className="page-link">
                4
              </Link>
            </li>
            <li>
              <Link to="#" className="page-link next">
                Next
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default Doctors;
