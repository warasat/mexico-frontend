import React from 'react';
import Slider from "react-slick";
import ImageWithBasePath from '../../../../components/imageWithBasePath';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../core/context/AuthContext';

const SectionSpeciality: React.FC = () => {
    const navigate = useNavigate();
    const { authState } = useAuth();
    const { isAuthenticated, userType } = authState;

    interface ArrowProps {
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }

    // Doctor data to count by specialty
    const allDoctors = [
        { id: 1, name: "Dr. Michael Brown", specialty: "Psychologist" },
        { id: 2, name: "Dr. Nicholas Tello", specialty: "Pediatrician" },
        { id: 3, name: "Dr. Harold Bryant", specialty: "Neurologist" },
        { id: 4, name: "Dr. Sandra Jones", specialty: "Cardiologist" },
        { id: 5, name: "Dr. Charles Scott", specialty: "Neurologist" },
        { id: 6, name: "Dr. Maria Rodriguez", specialty: "Dentist" },
        { id: 7, name: "Dr. Lisa Anderson", specialty: "Orthopedist" },
        { id: 8, name: "Dr. Robert Wilson", specialty: "Dermatologist" },
        { id: 9, name: "Dr. Jennifer Davis", specialty: "Psychiatrist" },
        { id: 10, name: "Dr. David Martinez", specialty: "Urologist" },
        { id: 11, name: "Dr. Sarah Johnson", specialty: "Endocrinologist" },
        { id: 12, name: "Dr. James Thompson", specialty: "Pulmonologist" },
        { id: 13, name: "Dr. Emily White", specialty: "Gastroenterologist" },
        { id: 14, name: "Dr. Christopher Lee", specialty: "Ophthalmologist" },
        { id: 15, name: "Dr. Amanda Garcia", specialty: "OB-GYN" },
        { id: 16, name: "Dr. Kevin Brown", specialty: "Chiropractor" },
        { id: 17, name: "Dr. Rachel Green", specialty: "Optometrist" },
        { id: 18, name: "Dr. Mark Taylor", specialty: "Podiatrist" },
        { id: 19, name: "Dr. Jessica Clark", specialty: "Primary Care Physician" },
        { id: 20, name: "Dr. Daniel Adams", specialty: "ENT" }
    ];

    // Function to count doctors by specialty
    const getDoctorCount = (specialtyName: string): number => {
        const specialtyMapping: { [key: string]: string } = {
            "Cardiology": "Cardiologist",
            "Orthopedics": "Orthopedist", 
            "Neurology": "Neurologist",
            "Pediatrics": "Pediatrician",
            "Psychiatry": "Psychiatrist",
            "Endocrinology": "Endocrinologist",
            "Pulmonology": "Pulmonologist",
            "Urology": "Urologist"
        };

        const mappedSpecialty = specialtyMapping[specialtyName] || specialtyName;
        return allDoctors.filter(doctor => 
            doctor.specialty.toLowerCase() === mappedSpecialty.toLowerCase()
        ).length;
    };

    // Function to handle specialty click
    const handleSpecialtyClick = (specialtyName: string) => {
        // Check if user is authenticated as patient
        if (!isAuthenticated || userType !== 'patient') {
            // Redirect to patient login with warning message and return path
            navigate('/pages/patient-signup', { 
                state: { 
                    from: { pathname: '/' },
                    message: 'Please login first to search for doctors and book appointments.'
                }
            });
            return;
        }
        
        // User is authenticated as patient, proceed to search
        const specialtyMapping: { [key: string]: string } = {
            "Cardiology": "cardiologists",
            "Orthopedics": "orthopedic-surgeons",
            "Neurology": "neurologists", 
            "Pediatrics": "pediatricians",
            "Psychiatry": "psychiatrists",
            "Endocrinology": "endocrinologists",
            "Pulmonology": "pulmonologists",
            "Urology": "urologists"
        };

        const urlParam = specialtyMapping[specialtyName] || specialtyName.toLowerCase();
        navigate(`/patient/search-doctor1?specialty=${encodeURIComponent(urlParam)}`);
    };

    const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => (
        <div className="spciality-nav nav-bottom owl-nav">
            <button type="button" role="presentation" className="owl-next" onClick={onClick}>
                <i className="fa-solid fa-chevron-right" />
            </button>
        </div>
    );

    const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
        <div className="spciality-nav nav-bottom owl-nav">
            <button type="button" role="presentation" className="owl-prev" onClick={onClick}>
                <i className="fa-solid fa-chevron-left" />
            </button>
        </div>
    );
    const SpecialitySlider = {
        slidesToShow: 8,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        infinite: true,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 8,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 0,
                settings: {
                    vertical: false,
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            {/* Speciality Section */}
            <section className="speciality-section">
                <div className="container">
                    <div
                        className="section-header sec-header-one text-center aos"
                        data-aos="fade-up"
                    >
                        <span className="badge badge-primary">Top Specialties</span>
                        <h2>Highlighting the Care &amp; Support</h2>
                    </div>
                    <div className="spciality-slider slick-margins slick-arrow-center aos" data-aos="fade-up">
                        <Slider {...SpecialitySlider}>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Cardiology")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/speciality-01.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-01.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }}>Cardiology</span>
                                </h6>
                                <p className="mb-0">{getDoctorCount("Cardiology")} Doctors</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Orthopedics")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/speciality-02.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-02.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }}>Orthopedics</span>
                                </h6>
                                <p className="mb-0">{getDoctorCount("Orthopedics")} Doctors</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Neurology")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/speciality-03.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-03.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }}>Neurology</span>
                                </h6>
                                <p className="mb-0">{getDoctorCount("Neurology")} Doctors</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Pediatrics")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/speciality-04.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-04.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }}>Pediatrics</span>
                                </h6>
                                <p className="mb-0">{getDoctorCount("Pediatrics")} Doctors</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Psychiatry")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/speciality-05.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-05.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }}>Psychiatry</span>
                                </h6>
                                <p className="mb-0">{getDoctorCount("Psychiatry")} Doctors</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Endocrinology")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/speciality-06.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-06.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }}>Endocrinology</span>
                                </h6>
                                <p className="mb-0">{getDoctorCount("Endocrinology")} Doctors</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Pulmonology")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/speciality-07.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-07.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }}>Pulmonology</span>
                                </h6>
                                <p className="mb-0">{getDoctorCount("Pulmonology")} Doctors</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Urology")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/speciality-08.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-08.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }}>Urology</span>
                                </h6>
                                <p className="mb-0">{getDoctorCount("Urology")} Doctors</p>
                            </div>
                        </Slider>

                    </div>
                    <div className="spciality-nav nav-bottom owl-nav" />
                </div>
            </section>
            {/* /Speciality Section */}
        </>

    )
}

export default SectionSpeciality
