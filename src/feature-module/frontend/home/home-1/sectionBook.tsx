import React from 'react'
import ImageWithBasePath from '../../../../components/imageWithBasePath'
import { Link } from 'react-router-dom'
import { useGlobalTranslation } from '../../../../hooks/useGlobalTranslation'

const SectionBook: React.FC = () => {
    const { t } = useGlobalTranslation();
    return (
        <>
            {/* Bookus Section */}
            <section className="bookus-section bg-dark">
                <div className="container">
                    <div className="row align-items-center row-gap-4">
                        <div className="col-lg-6">
                            <div className="bookus-img">
                                <div className="row g-3">
                                    <div className="col-md-12 aos" data-aos="fade-up">
                                        <ImageWithBasePath
                                            src="assets/img/book-01.jpg"
                                            alt="img"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-sm-6 aos" data-aos="fade-up">
                                        <ImageWithBasePath
                                            src="assets/img/book-02.jpg"
                                            alt="img"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-sm-6 aos" data-aos="fade-up">
                                        <ImageWithBasePath
                                            src="assets/img/book-03.jpg"
                                            alt="img"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div
                                className="section-header sec-header-one mb-2 aos"
                                data-aos="fade-up"
                            >
                                <span className="badge badge-primary" data-key="home.whyBook.badge">{t("home.whyBook.badge")}</span>
                                <h2 className="text-white mb-3" data-key="home.whyBook.title">
                                    {t("home.whyBook.title")}{" "}
                                    <span className="text-primary-gradient" data-key="home.whyBook.subtitle">
                                        {t("home.whyBook.subtitle")}
                                    </span>
                                </h2>
                            </div>
                            <p className="text-light mb-4" data-key="home.whyBook.description">
                                {t("home.whyBook.description")}
                            </p>
                            <div className="faq-info aos" data-aos="fade-up">
                                <div className="accordion" id="faq-details">
                                    {/* FAQ Item */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <Link
                                                to="#"
                                                className="accordion-button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                <span data-key="home.whyBook.vision.title">{t("home.whyBook.vision.title")}</span>
                                            </Link>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#faq-details"
                                        >
                                            <div className="accordion-body">
                                                <div className="accordion-content">
                                                    <p data-key="home.whyBook.vision.description">
                                                        {t("home.whyBook.vision.description")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /FAQ Item */}
                                    {/* FAQ Item */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <Link
                                                to="#"
                                                className="accordion-button collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-controls="collapseTwo"
                                            >
                                                <span data-key="home.whyBook.mission.title">{t("home.whyBook.mission.title")}</span>
                                            </Link>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo"
                                            data-bs-parent="#faq-details"
                                        >
                                            <div className="accordion-body">
                                                <div className="accordion-content">
                                                    <p data-key="home.whyBook.mission.description">
                                                        {t("home.whyBook.mission.description")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /FAQ Item */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookus-sec">
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <div className="book-item">
                                    <div className="book-icon bg-primary">
                                        <i className="isax isax-search-normal5" />
                                    </div>
                                    <div className="book-info">
                                        <h6 className="text-white mb-2" data-key="home.whyBook.steps.search.title">{t("home.whyBook.steps.search.title")}</h6>
                                        <p className="fs-14 text-light" data-key="home.whyBook.steps.search.description">
                                            {t("home.whyBook.steps.search.description")}
                                        </p>
                                    </div>
                                    <div className="way-icon">
                                        <ImageWithBasePath src="assets/img/icons/way-icon.svg" alt="img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="book-item">
                                    <div className="book-icon bg-orange">
                                        <i className="isax isax-security-user5" />
                                    </div>
                                    <div className="book-info">
                                        <h6 className="text-white mb-2" data-key="home.whyBook.steps.profile.title">{t("home.whyBook.steps.profile.title")}</h6>
                                        <p className="fs-14 text-light" data-key="home.whyBook.steps.profile.description">
                                            {t("home.whyBook.steps.profile.description")}
                                        </p>
                                    </div>
                                    <div className="way-icon">
                                        <ImageWithBasePath src="assets/img/icons/way-icon.svg" alt="img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="book-item">
                                    <div className="book-icon bg-cyan">
                                        <i className="isax isax-calendar5" />
                                    </div>
                                    <div className="book-info">
                                        <h6 className="text-white mb-2" data-key="home.whyBook.steps.schedule.title">{t("home.whyBook.steps.schedule.title")}</h6>
                                        <p className="fs-14 text-light" data-key="home.whyBook.steps.schedule.description">
                                            {t("home.whyBook.steps.schedule.description")}
                                        </p>
                                    </div>
                                    <div className="way-icon">
                                        <ImageWithBasePath src="assets/img/icons/way-icon.svg" alt="img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="book-item">
                                    <div className="book-icon bg-indigo">
                                        <i className="isax isax-blend5" />
                                    </div>
                                    <div className="book-info">
                                        <h6 className="text-white mb-2" data-key="home.whyBook.steps.solution.title">{t("home.whyBook.steps.solution.title")}</h6>
                                        <p className="fs-14 text-light" data-key="home.whyBook.steps.solution.description">
                                            {t("home.whyBook.steps.solution.description")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* /Bookus Section */}
        </>

    )
}

export default SectionBook
