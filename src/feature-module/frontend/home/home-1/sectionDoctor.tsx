import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import { useAuth } from '../../../../core/context/AuthContext';
import SocketService from '../../../../core/services/socketService';
import publicDoctorApi, { type PublicDoctor } from '../../../../core/services/publicDoctorApi';
import { useGlobalTranslation } from '../../../../hooks/useGlobalTranslation';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    image: string;
    location: string;
    available: boolean;
}

const SectionDoctor: React.FC = () => {
    const { authState } = useAuth();
    const { isAuthenticated, userType } = authState;
    const navigate = useNavigate();
    const { t } = useGlobalTranslation();
    const [doctorAvailability, setDoctorAvailability] = useState<{[key: string]: 'available' | 'unavailable'}>({});
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    // Fetch doctors from database using the same API as booking module
    useEffect(() => {
        (async () => {
            try {
                // Use the same API service as the booking module to fetch real doctor profiles
                console.log('Fetching doctors from publicDoctorApi...');
                const res = await publicDoctorApi.list({ sort: 'rank', limit: 8 });
                console.log('API Response:', res);
                console.log('Number of doctors found:', res.results?.length || 0);
                
                const mapped: Doctor[] = res.results.map((d: PublicDoctor, index: number) => ({
                    id: parseInt(d.id) || Math.random(),
                    name: d.displayName,
                    specialty: d.designation || 'Doctor',
                    image: d.image || `/assets/img/doctor-grid/doc${(index % 8) + 1}.png`,
                    location: d.location || '',
                    available: d.availability === 'available',
                }));
                console.log('Mapped doctors:', mapped);
                setDoctors(mapped);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                // Fallback: Use sample doctors if API fails
                const fallbackDoctors: Doctor[] = [
                    { id: 1, name: 'Dr. Elena Rivera', specialty: 'Dentist', image: '/assets/img/doctor-grid/doc1.png', location: 'Puerto Vallarta', available: true },
                    { id: 2, name: 'Dr. Jorge Castro', specialty: 'Cardiologist', image: '/assets/img/doctor-grid/doc2.png', location: 'Mexico City', available: true },
                    { id: 3, name: 'Dr. Fernando Hernández', specialty: 'Dermatologist', image: '/assets/img/doctor-grid/doc3.png', location: 'Playa del Carmen', available: true },
                    { id: 4, name: 'Dr. Jorge López', specialty: 'Pediatrician', image: '/assets/img/doctor-grid/doc4.png', location: 'Lake Chapala', available: true },
                    { id: 5, name: 'Dr. Lucía González', specialty: 'Orthopedic Surgeon', image: '/assets/img/doctor-grid/doc5.png', location: 'San Miguel de Allende', available: true },
                    { id: 6, name: 'Dr. Ana García', specialty: 'Psychologist', image: '/assets/img/doctor-grid/doc6.png', location: 'Guadalajara', available: true },
                    { id: 7, name: 'Dr. Luis Cruz', specialty: 'Psychiatrist', image: '/assets/img/doctor-grid/doc7.png', location: 'Puerto Vallarta', available: true },
                    { id: 8, name: 'Dr. Patricia Martínez', specialty: 'Primary Care Physician', image: '/assets/img/doctor-grid/doc8.png', location: 'Mexico City', available: true },
                ];
                console.log('Using fallback doctors:', fallbackDoctors);
                setDoctors(fallbackDoctors);
            }
        })();
    }, []);

    // Listen for doctor availability updates
    useEffect(() => {
        const socketService = SocketService.getInstance();
        
        const unsubscribe = socketService.subscribe('doctorAvailabilityUpdate', (data: { doctorId: string; availability: 'available' | 'unavailable' }) => {
            setDoctorAvailability(prev => ({
                ...prev,
                [data.doctorId]: data.availability
            }));
            
            // Also update the doctors array
            setDoctors(prevDoctors => 
                prevDoctors.map(doctor => 
                    doctor.id.toString() === data.doctorId 
                        ? { ...doctor, available: data.availability === 'available' }
                        : doctor
                )
            );
        });

        return unsubscribe;
    }, []);

    // Function to get doctor availability
    const getDoctorAvailability = (doctor: Doctor): 'available' | 'unavailable' => {
        const realTimeAvailability = doctorAvailability[doctor.id.toString()];
        if (realTimeAvailability) {
            return realTimeAvailability;
        }
        return doctor.available ? 'available' : 'unavailable';
    };

    // Helper to truncate specialty text
    const truncateSpecialty = (specialty: string): string => {
        return specialty.length > 12 ? specialty.substring(0, 12) + '...' : specialty;
    };

    // Helper to get specialty colors
    const getSpecialtyColor = (specialty: string): string => {
        const key = specialty.toLowerCase();
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
        if (key.includes('obgyn')) return 'text-green';
        return 'text-primary';
    };

    // Helper to get specialty bar class
    const getSpecialtyBarClass = (specialty: string): string => {
        const key = specialty.toLowerCase();
        if (key.includes('psych')) return 'active-bar';
        if (key.includes('pediatric')) return 'active-bar-pink';
        if (key.includes('neuro')) return 'active-bar-teal';
        if (key.includes('cardio')) return 'active-bar-info';
        if (key.includes('denti')) return 'active-bar-purple';
        if (key.includes('obgyn')) return 'active-bar-green';
        if (key.includes('psychiatrist')) return 'active-bar-orange';
        return 'active-bar';
    };

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
                        <span className="badge badge-primary" data-key="home.doctors.badge">{t("home.doctors.badge")}</span>
                        <h2 data-key="home.doctors.title">{t("home.doctors.title")}</h2>
                    </div>
                    <div className="doctors-slider slick-margins slick-arrow-center aos" data-aos="fade-up">
                        <Slider {...Doctoroptions}>
                            {doctors.map((doctor) => (
                                <div key={doctor.id} className="card" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                                    <div className="card-img card-img-hover" style={{height: '250px', overflow: 'hidden'}}>
                                        <Link to="/patient/doctor-profile">
                                            <img 
                                                src={doctor.image}
                                                alt={doctor.name} 
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center top'
                                                }}
                                            />
                                        </Link>
                                    </div>
                                    <div className="card-body p-0" style={{flex: '1', display: 'flex', flexDirection: 'column'}}>
                                        <div className={`d-flex ${getSpecialtyBarClass(doctor.specialty)} align-items-center justify-content-between p-3`}>
                                            <Link to="#" className={`${getSpecialtyColor(doctor.specialty)} fw-medium fs-14`}>
                                                {truncateSpecialty(doctor.specialty)}
                                            </Link>
                                            <span className={`badge ${getDoctorAvailability(doctor) === 'available' ? 'bg-success-light' : 'bg-danger-light'} d-inline-flex align-items-center`}>
                                                <i className="fa-solid fa-circle fs-5 me-1" />
                                                {getDoctorAvailability(doctor) === 'available' ? t("common.available") : t("common.unavailable")}
                                            </span>
                                        </div>
                                        <div className="p-3 pt-0" style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                            <div className="doctor-info-detail mb-3 pb-3">
                                                <h3 className="mb-1">
                                                    <Link to="/patient/doctor-profile">{doctor.name}</Link>
                                                </h3>
                                                <div className="d-flex align-items-center">
                                                    <p className="d-flex align-items-center mb-0 fs-14" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                                        <i className="isax isax-location me-2" />
                                                        {doctor.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <button
                                                    onClick={handleBookNow}
                                                    disabled={getDoctorAvailability(doctor) === 'unavailable'}
                                                    className={`btn btn-md d-inline-flex align-items-center rounded-pill text-truncate ${
                                                        getDoctorAvailability(doctor) === 'available' ? 'btn-dark' : 'btn-secondary'
                                                    }`}
                                                >
                                                    {getDoctorAvailability(doctor) === 'available' ? t("common.bookNow") : t("common.unavailable")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
