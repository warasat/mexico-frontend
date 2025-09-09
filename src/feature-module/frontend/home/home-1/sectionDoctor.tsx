import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import ImageWithBasePath from '../../../../components/imageWithBasePath';
import { useAuth } from '../../../../core/context/AuthContext';

const SectionDoctor: React.FC = () => {
    const { authState } = useAuth();
    const { isAuthenticated, userType } = authState;
    const navigate = useNavigate();

    // Function to handle Book Now button click
    const handleBookNow = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!isAuthenticated || userType !== 'patient') {
            // Redirect to patient register (tabbed login) with warning message and return path
            navigate('/pages/patient-signup', { 
                state: { 
                    from: { pathname: '/' },
                    message: 'Please login first to book an appointment with our doctors.'
                }
            });
        } else {
            // User is authenticated as patient, proceed to booking
            navigate('/booking');
        }
    };

    interface ArrowProps {
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }

    const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => (
        <div className="spciality-nav nav-bottom owl-nav ">
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
    const Doctoroptions = {
        slidesToShow: 4,
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
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
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
            {/* Doctor Section */}
            <section className="doctor-section">
                <div className="container">
                    <div
                        className="section-header sec-header-one text-center aos"
                        data-aos="fade-up"
                    >
                        <span className="badge badge-primary">Featured Doctors</span>
                        <h2>Our Highlighted Doctors</h2>
                    </div>
                    <div className="doctors-slider slick-margins slick-arrow-center aos" data-aos="fade-up">
                        <Slider {...Doctoroptions}>
                            <div className="card">
                                <div className="card-img card-img-hover">
                                    <Link to="/patient/doctor-profile">
                                        <ImageWithBasePath src="assets/img/doctor-grid/doc1.png" alt="" />
                                    </Link>
                                    <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                        <span className="badge bg-orange">
                                            <i className="fa-solid fa-star me-1" />
                                            5.0
                                        </span>
                                        <Link to="#" className="fav-icon">
                                            <i className="fa fa-heart" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="d-flex active-bar align-items-center justify-content-between p-3">
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
                                                <Link to="/patient/doctor-profile">Dr. Michael Brown</Link>
                                            </h3>
                                            <div className="d-flex align-items-center">
                                                <p className="d-flex align-items-center mb-0 fs-14">
                                                    <i className="isax isax-location me-2" />
                                                    Guadalajara, Mexico
                                                </p>
                                                <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                                                <span className="fs-14 fw-medium">30 Min</span>
                                            </div>
                                        </div>
                                                                                 <div className="d-flex align-items-center justify-content-center">
                                             <button
                                                 onClick={handleBookNow}
                                                 className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                                             >
                                                 {/* <i className="isax isax-calendar-1 me-2" /> */}
                                                 Book Now
                                             </button>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img card-img-hover">
                                    <Link to="/patient/doctor-profile">
                                        <ImageWithBasePath src="assets/img/doctor-grid/doc2.png" alt="" />
                                    </Link>
                                    <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                        <span className="badge bg-orange">
                                            <i className="fa-solid fa-star me-1" />
                                            4.6
                                        </span>
                                        <Link to="#" className="fav-icon">
                                            <i className="fa fa-heart" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="d-flex active-bar active-bar-pink align-items-center justify-content-between p-3">
                                        <Link to="#" className="text-pink fw-medium fs-14">
                                            Pediatrician
                                        </Link>
                                        <span className="badge bg-success-light d-inline-flex align-items-center">
                                            <i className="fa-solid fa-circle fs-5 me-1" />
                                            Available
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
                                                    Monterrey, Mexico
                                                </p>
                                                <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                                                <span className="fs-14 fw-medium">60 Min</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button
                                                onClick={handleBookNow}
                                                className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img card-img-hover">
                                    <Link to="/patient/doctor-profile">
                                        <ImageWithBasePath src="assets/img/doctor-grid/doc3.png" alt="" />
                                    </Link>
                                    <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                        <span className="badge bg-orange">
                                            <i className="fa-solid fa-star me-1" />
                                            4.8
                                        </span>
                                        <Link to="#" className="fav-icon">
                                            <i className="fa fa-heart" />
                                        </Link>
                                    </div>
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
                                                    Puebla, Mexico
                                                </p>
                                                <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                                                <span className="fs-14 fw-medium">30 Min</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button
                                                onClick={handleBookNow}
                                                className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img card-img-hover">
                                    <Link to="/patient/doctor-profile">
                                        <ImageWithBasePath src="assets/img/doctor-grid/doc4.png" alt="" />
                                    </Link>
                                    <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                        <span className="badge bg-orange">
                                            <i className="fa-solid fa-star me-1" />
                                            4.8
                                        </span>
                                        <Link to="#" className="fav-icon">
                                            <i className="fa fa-heart" />
                                        </Link>
                                    </div>
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
                                                    Tijuana, Mexico
                                                </p>
                                                <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                                                <span className="fs-14 fw-medium">30 Min</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-2">
                                                <p className="d-flex align-items-center mb-0 fs-14">
                                                    <i className="isax isax-archive-14 me-2" />
                                                    Chest Pain, Hypertension, Arrhythmia, High Cholesterol, Heart Disease Follow-Up
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button
                                                onClick={handleBookNow}
                                                className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img card-img-hover">
                                    <Link to="/patient/doctor-profile">
                                        <ImageWithBasePath src="assets/img/doctor-grid/doc5.png" alt="" />
                                    </Link>
                                    <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                        <span className="badge bg-orange">
                                            <i className="fa-solid fa-star me-1" />
                                            4.2
                                        </span>
                                        <Link to="#" className="fav-icon">
                                            <i className="fa fa-heart" />
                                        </Link>
                                    </div>
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
                                                     León, Mexico
                                                 </p>
                                                 <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                                                 <span className="fs-14 fw-medium">30 Min</span>
                                             </div>
                                         </div>
                                         <div className="d-flex align-items-center justify-content-center">
                                             <button
                                                 onClick={handleBookNow}
                                                 className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                                             >
                                                 Book Now
                                             </button>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img card-img-hover">
                                    <Link to="/patient/doctor-profile">
                                        <ImageWithBasePath src="assets/img/doctor-grid/doc6.png" alt="" />
                                    </Link>
                                    <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                        <span className="badge bg-orange">
                                            <i className="fa-solid fa-star me-1" />
                                            4.7
                                        </span>
                                        <Link to="#" className="fav-icon">
                                            <i className="fa fa-heart" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="d-flex active-bar active-bar active-bar-purple align-items-center justify-content-between p-3">
                                        <Link to="#" className="text-purple fw-medium fs-14">
                                            Dentist
                                        </Link>
                                        <span className="badge bg-success-light d-inline-flex align-items-center">
                                            <i className="fa-solid fa-circle fs-5 me-1" />
                                            Available
                                        </span>
                                    </div>
                                    <div className="p-3 pt-0">
                                        <div className="doctor-info-detail mb-3 pb-3">
                                            <h3 className="mb-1">
                                                <Link to="/patient/doctor-profile">Dr. Maria Rodriguez</Link>
                                            </h3>
                                            <div className="d-flex align-items-center">
                                                <p className="d-flex align-items-center mb-0 fs-14">
                                                    <i className="isax isax-location me-2" />
                                                    Mexico City, Mexico
                                                </p>
                                                <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                                                <span className="fs-14 fw-medium">45 Min</span>
                                            </div>
                                        </div>
                                        <div className="d-flex alignments-center justify-content-center">
                                            <button
                                                onClick={handleBookNow}
                                                className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img card-img-hover">
                                    <Link to="/patient/doctor-profile">
                                        <ImageWithBasePath src="assets/img/doctor-grid/doc7.png" alt="" />
                                    </Link>
                                    <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                        <span className="badge bg-orange">
                                            <i className="fa-solid fa-star me-1" />
                                            4.9
                                        </span>
                                        <Link to="#" className="fav-icon">
                                            <i className="fa fa-heart" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="d-flex active-bar active-bar-green alignments-center justify-content-between p-3">
                                        <Link to="#" className="text-green fw-medium fs-14">
                                            OBGYN
                                        </Link>
                                        <span className="badge bg-success-light d-inline-flex align-items-center">
                                            <i className="fa-solid fa-circle fs-5 me-1" />
                                            Available
                                        </span>
                                    </div>
                                    <div className="p-3 pt-0">
                                        <div className="doctor-info-detail mb-3 pb-3">
                                            <h3 className="mb-1">
                                                <Link to="/patient/doctor-profile">Dr. Ana Martinez</Link>
                                            </h3>
                                            <div className="d-flex align-items-center">
                                                <p className="d-flex align-items-center mb-0 fs-14">
                                                    <i className="isax isax-location me-2" />
                                                    Cancún, Mexico
                                                </p>
                                                <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                                                <span className="fs-14 fw-medium">60 Min</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button
                                                onClick={handleBookNow}
                                                className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img card-img-hover">
                                    <Link to="/patient/doctor-profile">
                                        <ImageWithBasePath src="assets/img/doctor-grid/doc8.png" alt="" />
                                    </Link>
                                    <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                        <span className="badge bg-orange">
                                            <i className="fa-solid fa-star me-1" />
                                            4.5
                                        </span>
                                        <Link to="#" className="fav-icon">
                                            <i className="fa fa-heart" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="d-flex active-bar active-bar-orange align-items-center justify-content-between p-3">
                                        <Link to="#" className="text-orange fw-medium fs-14">
                                            Psychiatrist
                                        </Link>
                                        <span className="badge bg-success-light d-inline-flex align-items-center">
                                            <i className="fa-solid fa-circle fs-5 me-1" />
                                            Available
                                        </span>
                                    </div>
                                    <div className="p-3 pt-0">
                                        <div className="doctor-info-detail mb-3 pb-3">
                                            <h3 className="mb-1">
                                                <Link to="/patient/doctor-profile">Dr. Carlos Lopez</Link>
                                            </h3>
                                            <div className="d-flex align-items-center">
                                                <p className="d-flex align-items-center mb-0 fs-14">
                                                    <i className="isax isax-location me-2" />
                                                    Querétaro, Mexico
                                                </p>
                                                <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                                                <span className="fs-14 fw-medium">45 Min</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button
                                                onClick={handleBookNow}
                                                className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className="doctor-nav nav-bottom owl-nav" />
                </div>
            </section>
            {/* /Doctor Section */}
        </>

    )
}

export default SectionDoctor
