import React from 'react'
import CountUp from "react-countup";
import Slider from "react-slick";
import ImageWithBasePath from '../../../../components/imageWithBasePath';
import { Link } from 'react-router-dom';
import { useGlobalTranslation } from '../../../../hooks/useGlobalTranslation';

const SectionTestimonial: React.FC = () => {
    const { t } = useGlobalTranslation();
    const TestimonialSlider1 = {
        slidesToShow:3,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
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
        <div>
            {/* Testimonial Section */}
            <section className="testimonial-section-one">
                <div className="container">
                    <div className="section-header sec-header-one text-center aos" data-aos="fade-up">
                        <span className="badge badge-primary" data-key="home.testimonials.badge">{t("home.testimonials.badge")}</span>
                        <h2 data-key="home.testimonials.title">{t("home.testimonials.title")}</h2>
                    </div>
                    {/* Testimonial Slider */}
                    <div className=" testimonials-slider slick-margins aos" data-aos="fade-up">
                    <Slider {...TestimonialSlider1}>
                        <div className="card shadow-none mb-0">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="rating d-flex">
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled" />
                                    </div>
                                    <span>
                                        <ImageWithBasePath src="assets/img/icons/quote-icon.svg" alt="img" />
                                    </span>
                                </div>
                                <h6 className="fs-16 fw-medium mb-2" data-key="home.testimonials.testimonial1.title">{t("home.testimonials.testimonial1.title")}</h6>
                                <p data-key="home.testimonials.testimonial1.content">{t("home.testimonials.testimonial1.content")}</p>
                                <div className="d-flex align-items-center">
                                    <Link to="#" className="avatar avatar-lg">
                                        <ImageWithBasePath src="assets/img/patients/patient22.jpg" className="rounded-circle" alt="img" />
                                    </Link>
                                    <div className="ms-2">
                                        <h6 className="mb-1"><Link to="#" data-key="home.testimonials.testimonial1.author">{t("home.testimonials.testimonial1.author")}</Link></h6>
                                        <p className="fs-14 mb-0" data-key="home.testimonials.testimonial1.location">{t("home.testimonials.testimonial1.location")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow-none mb-0">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="rating d-flex">
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled" />
                                    </div>
                                    <span>
                                        <ImageWithBasePath src="assets/img/icons/quote-icon.svg" alt="img" />
                                    </span>
                                </div>
                                <h6 className="fs-16 fw-medium mb-2" data-key="home.testimonials.testimonial2.title">{t("home.testimonials.testimonial2.title")}</h6>
                                <p data-key="home.testimonials.testimonial2.content">{t("home.testimonials.testimonial2.content")}</p>
                                <div className="d-flex align-items-center">
                                    <Link to="#" className="avatar avatar-lg">
                                        <ImageWithBasePath src="assets/img/patients/patient21.jpg" className="rounded-circle" alt="img" />
                                    </Link>
                                    <div className="ms-2">
                                        <h6 className="mb-1"><Link to="#" data-key="home.testimonials.testimonial2.author">{t("home.testimonials.testimonial2.author")}</Link></h6>
                                        <p className="fs-14 mb-0" data-key="home.testimonials.testimonial2.location">{t("home.testimonials.testimonial2.location")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow-none mb-0">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="rating d-flex">
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled" />
                                    </div>
                                    <span>
                                        <ImageWithBasePath src="assets/img/icons/quote-icon.svg" alt="img" />
                                    </span>
                                </div>
                                <h6 className="fs-16 fw-medium mb-2" data-key="home.testimonials.testimonial3.title">{t("home.testimonials.testimonial3.title")}</h6>
                                <p data-key="home.testimonials.testimonial3.content">{t("home.testimonials.testimonial3.content")}</p>
                                <div className="d-flex align-items-center">
                                    <Link to="#" className="avatar avatar-lg">
                                        <ImageWithBasePath src="assets/img/patients/patient.jpg" className="rounded-circle" alt="img" />
                                    </Link>
                                    <div className="ms-2">
                                        <h6 className="mb-1"><Link to="#" data-key="home.testimonials.testimonial3.author">{t("home.testimonials.testimonial3.author")}</Link></h6>
                                        <p className="fs-14 mb-0" data-key="home.testimonials.testimonial3.location">{t("home.testimonials.testimonial3.location")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow-none mb-0">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="rating d-flex">
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled me-1" />
                                        <i className="fa-solid fa-star filled" />
                                    </div>
                                    <span>
                                        <ImageWithBasePath src="assets/img/icons/quote-icon.svg" alt="img" />
                                    </span>
                                </div>
                                <h6 className="fs-16 fw-medium mb-2">Excellent Service</h6>
                                <p>I had a wonderful experience the staff was friendly and attentive, and Dr. Smith took the time to explain everything clearly.</p>
                                <div className="d-flex align-items-center">
                                    <Link to="#" className="avatar avatar-lg">
                                        <ImageWithBasePath src="assets/img/patients/patient23.jpg" className="rounded-circle" alt="img" />
                                    </Link>
                                    <div className="ms-2">
                                        <h6 className="mb-1"><Link to="#">Sofia Doe</Link></h6>
                                        <p className="fs-14 mb-0">United States</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Slider>
                    </div>
                    {/* /Testimonial Slider */}
                    {/* Counter */}
                    <div className="testimonial-counter">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-gap-4">
                            <div className="counter-item text-center aos" data-aos="fade-up">
                                <h6 className="display-6">
                                    <CountUp
                                        end={300}
                                        duration={5}
                                        className="counter animated fadeInDownBig"
                                    />+</h6>
                                <p>Doctors Available</p>
                            </div>
                            <div className="counter-item text-center aos" data-aos="fade-up" >
                                <h6 className="display-6 secondary-count">
                                    <CountUp
                                        end={18}
                                        duration={5}
                                        className="counter animated fadeInDownBig"
                                    />+</h6>
                                <p>Specialities</p>
                            </div>
                            <div className="counter-item text-center aos" data-aos="fade-up">
                                <h6 className="display-6 purple-count">
                                    <CountUp
                                        end={30}
                                        duration={5}
                                        className="counter animated fadeInDownBig"
                                    />K</h6>
                                <p>Bookings Done</p>
                            </div>
                            <div className="counter-item text-center aos" data-aos="fade-up">
                                <h6 className="display-6 pink-count">
                                    <CountUp
                                        end={97}
                                        duration={5}
                                        className="counter animated fadeInDownBig"
                                    />+</h6>
                                <p>Hospitals &amp; Clinic</p>
                            </div>
                            <div className="counter-item text-center  aos" data-aos="fade-up">
                                <h6 className="display-6 warning-count">
                                    <CountUp
                                        end={317}
                                        duration={5}
                                        className="counter animated fadeInDownBig"
                                    />+</h6>
                                <p>Lab Tests Available</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Counter */}
            </section>
            {/* /Testimonial Section */}


        </div >
    )
}

export default SectionTestimonial
