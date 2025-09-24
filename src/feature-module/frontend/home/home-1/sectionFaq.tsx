import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalTranslation } from '../../../../hooks/useGlobalTranslation';
const SectionFaq: React.FC = () => {
    const { t } = useGlobalTranslation();
    return (
        <div>
            <section className="faq-section-one">
                <div className="container">
                    <div
                        className="section-header sec-header-one text-center aos"
                        data-aos="fade-up"
                    >
                        <span className="badge badge-primary" data-key="home.faq.badge">{t("home.faq.badge")}</span>
                        <h2 data-key="home.faq.title">{t("home.faq.title")}</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-10 mx-auto">
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
                                                <span data-key="home.faq.question1">{t("home.faq.question1")}</span>
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
                                                    <p data-key="home.faq.answer1">
                                                        {t("home.faq.answer1")}
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
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                <span data-key="home.faq.question2">{t("home.faq.question2")}</span>
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
                                                    <p data-key="home.faq.answer2">
                                                        {t("home.faq.answer2")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /FAQ Item */}
                                    {/* FAQ Item */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <Link
                                                to="#"
                                                className="accordion-button collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                <span data-key="home.faq.question3">{t("home.faq.question3")}</span>
                                            </Link>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingThree"
                                            data-bs-parent="#faq-details"
                                        >
                                            <div className="accordion-body">
                                                <div className="accordion-content">
                                                    <p data-key="home.faq.answer3">
                                                        {t("home.faq.answer3")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /FAQ Item */}
                                    {/* FAQ Item */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFour">
                                            <Link
                                                to="#"
                                                className="accordion-button collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="false"
                                                aria-controls="collapseFour"
                                            >
                                                What if I'm running late for my appointment?
                                            </Link>
                                        </h2>
                                        <div
                                            id="collapseFour"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFour"
                                            data-bs-parent="#faq-details"
                                        >
                                            <div className="accordion-body">
                                                <div className="accordion-content">
                                                    <p>
                                                        If you know you will be late, it's courteous to call the
                                                        doctor's office and inform them. Depending on their policy
                                                        and schedule, they may be able to accommodate you or
                                                        reschedule your appointment.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /FAQ Item */}
                                    {/* FAQ Item */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFive">
                                            <Link
                                                to="#"
                                                className="accordion-button collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                            >
                                                Can I book appointments for family members or dependents?
                                            </Link>
                                        </h2>
                                        <div
                                            id="collapseFive"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFive"
                                            data-bs-parent="#faq-details"
                                        >
                                            <div className="accordion-body">
                                                <div className="accordion-content">
                                                    <p>
                                                        Yes, in many cases, you can book appointments for family
                                                        members or dependents. However, you may need to provide
                                                        their personal information and consent to do so.
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
                </div>
            </section>

        </div>
    )
}

export default SectionFaq
