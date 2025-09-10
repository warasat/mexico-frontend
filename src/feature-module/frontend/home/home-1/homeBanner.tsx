import React, { useState } from 'react'
import ImageWithBasePath from '../../../../components/imageWithBasePath';
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import { specialtiesData } from '../../common/data/specialties';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../../core/context/AuthContext';

// Mexican cities for location dropdown
const mexicanCities = [
  "Mexico City",
  "Guadalajara",
  "Monterrey",
  "Puebla",
  "Tijuana",
  "León",
  "Cancún",
  "Mérida",
  "Toluca",
  "Querétaro",
  "San Luis Potosí",
  "Chihuahua"
];

// Removed unused legacy medicalSpecialities list

// Insurance providers for hero section
const insuranceProviders = [
  "Aetna",
  "Anthem Blue Cross Blue Shield",
  "Blue Cross Blue Shield",
  "Cigna",
  "Humana",
  "UnitedHealth",
  "Kaiser Permanente",
  "AARP",
  "Medicare",
  "Medicaid",
  "Tricare",
  "VA Health Care",
  "BCBS Federal Employee Program",
  "Aetna Better Health",
  "AmeriHealth",
  "CareFirst BlueCross BlueShield",
  "Highmark Blue Cross Blue Shield",
  "Independence Blue Cross",
  "Premera Blue Cross",
  "Regence Blue Cross Blue Shield",
  "SelectHealth",
  "WellCare",
  "Molina Healthcare",
  "Centene",
  "Bright Health",
  "Oscar Health",
  "Ambetter",
  "Health Net",
  "Anthem",
  "Empire Blue Cross",
  "Blue Cross of California",
  "Blue Cross of Texas",
  "Blue Cross of Illinois",
  "Blue Cross of Michigan",
  "Blue Cross of Massachusetts",
  "Blue Cross of New York",
  "Blue Cross of Florida",
  "Blue Cross of Georgia",
  "Blue Cross of North Carolina",
  "Blue Cross of Pennsylvania",
  "Blue Cross of Ohio",
  "Blue Cross of Indiana",
  "Blue Cross of Wisconsin",
  "Blue Cross of Minnesota",
  "Blue Cross of Colorado",
  "Blue Cross of Arizona",
  "Blue Cross of Nevada",
  "Blue Cross of Oregon",
  "Blue Cross of Washington",
  "Blue Cross of Maryland"
];



const HomeBanner: React.FC = () => {
    const navigate = useNavigate();
    // const { authState } = useAuth();
    // const { isAuthenticated, userType } = authState;
    const [selectedInsurance, setSelectedInsurance] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedSpeciality, setSelectedSpeciality] = useState<string>('');
    const [selectedDisease, setSelectedDisease] = useState<string>('');
    const { t } = useTranslation();

    // Hero banner slider configuration
    const HeroSlider = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        fade: true,
        cssEase: "linear"
    };

    // Hero banner slides data
    const heroSlides = [
        {
            title: "Find Your Doctor",
            subtitle: "Book an appointment with the best doctors",
            description: "Connect with experienced healthcare professionals and get the care you need.",
            bgImage: "assets/img/bg/banner-bg-02.png"
        },
        {
            title: "Quality Healthcare",
            subtitle: "Expert medical care at your fingertips",
            description: "Access top-rated doctors and specialists for all your healthcare needs.",
            bgImage: "assets/img/bg/banner-bg-03.png"
        },
        {
            title: "24/7 Support",
            subtitle: "Healthcare support whenever you need it",
            description: "Get medical assistance and support around the clock from our dedicated team.",
            bgImage: "assets/img/bg/banner-bg-04.png"
        }
    ];

    // Removed unused legacy typeahead handlers and effects

    
    return (

        <>
            {/* Home Banner */}
            <section className="banner-section banner-sec-one">
                <Slider {...HeroSlider}>
                    {heroSlides.map((slide, index) => (
                        <div key={index}>
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-7">
                                        <div className="banner-content aos" data-aos="fade-up">
                                            <div className="rating-appointment d-inline-flex align-items-center gap-2">
                                                <div className="avatar-list-stacked avatar-group-lg">
                                                    <span className="avatar avatar-rounded">
                                                        <ImageWithBasePath
                                                            className="border border-white"
                                                            src="assets/img/doctors/doctor-thumb-22.jpg"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <span className="avatar avatar-rounded">
                                                        <ImageWithBasePath
                                                            className="border border-white"
                                                            src="assets/img/doctors/doctor-thumb-23.jpg"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <span className="avatar avatar-rounded">
                                                        <ImageWithBasePath src="assets/img/doctors/doctor-thumb-24.jpg" alt="img" />
                                                    </span>
                                                </div>
                                                <div className="me-2">
                                                    <h6 className="mb-1">{t('home.appointments')}</h6>
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <i className="fa-solid fa-star text-orange me-1" />
                                                            <i className="fa-solid fa-star text-orange me-1" />
                                                            <i className="fa-solid fa-star text-orange me-1" />
                                                            <i className="fa-solid fa-star text-orange me-1" />
                                                            <i className="fa-solid fa-star text-orange me-1" />
                                                        </div>
                                                        <p>{t('home.ratings')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="display-5">
                                                {slide.title}{" "}
                                                <span className="banner-icon">
                                                    <ImageWithBasePath src="assets/img/icons/video.svg" alt="img" />
                                                </span>{" "}
                                                <span className="text-gradient">{slide.subtitle}</span>
                                            </h1>
                                            <p className="lead mb-4">{slide.description}</p>
                                            <div className="search-box-one aos" data-aos="fade-up">
                                                <form className='p-3' onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const spec = selectedSpeciality.trim();
                                                    const disease = selectedDisease.trim();
                                                    if (!spec) return;
                                                    
                                                    // Check if user is authenticated as patient
                                                    // if (!isAuthenticated || userType !== 'patient') {
                                                    //     // Redirect to patient login with warning message and return path
                                                    //     navigate('/pages/patient-signup', { 
                                                    //         state: { 
                                                    //             from: { pathname: '/' },
                                                    //             message: 'Please login first to search for doctors and book appointments.'
                                                    //         }
                                                    //     });
                                                    //     return;
                                                    // }
                                                    
                                                    // User is authenticated as patient, proceed to search
                                                    const url = disease
                                                      ? `/patient/search-doctor1?specialty=${encodeURIComponent(spec)}&disease=${encodeURIComponent(disease)}`
                                                      : `/patient/search-doctor1?specialty=${encodeURIComponent(spec)}`;
                                                    navigate(url);
                                                }}>
                                                    <div className="search-input search-map-line">
                                                        <i className="isax isax-hospital5 bficon" />
                                                        <div className=" mb-0 position-relative" style={{width: '100%'}}>
                                                            <select
                                                                value={selectedSpeciality}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setSelectedSpeciality(val);
                                                                    setSelectedDisease('');
                                                                }}
                                                                className="form-control"
                                                                style={{ paddingLeft: '45px' }}
                                                            >
                                                                <option value="">{t('search.searchDoctors') as string}</option>
                                                                {specialtiesData.map((s) => (
                                                                    <option key={s.specialty} value={s.specialty}>{s.specialty}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="search-input search-map-line">
                                                        <i className="isax isax-hospital5 bficon" />
                                                        <div className="mb-0 position-relative" style={{ width: '100%' }}>
                                                            {selectedSpeciality ? (() => {
                                                                const selectedSpecialty = specialtiesData.find((s) => s.specialty === selectedSpeciality);
                                                                const diseases = selectedSpecialty?.diseases ?? [];
                                                                return (
                                                                    <select
                                                                        value={selectedDisease}
                                                                        onChange={(e) => setSelectedDisease(e.target.value)}
                                                                        className="form-control"
                                                                        style={{ paddingLeft: '45px'}}
                                                                    >
                                                                        <option value="">Select Condition</option>
                                                                        {diseases.map((d) => (
                                                                            <option key={d} value={d}>{d}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            })() : <select
                                                                        value={selectedDisease}
                                                                        onChange={(e) => setSelectedDisease(e.target.value)}
                                                                        className="form-control"
                                                                        style={{ paddingLeft: '45px'}}
                                                                    >
                                                                        <option value="">Select Condition</option>
                                                                    </select>}
                                                        </div>
                                                    </div>
                                                    <div className="search-input search-map-line">
                                                        <i className="isax isax-location5" />
                                                        <div className=" mb-0">
                                                            <select
                                                                value={selectedLocation}
                                                                onChange={(e) => setSelectedLocation(e.target.value)}
                                                                className="form-control"
                                                                style={{ paddingLeft: '45px' }}
                                                            >
                                                                <option value="">{t('maps.location')}</option>
                                                                {mexicanCities.map((city, idx) => (
                                                                    <option key={idx} value={city}>
                                                                        {city}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="search-input search-map-line">
                                                        <i className="isax isax-shield-tick5 bficon" />
                                                        <div className=" mb-0">
                                                            <select
                                                                value={selectedInsurance}
                                                                onChange={(e) => setSelectedInsurance(e.target.value)}
                                                                className="form-control"
                                                                style={{ paddingLeft: '45px' }}
                                                            >
                                                                <option value="">Insurance</option>
                                                                {insuranceProviders.map((insurance, idx) => (
                                                                    <option key={idx} value={insurance}>
                                                                        {insurance}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className=" mt-2 form-search-btn">
                                                        <button className="btn btn-primary" type="submit">
                                                            <i className="isax isax-search-normal5 me-2" />
                                                            {t('common.search')}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="banner-img aos" data-aos="fade-up">
                                            <ImageWithBasePath
                                                src="assets/img/banner/banner-doctor.svg"
                                                className="img-fluid"
                                                alt="patient-image"
                                            />
                                            <div className="banner-appointment">
                                                <h6>1K</h6>
                                                <p>
                                                    Appointments <span className="d-block">Completed</span>
                                                </p>
                                            </div>
                                            <div className="banner-patient">
                                                <div className="avatar-list-stacked avatar-group-sm">
                                                    <span className="avatar avatar-rounded">
                                                        <ImageWithBasePath src="assets/img/patients/patient19.jpg" alt="img" />
                                                    </span>
                                                    <span className="avatar avatar-rounded">
                                                        <ImageWithBasePath src="assets/img/patients/patient16.jpg" alt="img" />
                                                    </span>
                                                    <span className="avatar avatar-rounded">
                                                        <ImageWithBasePath src="assets/img/patients/patient18.jpg" alt="img" />
                                                    </span>
                                                </div>
                                                <p>15K+</p>
                                                <p>Satisfied Patients</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="banner-bg">
                    <ImageWithBasePath
                        src="assets/img/bg/banner-bg-02.png"
                        alt="img"
                        className="banner-bg-01"
                    />
                    <ImageWithBasePath
                        src="assets/img/bg/banner-bg-03.png"
                        alt="img"
                        className="banner-bg-02"
                    />
                    <ImageWithBasePath
                        src="assets/img/bg/banner-bg-04.png"
                        alt="img"
                        className="banner-bg-03"
                    />
                    <ImageWithBasePath
                        src="assets/img/bg/banner-bg-05.png"
                        alt="img"
                        className="banner-bg-04"
                    />
                    <ImageWithBasePath
                        src="assets/img/bg/banner-icon-01.svg"
                        alt="img"
                        className="banner-bg-05"
                    />
                    <ImageWithBasePath
                        src="assets/img/bg/banner-icon-01.svg"
                        alt="img"
                        className="banner-bg-06"
                    />
                </div>
            </section>
            {/* /Home Banner */}
        </>


    )
}

export default HomeBanner
