import React from 'react'
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../../components/imageWithBasePath';
import { useGlobalTranslation } from '../../../../hooks/useGlobalTranslation';
const Footer: React.FC = () => {
  const { t } = useGlobalTranslation();
  return (
    <div>
      <>
        {/* Footer Section */}
        <footer className="footer inner-footer footer-info">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-3 col-md-3">
                      <div className="footer-widget footer-menu">
                        <h6 className="footer-title" data-key="footer.company.title">{t("footer.company.title")}</h6>
                        <ul>
                          <li>
                            <Link to="/pages/about-us" data-key="footer.company.about">{t("footer.company.about")}</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1" data-key="footer.company.features">{t("footer.company.features")}</Link>
                          </li>
                          <li>
                            <Link to="#" data-key="footer.company.works">{t("footer.company.works")}</Link>
                          </li>
                          <li>
                            <Link to="#" data-key="footer.company.careers">{t("footer.company.careers")}</Link>
                          </li>
                          <li>
                            <Link to="#" data-key="footer.company.locations">{t("footer.company.locations")}</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                      <div className="footer-widget footer-menu">
                        <h6 className="footer-title" data-key="footer.treatments.title">{t("footer.treatments.title")}</h6>
                        <ul>
                          <li>
                            <Link to="/patient/search-doctor1" data-key="footer.treatments.dental">{t("footer.treatments.dental")}</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1" data-key="footer.treatments.cardiac">{t("footer.treatments.cardiac")}</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1" data-key="footer.treatments.spinal">{t("footer.treatments.spinal")}</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1">Hair Growth</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1">Anemia &amp; Disorder</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                      <div className="footer-widget footer-menu">
                        <h6 className="footer-title">Specialities</h6>
                        <ul>
                          <li>
                            <Link to="/patient/search-doctor1">Transplant</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1">Cardiologist</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1">Oncology</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1">Pediatrics</Link>
                          </li>
                          <li>
                            <Link to="/patient/search-doctor1">Gynacology</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                      <div className="footer-widget footer-menu">
                        <h6 className="footer-title">Utilites</h6>
                        <ul>
                          <li>
                            <Link to="/pages/pricing">Pricing</Link>
                          </li>
                          <li>
                            <Link to="/pages/contact-us">Contact</Link>
                          </li>
                          <li>
                            <Link to="/pages/contact-us">Request A Quote</Link>
                          </li>
                          <li>
                            <Link to="#">Premium Membership</Link>
                          </li>
                          <li>
                            <Link to="#">Integrations</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-7">
                  <div className="footer-widget">
                    <h6 className="footer-title">Newsletter</h6>
                    <p className="mb-2">
                      Subscribe &amp; Stay Updated from the Doccure
                    </p>
                    <div className="subscribe-input">
                      <form action="#">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email Address"
                        />
                        <button
                          type="submit"
                          className="btn btn-md btn-primary-gradient d-inline-flex align-items-center"
                        >
                          <i className="isax isax-send-25 me-1" />
                          Send
                        </button>
                      </form>
                    </div>
                    <div className="social-icon">
                      <h6 className="mb-3">Connect With Us</h6>
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-facebook" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-x-twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-instagram" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-linkedin" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-pinterest" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bg">
              <ImageWithBasePath
                src="assets/img/bg/footer-bg-01.png"
                alt="img"
                className="footer-bg-01"
              />
              <ImageWithBasePath
                src="assets/img/bg/footer-bg-02.png"
                alt="img"
                className="footer-bg-02"
              />
              <ImageWithBasePath
                src="assets/img/bg/footer-bg-03.png"
                alt="img"
                className="footer-bg-03"
              />
              <ImageWithBasePath
                src="assets/img/bg/footer-bg-04.png"
                alt="img"
                className="footer-bg-04"
              />
              <ImageWithBasePath
                src="assets/img/bg/footer-bg-05.png"
                alt="img"
                className="footer-bg-05"
              />
            </div>
          </div>
        </footer>
        {/* /Footer Section */}
      </>

    </div>
  )
}

export default Footer
