import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../../../core/context/AuthContext";
import { getDoctorReviews, createReview } from "../../../../core/services/reviewService";

type Props = { doctor?: any };

const Content = ({ doctor: doctorProp }: Props) => {
  const doctor = doctorProp;
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;
  
  // Review state
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  const aboutText = doctor?.aboutMe || `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.`;
  const services: string[] = Array.isArray(doctor?.servicesOffered) ? doctor.servicesOffered : [];
  const insurances: string[] = Array.isArray(doctor?.insurances) ? doctor.insurances : [];
  const experienceSummary = doctor?.experience || '';
  const mapSrc = useMemo(() => {
    const q = [doctor?.address?.address, doctor?.address?.city, doctor?.address?.state, doctor?.address?.country]
      .filter(Boolean)
      .join(', ');
    const encoded = encodeURIComponent(q || '');
    return `https://maps.google.com/maps?q=${encoded}&z=13&output=embed`;
  }, [doctor]);

  // Fetch reviews when doctor changes
  useEffect(() => {
    if (doctor?.id) {
      console.log('Fetching reviews for doctor ID:', doctor.id);
      fetchReviews();
    } else {
      console.warn('Doctor ID not available:', doctor);
      // Try to get doctor ID from URL or other sources if needed
      const urlParams = new URLSearchParams(window.location.search);
      const doctorIdFromUrl = urlParams.get('doctorId');
      if (doctorIdFromUrl) {
        console.log('Found doctor ID from URL:', doctorIdFromUrl);
        // You could set this as a fallback if needed
      }
    }
  }, [doctor?.id]);

  const fetchReviews = async () => {
    if (!doctor?.id) return;
    
    setLoading(true);
    try {
      const response = await getDoctorReviews(doctor.id);
      if (response.success) {
        setReviews(response.data.reviews);
        setAverageRating(response.data.averageRating);
        setTotalReviews(response.data.totalReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || userType !== 'patient') {
      setReviewError('Please login as a patient to submit a review');
      return;
    }

    if (!newReview.comment.trim()) {
      setReviewError('Please write a comment');
      return;
    }

    if (!doctor?.id) {
      setReviewError('Doctor information not available. Please refresh the page.');
      return;
    }

    setSubmittingReview(true);
    setReviewError('');
    setReviewSuccess('');

    try {
      console.log('Submitting review for doctor ID:', doctor.id);
      const response = await createReview(doctor.id, {
        rating: newReview.rating,
        comment: newReview.comment.trim(),
      });

      if (response.success) {
        setReviewSuccess('Review submitted successfully!');
        setNewReview({ rating: 5, comment: '' });
        // Refresh reviews
        await fetchReviews();
      }
    } catch (error: any) {
      console.error('Review submission error:', error);
      setReviewError(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };
  return (
    <div>
      <div className="card">
        <div className="card-body pt-0">
          {/* Tab Menu */}
          <nav className="user-tabs mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
              <li className="nav-item">
                <Link
                  className={`nav-link ${typeof window !== 'undefined' && window.location.hash !== '#doc_locations' && window.location.hash !== '#doc_reviews' ? 'active' : ''}`}
                  to="#doc_overview"
                  data-bs-toggle="tab">
                  Overview
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${typeof window !== 'undefined' && window.location.hash === '#doc_reviews' ? 'active' : ''}`}
                  to="#doc_reviews"
                  data-bs-toggle="tab">
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${typeof window !== 'undefined' && window.location.hash === '#doc_locations' ? 'active' : ''}`}
                  to="#doc_locations"
                  data-bs-toggle="tab">
                  Locations
                </Link>
              </li>
            </ul>
          </nav>
          {/* /Tab Menu */}
          {/* Tab Content */}
          <div className="tab-content pt-0">
            {/* Overview Content */}
            <div
              role="tabpanel"
              id="doc_overview"
              className={`tab-pane fade ${typeof window !== 'undefined' && window.location.hash !== '#doc_locations' ? 'show active' : ''}`}>
              <div className="row">
                <div className="col-md-12 col-lg-9">
                  {/* About Details */}
                  <div className="widget about-widget">
                    <h4 className="widget-title">About</h4>
                    <p>{aboutText}</p>
                  </div>
                  {/* /About Details */}
                  
                  {/* Experience Summary */}
                  {experienceSummary ? (
                    <div className="widget experience-widget">
                      <h4 className="widget-title">Experience</h4>
                      <div className="experience-box">
                        <ul className="experience-list">
                          <li>
                            <div className="experience-user">
                              <div className="before-circle" />
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <div className="time">{experienceSummary}</div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : null}
                  {/* /Experience Summary */}
                  
                  {/* Services List */}
                  {services.length > 0 && (
                    <div className="service-list">
                      <h4>Services</h4>
                      <ul className="clearfix">
                        {services.map((service: string, index: number) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* /Services List */}
                  {/* Insurance List */}
                  {insurances.length > 0 && (
                    <div className="service-list">
                      <h4>Insurance</h4>
                      <ul className="clearfix">
                        {insurances.map((ins: string, index: number) => (
                          <li key={index}>{ins}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* /Insurance List */}
                  {/* Specializations List */}
                  <div className="service-list">
                    <h4>Specializations</h4>
                    <ul className="clearfix">
                      <li>Children Care</li>
                      <li>Dental Care</li>
                      <li>Oral and Maxillofacial Surgery </li>
                      <li>Orthodontist</li>
                      <li>Periodontist</li>
                      <li>Prosthodontics</li>
                    </ul>
                  </div>
                  {/* /Specializations List */}
                </div>
              </div>
            </div>
            {/* /Overview Content */}
            {/* Reviews Content */}
            <div
              role="tabpanel"
              id="doc_reviews"
              className={`tab-pane fade ${typeof window !== 'undefined' && window.location.hash === '#doc_reviews' ? 'show active' : ''}`}>
              <div className="row">
                <div className="col-md-12">
                  {/* Reviews Summary */}
                  <div className="widget review-widget">
                    <h4 className="widget-title">Reviews</h4>
                    {totalReviews > 0 && (
                      <div className="review-summary">
                        <div className="rating-overview">
                          <div className="rating-number">
                            <div className="rating">{averageRating.toFixed(1)}</div>
                            <div className="rating-stars">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`fas fa-star ${star <= Math.round(averageRating) ? 'filled' : ''}`}
                                />
                              ))}
                            </div>
                            <p className="rating-text">Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Write Review Form */}
                    {isAuthenticated && userType === 'patient' && (
                      <div className="write-review mb-4">
                        <h5>Write a Review</h5>
                        <form onSubmit={handleSubmitReview}>
                          <div className="form-group">
                            <label>Rating</label>
                            <div className="rating-input">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  className={`star-btn ${star <= newReview.rating ? 'active' : ''}`}
                                  onClick={() => setNewReview({ ...newReview, rating: star })}
                                >
                                  <i className="fas fa-star" />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="review-comment">Your Review</label>
                            <textarea
                              id="review-comment"
                              className="form-control"
                              rows={4}
                              value={newReview.comment}
                              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                              placeholder="Share your experience with this doctor..."
                              required
                            />
                          </div>
                          {reviewError && (
                            <div className="alert alert-danger" role="alert">
                              {reviewError}
                            </div>
                          )}
                          {reviewSuccess && (
                            <div className="alert alert-success" role="alert">
                              {reviewSuccess}
                            </div>
                          )}
                          <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                            {submittingReview ? 'Submitting...' : 'Submit Review'}
                          </button>
                        </form>
                      </div>
                    )}

                    {!isAuthenticated && (
                      <div className="alert alert-info" role="alert">
                        Please <Link to="/patient/login">login</Link> as a patient to write a review.
                      </div>
                    )}

                    {/* Reviews List */}
                    <div className="reviews-list">
                      <h5>Patient Reviews</h5>
                      {loading ? (
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : reviews.length > 0 ? (
                        <div className="review-items">
                          {reviews.map((review, index) => (
                            <div key={review._id || index} className="review-item">
                              <div className="review-header">
                                <div className="reviewer-info">
                                  <div className="reviewer-name">{review.patientName}</div>
                                  <div className="review-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <i
                                        key={star}
                                        className={`fas fa-star ${star <= review.rating ? 'filled' : ''}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="review-date">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="review-content">
                                <p>{review.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-reviews">
                          <p>No reviews yet. Be the first to review this doctor!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Reviews Content */}
            {/* Locations Content */}
            <div role="tabpanel" id="doc_locations" className={`tab-pane fade ${typeof window !== 'undefined' && window.location.hash === '#doc_locations' ? 'show active' : ''}`}>
              {/* Map Section */}
              <div className="map-section">
                <div className="row">
                  <div className="col-md-12">
                    <div className="map-container">
                      <h4 className="mb-3">Location</h4>
                      <div className="contact-map">
                        <iframe
                          src={mapSrc}
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Doctor Location Map"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Map Section */}
            </div>
            {/* /Locations Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
