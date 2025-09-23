import { Link } from "react-router-dom";
import { useMemo } from "react";

type Props = { doctor?: any };

const Content = ({ doctor: doctorProp }: Props) => {
  const doctor = doctorProp;
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
  return (
    <div>
      <div className="card">
        <div className="card-body pt-0">
          {/* Tab Menu */}
          <nav className="user-tabs mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
              <li className="nav-item">
                <Link
                  className={`nav-link ${typeof window !== 'undefined' && window.location.hash !== '#doc_locations' ? 'active' : ''}`}
                  to="#doc_overview"
                  data-bs-toggle="tab">
                  Overview
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
