import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { all_routes } from "../../../../routes/all_routes";

const Maintenance = () => {
  return (
    <>
      {/* Maintenance */}
      <div className="container-fluid p-0">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
            <div className="col-lg-8 col-md-12 text-center">
              <div className="error-info">
                <div className="error-404-img">
                  <ImageWithBasePath
                    src="assets/img/maintenance.png"
                    className="img-fluid"
                    alt="error-500-image"
                  />
                  <div className="error-content">
                    <h5 className="mb-2">We are Under Maintenance.</h5>
                    <p>
                      Our website is currently undergoing scheduled maintenance,
                      will be right back in a few minutes.
                    </p>
                    <Link
                      to={all_routes.generalHomeOne}
                      className="btn btn-primary-gradient btn-sm"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Maintenance */}
    </>
  );
};

export default Maintenance;
