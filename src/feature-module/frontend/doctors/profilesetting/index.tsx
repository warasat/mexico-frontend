/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "../../header";
import DoctorFooter from "../../common/doctorFooter/index.jsx";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath/index.js";
import CommonTagInputs from "../../common/common-tagInput/commonTagInputs.js";
import DoctorSidebar from "../sidebar/index.js";
import SettingsHeader from "./settingsHeader.js";
import { useAuth } from "../../../../core/context/AuthContext";

const ProfileSetting = (props: any) => {
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;

  // Function to get the appropriate home redirect URL based on user type
  const getHomeRedirectUrl = () => {
    if (isAuthenticated && userType === 'doctor') {
      return '/doctor/doctor-dashboard';
    } else if (isAuthenticated && userType === 'patient') {
      return '/patient/dashboard';
    } else if (isAuthenticated && userType === 'admin') {
      return '/admin/dashboard';
    }
    return '/index'; // Default to landing page for unauthenticated users
  };


  const [tags, setTags] = useState<string[]>(["English", "German", "Portugese"]);
  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };



  return (
    <div>
      <Header {...props} />
      {/* Breadcrumb */}
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={getHomeRedirectUrl()}>
                        <i className="isax isax-home-15" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Doctor
                    </li>
                    <li className="breadcrumb-item active">Doctor Profile</li>
                  </ol>
                  <h2 className="breadcrumb-title">Doctor Profile</h2>
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
      </>

      <>
  {/* Page Content */}
  <div className="content doctor-content">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-xl-3 theiaStickySidebar">
          {/* Profile Sidebar */}
          <DoctorSidebar />
          {/* /Profile Sidebar */}
        </div>
        <div className="col-lg-8 col-xl-9">
          {/* Profile Settings */}
          <div className="dashboard-header">
            <h3>Profile Settings</h3>
          </div>
          {/* Settings List */}
            <SettingsHeader />
          {/* /Settings List */}
          <div className="setting-title">
            <h5>Profile</h5>
          </div>
          <form>
            <div className="setting-card">
              <div className="change-avatar img-upload">
                <div className="profile-img">
                  <i className="fa-solid fa-file-image" />
                </div>
                <div className="upload-img">
                  <h5>Profile Image</h5>
                  <div className="imgs-load d-flex align-items-center">
                    <div className="change-photo">
                      Upload New
                      <input type="file" className="upload" />
                    </div>
                    <Link to="#" className="upload-remove">
                      Remove
                    </Link>
                  </div>
                  <p className="form-text">
                    Your Image should Below 4 MB, Accepted format jpg,png,svg
                  </p>
                </div>
              </div>
            </div>
            <div className="setting-title">
              <h5>Information</h5>
            </div>
            <div className="setting-card">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Display Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Phone Numbers <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., Guadalajara"
                      defaultValue="Guadalajara"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., Jalisco"
                      defaultValue="Jalisco"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Country <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., Mexico"
                      defaultValue="Mexico"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Pincode <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., 44100"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      Known Languages <span className="text-danger">*</span>
                    </label>
                    <div className="input-block input-block-new mb-0">
                        <CommonTagInputs
                            initialTags={tags}
                            onTagsChange={handleTagsChange }/>
                        <Link to="#" className="input-text save-btn">
                          Save
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-gray">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary prime-btn">
                Save Changes
              </button>
            </div>
          </form>
          {/* /Profile Settings */}
        </div>
      </div>
    </div>
  </div>
  {/* /Page Content */}
</>

      <DoctorFooter {...props} />
    </div>
  );
};

export default ProfileSetting;
