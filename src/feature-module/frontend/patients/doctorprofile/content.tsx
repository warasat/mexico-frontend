import { IMG01, IMG02, IMG03, IMG04, IMG07, IMG08, IMG09 } from "./img";

import { Link } from "react-router-dom";
const Content = () => {
  return (
    <div>
      <div className="card">
        <div className="card-body pt-0">
          {/* Tab Menu */}
          <nav className="user-tabs mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="#doc_overview"
                  data-bs-toggle="tab">
                  Overview
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#doc_locations"
                  data-bs-toggle="tab">
                  Locations
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#doc_reviews"
                  data-bs-toggle="tab">
                  Reviews
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
              className="tab-pane fade show active">
              <div className="row">
                <div className="col-md-12 col-lg-9">
                  {/* About Details */}
                  <div className="widget about-widget">
                    <h4 className="widget-title">About Me</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                  {/* /About Details */}
                  {/* Education Details */}
                  <div className="widget education-widget">
                    <h4 className="widget-title">Education</h4>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="#/" className="name">
                                American Dental Medical University
                              </Link>
                              <div>BDS</div>
                              <span className="time">1998 - 2003</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="#/" className="name">
                                American Dental Medical University
                              </Link>
                              <div>MDS</div>
                              <span className="time">2003 - 2005</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Education Details */}
                  {/* Experience Details */}
                  <div className="widget experience-widget">
                    <h4 className="widget-title">Work &amp; Experience</h4>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="#/" className="name">
                                Glowing Smiles Family Dental Clinic
                              </Link>
                              <span className="time">
                                2010 - Present (5 years)
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="#/" className="name">
                                Comfort Care Dental Clinic
                              </Link>
                              <span className="time">
                                2007 - 2010 (3 years)
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="#/" className="name">
                                Dream Smile Dental Practice
                              </Link>
                              <span className="time">
                                2005 - 2007 (2 years)
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Experience Details */}
                  {/* Awards Details */}
                  <div className="widget awards-widget">
                    <h4 className="widget-title">Awards</h4>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <p className="exp-year">July 2019</p>
                              <h4 className="exp-title">Humanitarian Award</h4>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Proin a ipsum tellus. Interdum
                                et malesuada fames ac ante ipsum primis in
                                faucibus.
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <p className="exp-year">March 2011</p>
                              <h4 className="exp-title">
                                Certificate for International Volunteer Service
                              </h4>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Proin a ipsum tellus. Interdum
                                et malesuada fames ac ante ipsum primis in
                                faucibus.
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <p className="exp-year">May 2008</p>
                              <h4 className="exp-title">
                                The Dental Professional of The Year Award
                              </h4>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Proin a ipsum tellus. Interdum
                                et malesuada fames ac ante ipsum primis in
                                faucibus.
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Awards Details */}
                  {/* Services List */}
                  <div className="service-list">
                    <h4>Services</h4>
                    <ul className="clearfix">
                      <li>Tooth cleaning </li>
                      <li>Root Canal Therapy</li>
                      <li>Implants</li>
                      <li>Composite Bonding</li>
                      <li>Fissure Sealants</li>
                      <li>Surgical Extractions</li>
                    </ul>
                  </div>
                  {/* /Services List */}
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
            {/* Locations Content */}
            <div role="tabpanel" id="doc_locations" className="tab-pane fade">
              {/* Map Section */}
              <div className="map-section">
                <div className="row">
                  <div className="col-md-12">
                    <div className="map-container">
                      <h4 className="mb-3">Location</h4>
                      <div className="contact-map">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.7301009561315!2d-76.13077892422932!3d36.82498697224007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89bae976cfe9f8af%3A0xa61eac05156fbdb9!2sBeachStreet%20USA!5e0!3m2!1sen!2sin!4v1669777904208!5m2!1sen!2sin"
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          allowFullScreen
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
            {/* Reviews Content */}
            <div role="tabpanel" id="doc_reviews" className="tab-pane fade">
              {/* Review Listing */}
              <div className="widget review-listing">
                <ul className="comments-list">
                  {/* Comment List */}
                  <li>
                    <div className="comment">
                      <img
                        className="avatar avatar-sm rounded-circle"
                        alt="User Image"
                        src={IMG07}
                      />
                      <div className="comment-body">
                        <div className="meta-data">
                          <span className="comment-author">Richard Wilson</span>
                          <span className="comment-date">
                            Reviewed 2 Days ago
                          </span>
                          <div className="review-count rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star" />
                          </div>
                        </div>
                        <p className="recommended">
                          <i className="far fa-thumbs-up" /> I recommend the
                          doctor
                        </p>
                        <p className="comment-content">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation. Curabitur non nulla sit amet
                          nisl tempus
                        </p>
                        <div className="comment-reply">
                          <Link className="comment-btn" to="#">
                            <i className="fas fa-reply" /> Reply
                          </Link>
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
                    {/* Comment Reply */}
                    <ul className="comments-reply">
                      <li>
                        <div className="comment">
                          <img
                            className="avatar avatar-sm rounded-circle"
                            alt="User Image"
                            src={IMG08}
                          />
                          <div className="comment-body">
                            <div className="meta-data">
                              <span className="comment-author">
                                Charlene Reed
                              </span>
                              <span className="comment-date">
                                Reviewed 3 Days ago
                              </span>
                              <div className="review-count rating">
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star" />
                              </div>
                            </div>
                            <p className="comment-content">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam. Curabitur non nulla sit amet nisl tempus
                            </p>
                            <div className="comment-reply">
                              <Link className="comment-btn" to="#">
                                <i className="fas fa-reply" /> Reply
                              </Link>
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
                    </ul>
                    {/* /Comment Reply */}
                  </li>
                  {/* /Comment List */}
                  {/* Comment List */}
                  <li>
                    <div className="comment">
                      <img
                        className="avatar avatar-sm rounded-circle"
                        alt="User Image"
                        src={IMG09}
                      />
                      <div className="comment-body">
                        <div className="meta-data">
                          <span className="comment-author">Travis Trimble</span>
                          <span className="comment-date">
                            Reviewed 4 Days ago
                          </span>
                          <div className="review-count rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star" />
                          </div>
                        </div>
                        <p className="comment-content">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation. Curabitur non nulla sit amet
                          nisl tempus
                        </p>
                        <div className="comment-reply">
                          <Link className="comment-btn" to="#">
                            <i className="fas fa-reply" /> Reply
                          </Link>
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
                  {/* /Comment List */}
                </ul>
                {/* Show All */}
                <div className="all-feedback text-center">
                  <Link to="#" className="btn btn-primary btn-sm">
                    Show all feedback <strong>(167)</strong>
                  </Link>
                </div>
                {/* /Show All */}
              </div>
              {/* /Review Listing */}
              {/* Write Review */}
              <div className="write-review">
                <h4>
                  Write a review for <strong>Dr. Darren Elder</strong>
                </h4>
                {/* Write Review Form */}
                <form>
                  <div className="form-group">
                    <label>Review</label>
                    <div className="star-rating">
                      <input
                        id="star-5"
                        type="radio"
                        name="rating"
                        defaultValue="star-5"
                      />
                      <label htmlFor="star-5" title="5 stars">
                        <i className="active fa fa-star" />
                      </label>
                      <input
                        id="star-4"
                        type="radio"
                        name="rating"
                        defaultValue="star-4"
                      />
                      <label htmlFor="star-4" title="4 stars">
                        <i className="active fa fa-star" />
                      </label>
                      <input
                        id="star-3"
                        type="radio"
                        name="rating"
                        defaultValue="star-3"
                      />
                      <label htmlFor="star-3" title="3 stars">
                        <i className="active fa fa-star" />
                      </label>
                      <input
                        id="star-2"
                        type="radio"
                        name="rating"
                        defaultValue="star-2"
                      />
                      <label htmlFor="star-2" title="2 stars">
                        <i className="active fa fa-star" />
                      </label>
                      <input
                        id="star-1"
                        type="radio"
                        name="rating"
                        defaultValue="star-1"
                      />
                      <label htmlFor="star-1" title="1 star">
                        <i className="active fa fa-star" />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Title of your review</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="If you could say it in one sentence, what would you say?"
                    />
                  </div>
                  <div className="form-group">
                    <label>Your review</label>
                    <textarea
                      id="review_desc"
                      maxLength={100}
                      className="form-control"
                      defaultValue={""}
                    />
                    <div className="d-flex justify-content-between mt-3">
                      <small className="text-muted">
                        <span id="chars">100</span> characters remaining
                      </small>
                    </div>
                  </div>
                  <hr />
                  <div className="form-group">
                    <div className="terms-accept">
                      <div className="custom-checkbox">
                        <input type="checkbox" id="terms_accept" />
                        <label htmlFor="terms_accept">
                          I have read and accept{" "}
                          <Link to="#">Terms &amp; Conditions</Link>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn">
                      Add Review
                    </button>
                  </div>
                </form>
                {/* /Write Review Form */}
              </div>
              {/* /Write Review */}
            </div>
            {/* /Reviews Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
