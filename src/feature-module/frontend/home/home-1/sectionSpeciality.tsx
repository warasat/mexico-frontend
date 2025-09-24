import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import ImageWithBasePath from '../../../../components/imageWithBasePath';
import { useNavigate } from 'react-router-dom';
import publicDoctorApi, { type PublicDoctor } from '../../../../core/services/publicDoctorApi';
import { useGlobalTranslation } from '../../../../hooks/useGlobalTranslation';

const SectionSpeciality: React.FC = () => {
    const navigate = useNavigate();
    const [allDoctors, setAllDoctors] = useState<PublicDoctor[]>([]);
    const { t } = useGlobalTranslation();

    interface ArrowProps {
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }

    // Fetch doctors from database
    useEffect(() => {
        (async () => {
            try {
                const res = await publicDoctorApi.list({ sort: 'rank', limit: 100 });
                setAllDoctors(res.results);
            } catch {
                setAllDoctors([]);
            }
        })();
    }, []);

    // Function to count doctors by specialty
    const getDoctorCount = (specialtyName: string): number => {
        const specialtyMapping: { [key: string]: string[] } = {
            "Dentist": ["Dentist", "Dental"],
            "Cardiologist": ["Cardiologist", "Cardiology", "Heart Specialist"],
            "Dermatologist": ["Dermatologist", "Dermatology", "Skin Specialist"],
            "Pediatrician": ["Pediatrician", "Pediatrics", "Child Specialist"],
            "Orthopedic Surgeon": ["Orthopedic Surgeon", "Orthopedist", "Orthopedics", "Bone Specialist"],
            "Psychologist": ["Psychologist", "Psychology", "Mental Health"],
            "Psychiatrist": ["Psychiatrist", "Psychiatry", "Mental Health Specialist"],
            "Primary Care Physician": ["Primary Care Physician", "PCP", "General Practitioner", "Family Doctor"],
            "Chiropractor": ["Chiropractor", "Chiropractic", "Spine Specialist"],
            "Optometrist": ["Optometrist", "Optometry", "Eye Care"]
        };

        const mappedSpecialties = specialtyMapping[specialtyName] || [specialtyName];
        return allDoctors.filter(doctor => {
            const doctorSpecialty = doctor.designation?.toLowerCase() || '';
            return mappedSpecialties.some(specialty => 
                doctorSpecialty.includes(specialty.toLowerCase())
            );
        }).length;
    };

    // Function to handle specialty click
    const handleSpecialtyClick = (specialtyName: string) => {
        // Allow search without authentication
        const specialtyMapping: { [key: string]: string } = {
            "Dentist": "dentists",
            "Cardiologist": "cardiologists",
            "Dermatologist": "dermatologists",
            "Pediatrician": "pediatricians",
            "Orthopedic Surgeon": "orthopedic-surgeons",
            "Psychologist": "psychologists",
            "Psychiatrist": "psychiatrists",
            "Primary Care Physician": "primary-care",
            "Chiropractor": "chiropractors",
            "Optometrist": "optometrists"
        };

        const urlParam = specialtyMapping[specialtyName] || specialtyName.toLowerCase().replace(/\s+/g, '-');
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
        slidesToShow: 10,
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
                breakpoint: 1200,
                settings: {
                    slidesToShow: 8,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 6,
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
                        <span className="badge badge-primary" data-key="home.specialties.badge">{t("home.specialties.badge")}</span>
                        <h2 data-key="home.specialties.title">{t("home.specialties.title")}</h2>
                    </div>
                    <div className="spciality-slider slick-margins slick-arrow-center aos" data-aos="fade-up">
                        <Slider {...SpecialitySlider}>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Dentist")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-1.jpeg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-01.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.dentist">{t("specialties.dentist")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Dentist") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Cardiologist")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-2.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-02.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.cardiologist">{t("specialties.cardiologist")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Cardiologist") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Dermatologist")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-3.png" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-03.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.dermatologist">{t("specialties.dermatologist")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Dermatologist") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Pediatrician")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-4.webp" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-04.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.pediatrician">{t("specialties.pediatrician")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Pediatrician") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Orthopedic Surgeon")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-5.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-05.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.orthopedicSurgeon">{t("specialties.orthopedicSurgeon")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Orthopedic Surgeon") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Psychologist")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-6.png" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-06.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.psychologist">{t("specialties.psychologist")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Psychologist") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Psychiatrist")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-7.webp" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-07.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.psychiatrist">{t("specialties.psychiatrist")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Psychiatrist") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Primary Care Physician")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-8.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-08.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.primaryCare">{t("specialties.primaryCare")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Primary Care Physician") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Chiropractor")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-1.jpeg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-01.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.chiropractor">{t("specialties.chiropractor")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Chiropractor") })}</p>
                            </div>
                            <div className="spaciality-item" onClick={() => handleSpecialtyClick("Optometrist")}>
                                <div className="spaciality-img">
                                    <ImageWithBasePath src="assets/img/specialities/top-speciality-2.jpg" alt="img" />
                                    <span className="spaciality-icon">
                                        <ImageWithBasePath
                                            src="assets/img/specialities/speciality-icon-02.svg"
                                            alt="img"
                                        />
                                    </span>
                                </div>
                                <h6>
                                    <span style={{ cursor: 'pointer' }} data-key="specialties.optometrist">{t("specialties.optometrist")}</span>
                                </h6>
                                <p className="mb-0" data-key="home.specialties.doctorCount">{t("home.specialties.doctorCount", { count: getDoctorCount("Optometrist") })}</p>
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
