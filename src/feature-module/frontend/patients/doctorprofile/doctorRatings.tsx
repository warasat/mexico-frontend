import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../header'
import Footer from '../../footer'
import ImageWithBasePath from '../../../../components/imageWithBasePath'
import { IMG01, IMG02, IMG07, IMG08, IMG09 } from './img'

const DoctorRatings: React.FC = () => {
  // Sample doctors data with ratings
  const doctors = [
    {
      id: 1,
      name: "Dr. Darren Elder",
      specialty: "Dentist",
      department: "BDS, MDS - Oral & Maxillofacial Surgery",
      rating: 4.0,
      totalReviews: 35,
      image: "assets/img/doctor-grid/doc3.png",
      location: "Guadalajara, Mexico",
      feedback: [
        { id: 1, patient: "Richard Wilson", rating: 4, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus", date: "Reviewed 2 Days ago", image: "assets/img/patients/patient1.jpg" },
        { id: 2, patient: "Charlene Reed", rating: 4, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus", date: "Reviewed 3 Days ago", image: "assets/img/patients/patient2.jpg" },
        { id: 3, patient: "Travis Trimble", rating: 4, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus", date: "Reviewed 4 Days ago", image: "assets/img/patients/patient3.jpg" }
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      specialty: "Psychologist",
      department: "MD - Psychology",
      rating: 4.8,
      totalReviews: 28,
      image: "assets/img/doctor-grid/doc1.png",
      location: "Monterrey, Mexico",
      feedback: [
        { id: 1, patient: "Lisa Anderson", rating: 5, comment: "Very understanding and helpful. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", date: "Reviewed 3 Days ago", image: "assets/img/patients/patient4.jpg" },
        { id: 2, patient: "Robert Taylor", rating: 4, comment: "Good listener and provides great advice. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", date: "Reviewed 1 Week ago", image: "assets/img/patients/patient5.jpg" }
      ]
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      department: "MD - Cardiology",
      rating: 4.6,
      totalReviews: 42,
      image: "assets/img/doctor-grid/doc2.png",
      location: "Puebla, Mexico",
      feedback: [
        { id: 1, patient: "Mark Thompson", rating: 5, comment: "Saved my life! Excellent cardiologist. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", date: "Reviewed 1 Day ago", image: "assets/img/patients/patient6.jpg" },
        { id: 2, patient: "Anna Garcia", rating: 4, comment: "Very thorough and professional. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", date: "Reviewed 1 Week ago", image: "assets/img/patients/patient7.jpg" }
      ]
    }
  ]

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star filled" />)
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt filled" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fas fa-star" />)
    }

    return stars
  }

  return (
    <div className="main-wrapper">
      <Header />
      
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">
                      <i className="isax isax-home-15" />
                    </Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Patient
                  </li>
                  <li className="breadcrumb-item active">Doctor Ratings</li>
                </ol>
                <h2 className="breadcrumb-title">Doctor Ratings & Reviews</h2>
              </nav>
            </div>
          </div>
        </div>
        <div className="breadcrumb-bg">
          <ImageWithBasePath
            src="assets/img/bg/breadcrumb-bg-01.png"
            alt="img"
            className="breadcrumb-bg-01"
          />
          <ImageWithBasePath
            src="assets/img/bg/breadcrumb-bg-02.png"
            alt="img"
            className="breadcrumb-bg-02"
          />
          <ImageWithBasePath
            src="assets/img/bg/breadcrumb-icon.png"
            alt="img"
            className="breadcrumb-bg-03"
          />
          <ImageWithBasePath
            src="assets/img/bg/breadcrumb-icon.png"
            alt="img"
            className="breadcrumb-bg-04"
          />
        </div>
      </div>

      <div className="content">
        <div className="container">
          {/* Doctor Section - Following highlighted doctors design */}
          <section className="doctor-section">
            <div className="container">
              <div
                className="section-header sec-header-one text-center aos"
                data-aos="fade-up"
              >
                <span className="badge badge-primary">Featured Doctors</span>
                <h2>Our Highlighted Doctors</h2>
              </div>
              <div className="row">
                {doctors.map((doctor, index) => (
                  <div key={doctor.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card">
                      <div className="card-img card-img-hover">
                        <Link to="/patient/doctor-profile">
                          <ImageWithBasePath src={doctor.image} alt={doctor.name} />
                        </Link>
                        <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                          <span className="badge bg-orange">
                            <i className="fa-solid fa-star me-1" />
                            {doctor.rating}
                          </span>
                          <Link to="#" className="fav-icon">
                            <i className="fa fa-heart" />
                          </Link>
                        </div>
                      </div>
                      <div className="card-body p-0">
                        <div className={`d-flex active-bar ${index % 2 === 0 ? 'active-bar-pink' : ''} align-items-center justify-content-between p-3`}>
                          <Link to="#" className={`${index % 2 === 0 ? 'text-pink' : 'text-indigo'} fw-medium fs-14`}>
                            {doctor.specialty}
                          </Link>
                          <span className="badge bg-success-light d-inline-flex align-items-center">
                            <i className="fa-solid fa-circle fs-5 me-1" />
                            Available
                          </span>
                        </div>
                        <div className="p-3 pt-0">
                          <div className="doctor-info-detail mb-3 pb-3">
                            <h3 className="mb-1">
                              <Link to="/patient/doctor-profile">{doctor.name}</Link>
                            </h3>
                            <div className="d-flex align-items-center">
                              <p className="d-flex align-items-center mb-0 fs-14">
                                <i className="isax isax-location me-2" />
                                {doctor.location}
                              </p>
                              <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1" />
                              <span className="fs-14 fw-medium">30 Min</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-center">
                            <Link to="/patient/doctor-profile" className="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill text-truncate">
                              View Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews Section - Following exact project design */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body pt-0">
                  <h4 className="card-title mb-4">Doctor Reviews & Ratings</h4>
                  
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="mb-5">
                      {/* Doctor Header */}
                      <div className="d-flex align-items-center mb-4">
                        <ImageWithBasePath src={doctor.image} className="avatar avatar-sm rounded-circle me-3" width="60" height="60" alt={doctor.name} />
                        <div>
                          <h5 className="mb-1">{doctor.name}</h5>
                          <p className="text-muted mb-1">{doctor.specialty}</p>
                          <div className="rating">
                            {renderStars(doctor.rating)}
                            <span className="d-inline-block average-rating ms-1">
                              ({doctor.totalReviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Review Listing - Following exact project structure */}
                      <div className="widget review-listing">
                        <ul className="comments-list">
                          {doctor.feedback.map((review) => (
                            <li key={review.id}>
                              <div className="comment">
                                <ImageWithBasePath
                                  src={review.image}
                                  className="avatar avatar-sm rounded-circle"
                                  alt="User Image"
                                />
                                <div className="comment-body">
                                  <div className="meta-data">
                                    <span className="comment-author">{review.patient}</span>
                                    <span className="comment-date">
                                      {review.date}
                                    </span>
                                    <div className="review-count rating">
                                      {renderStars(review.rating)}
                                    </div>
                                  </div>
                                  <p className="recommended">
                                    <i className="far fa-thumbs-up" /> I recommend the doctor
                                  </p>
                                  <p className="comment-content">
                                    {review.comment}
                                  </p>
                                  <div className="comment-reply">
                                    <p className="recommend-btn">
                                      <span>Recommend?</span>
                                      <Link to="#" className="like-btn">
                                        <i className="far fa-thumbs-up" /> Yes
                                      </Link>
                                      <Link to="#" className="dislike-btn">
                                        <i className="far fa-thumbs-down" /> No
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {doctor.id < doctors.length && <hr className="my-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default DoctorRatings
