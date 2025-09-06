import Header from '../../header'
import DoctorFooter from '../../common/doctorFooter'
import ImageWithBasePath from '../../../../components/imageWithBasePath'
import { Link } from "react-router-dom";
import { all_routes } from '../../../../routes/all_routes';

const Speciality = (props: any) => {
    return (
        <div>
            <Header {...props} />

            <>
                {/* Breadcrumb */}
                <div className="breadcrumb-bar">
                    <div className="container">
                        <div className="row align-items-center inner-banner">
                            <div className="col-md-12 col-12 text-center">
                                <nav aria-label="breadcrumb" className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to={all_routes.generalHomeOne}>
                                                <i className="isax isax-home-15" />
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">Specialties</li>
                                    </ol>
                                    <h2 className="breadcrumb-title">Specialties</h2>
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
                {/* /Breadcrumb */}
                {/* Specialties */}
                <div className="content doctor-content">
                    <div className="container">
                        {/* Speciality Header */}
                        <div className="speciality-header text-center mb-4">
                            <h3>Medical Specialities</h3>
                            <p>Find doctors by their medical specialities</p>
                        </div>
                        {/* Show Result */}
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between flex-wrap result-wrap gap-3">
                                    <h5>
                                        Showing <span className="text-secondary">124</span> Specialities
                                        For You
                                    </h5>
                                    <div className="d-flex align-items-center flex-wrap gap-3">
                                        <div className="input-block dash-search-input">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Specialities"
                                            />
                                            <span className="search-icon">
                                                <i className="isax isax-search-normal" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Show Result */}
                        <div className="row">
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=orthopedics" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-01.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=orthopedics">Orthopedics</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=orthopedics" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=neurology" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-02.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=neurology">Neurology</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=neurology" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=psychiatry" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-03.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=psychiatry">Psychiatry</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=psychiatry" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=endocrinology" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-04.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=endocrinology">Endocrinology</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=endocrinology" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=pulmonology" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-05.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=pulmonology">Pulmonology</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=pulmonology" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=urology" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-06.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=urology">Urology</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=urology" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=cardiology" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-07.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=cardiology">Cardiology</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=cardiology" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=adult-endocrinology" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-08.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=adult-endocrinology">Adult Endocrinology</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=adult-endocrinology" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=general-medicine" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-09.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=general-medicine">General Medicine</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=general-medicine" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=ent" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-10.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=ent">ENT</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=ent" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=fertility" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-11.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=fertility">Fertility</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=fertility" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card speciality-item">
                                    <div className="card-body p-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to="/patient/doctor-grid?specialty=family-medicine" className="speciality-icon">
                                                    <ImageWithBasePath
                                                        src="assets/img/specialities/speciality-12.svg"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="ms-3">
                                                    <h6 className="mb-1">
                                                        <Link to="/patient/doctor-grid?specialty=family-medicine">Family Medicine</Link>
                                                    </h6>
                                                </div>
                                            </div>
                                            <Link to="/patient/doctor-grid?specialty=family-medicine" className="link-icon">
                                                <i className="isax isax-arrow-right-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="loader-item text-center">
                            
                        </div>
                    </div>
                </div>
                {/* /Specialties */}
            </>

            <DoctorFooter />
        </div>
    )
}

export default Speciality
