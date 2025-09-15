/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "../../header";
import DoctorFooter from "../../common/doctorFooter/index.jsx";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath/index.js";
import CommonTagInputs from "../../common/common-tagInput/commonTagInputs.js";
import InsuranceTagInputs from "../../common/common-tagInput/insuranceTagInputs";
import DoctorSidebar from "../sidebar/index.js";
import { useAuth } from "../../../../core/context/AuthContext";
import DoctorProfileService from "../../common/services/doctorProfileService";

const ProfileSetting = (props: any) => {
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;

  // Function to get the appropriate home redirect URL based on user type
  const getHomeRedirectUrl = () => {
    if (isAuthenticated && userType === 'doctor') {
      return '/doctor/doctor-dashboard';
    } else if (isAuthenticated && userType === 'patient') {
      return '/index';
    } else if (isAuthenticated && userType === 'admin') {
      return '/admin/dashboard';
    }
    return '/index'; // Default to landing page for unauthenticated users
  };


  const [tags, setTags] = useState<string[]>(["English", "German", "Portugese"]);
  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  // Insurance providers list (same as landing page)
  const insuranceProviders = [
    "Aetna",
    "Anthem Blue Cross Blue Shield",
    "Blue Cross Blue Shield",
    "Cigna",
    "Humana",
    "UnitedHealth",
    "Kaiser Permanente",
    "AARP",
    "Medicare",
    "Medicaid",
    "Tricare",
    "VA Health Care",
    "BCBS Federal Employee Program",
    "Aetna Better Health",
    "AmeriHealth",
    "CareFirst BlueCross BlueShield",
    "Highmark Blue Cross Blue Shield",
    "Independence Blue Cross",
    "Premera Blue Cross",
    "Regence Blue Cross Blue Shield",
    "SelectHealth",
    "WellCare",
    "Molina Healthcare",
    "Centene",
    "Bright Health",
    "Oscar Health",
    "Ambetter",
    "Health Net",
    "Anthem",
    "Empire Blue Cross",
    "Blue Cross of California",
    "Blue Cross of Texas",
    "Blue Cross of Illinois",
    "Blue Cross of Michigan",
    "Blue Cross of Massachusetts",
    "Blue Cross of New York",
    "Blue Cross of Florida",
    "Blue Cross of Georgia",
    "Blue Cross of North Carolina",
    "Blue Cross of Pennsylvania",
    "Blue Cross of Ohio",
    "Blue Cross of Indiana",
    "Blue Cross of Wisconsin",
    "Blue Cross of Minnesota",
    "Blue Cross of Colorado",
    "Blue Cross of Arizona",
    "Blue Cross of Nevada",
    "Blue Cross of Oregon",
    "Blue Cross of Washington",
    "Blue Cross of Maryland"
  ];

  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [specialtyRank, setSpecialtyRank] = useState<string>('');

  const handleInsurancesChange = (newInsurances: string[]) => {
    setSelectedInsurances(newInsurances);
  };

  const handleSaveProfile = () => {
    // Save the doctor profile data
    const doctorProfileService = DoctorProfileService.getInstance();
    const currentDoctorId = "1"; // This should be the actual logged-in doctor's ID
    
    doctorProfileService.updateDoctorProfile(currentDoctorId, {
      id: currentDoctorId,
      name: "Dr. Current User", // This should be the actual doctor's name
      selectedInsurances: selectedInsurances,
      experience: experience,
      education: education,
      languages: tags,
      specialtyRank: Number(specialtyRank) || 0
    });
    
    console.log("Profile saved:", {
      insurances: selectedInsurances,
      experience: experience,
      education: education,
      languages: tags,
      specialtyRank: Number(specialtyRank) || 0
    });
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
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Experience <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., 10+ years"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      Insurance <span className="text-danger">*</span>
                    </label>
                    <div className="input-block input-block-new mb-0">
                      <InsuranceTagInputs
                        initialTags={selectedInsurances}
                        onTagsChange={handleInsurancesChange}
                        insuranceOptions={insuranceProviders}
                      />
                      <Link to="#" className="input-text save-btn">
                        Save
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Education <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., MD, PhD, BDS"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Specialty Rank
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="e.g., 1 (higher shows first)"
                      value={specialtyRank}
                      onChange={(e) => setSpecialtyRank(e.target.value)}
                      min={0}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      About Me <span className="text-danger">*</span>
                    </label>
                    <textarea 
                      className="form-control" 
                      rows={4}
                      placeholder="Tell patients about yourself, your experience, and approach to care..."
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



            {/* Services Section */}
            <div className="setting-card">
              <h4 className="card-title">Services Offered</h4>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      Medical Services <span className="text-danger">*</span>
                    </label>
                    <div className="input-block input-block-new mb-0">
                        <CommonTagInputs
                            initialTags={["General Consultation", "Health Checkup"]}
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
              <button type="button" className="btn btn-primary prime-btn" onClick={handleSaveProfile}>
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
