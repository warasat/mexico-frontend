import { useEffect, useState } from "react";
import Header from "../../header";
import DoctorFooter from "../../common/doctorFooter/index.jsx";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath/index.js";
import CommonTagInputs from "../../common/common-tagInput/commonTagInputs.js";
import InsuranceTagInputs from "../../common/common-tagInput/insuranceTagInputs";
import DoctorSidebar from "../sidebar/index.js";
import { useAuth } from "../../../../core/context/AuthContext";
import doctorProfileApi from "../../../../core/services/doctorProfileApi";

interface ProfileSettingProps { [key: string]: unknown }
const ProfileSetting = (props: ProfileSettingProps) => {
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


  const [tags, setTags] = useState<string[]>([]);
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
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Basic fields
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [phoneNumbers, setPhoneNumbers] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');
  const [, setProfileImageUrl] = useState<string>('');

  // Load existing profile on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await doctorProfileApi.getMe();
        // Expected: { success: true, doctor: doc | null }
        const doc = res?.doctor;
        if (mounted && doc) {
          setFirstName(doc.firstName || '');
          setLastName(doc.lastName || '');
          setDisplayName(doc.displayName || '');
          setDesignation(doc.designation || '');
          setPhoneNumbers(Array.isArray(doc.phones) ? (doc.phones.filter(Boolean).join(', ')) : '');
          setEmail(doc.email || '');
          setAddress(doc.address?.address || '');
          setCity(doc.address?.city || '');
          setStateName(doc.address?.state || '');
          setCountry(doc.address?.country || '');
          setPincode(doc.address?.pincode || '');
          setExperience(doc.experience || '');
          setSelectedInsurances(Array.isArray(doc.insurances) ? doc.insurances : []);
          setEducation(typeof doc.education === 'string' ? doc.education : '');
          setSpecialtyRank((doc.specialtyRank ?? '').toString());
          setAboutMe(doc.aboutMe || '');
          setTags(Array.isArray(doc.knownLanguages) ? doc.knownLanguages : []);
          setServicesOffered(Array.isArray(doc.servicesOffered) ? doc.servicesOffered : []);
          setProfileImageUrl(doc.profileImage?.url || '');
          setIsEditMode(false);
        }
      } catch {
        // If no profile yet, stay with empty form
      }
    })();
    return () => { mounted = false };
  }, []);

  const handleInsurancesChange = (newInsurances: string[]) => {
    setSelectedInsurances(newInsurances);
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      await doctorProfileApi.updateMe({
        firstName,
        lastName,
        displayName,
        designation,
        phones: phoneNumbers
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean),
        email,
        address: {
          address,
          city,
          state: stateName,
          country,
          pincode,
        },
        experience,
        insurances: selectedInsurances,
        education,
        knownLanguages: tags,
        specialtyRank: Number(specialtyRank) || 0,
        servicesOffered,
        aboutMe,
      });
      // Re-fetch to ensure freshest data is shown
      try {
        const res = await doctorProfileApi.getMe();
        const doc = res?.doctor;
        if (doc) {
          setDisplayName(doc.displayName || displayName);
          setDesignation(doc.designation || designation);
          setTags(Array.isArray(doc.knownLanguages) ? doc.knownLanguages : tags);
          setSelectedInsurances(Array.isArray(doc.insurances) ? doc.insurances : selectedInsurances);
        }
      } catch {
        // ignore refresh errors
      }
      setIsEditMode(false);
      // Notify other components (e.g., sidebar) to refresh
      window.dispatchEvent(new CustomEvent('doctorProfileUpdated'));
    } catch {
      // no-op
    } finally {
      setIsSaving(false);
    }
  };

  const onPrimaryButtonClick = async () => {
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }
    await handleSaveProfile();
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, SVG files are allowed");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      alert("File must be 4MB or smaller");
      return;
    }
    try {
      const res = await doctorProfileApi.uploadImage(file);
      const doc = res?.doctor;
      if (doc?.profileImage?.url) setProfileImageUrl(doc.profileImage.url);
    } catch (err: unknown) {
      let message = 'Failed to upload image';
      if (typeof err === 'object' && err !== null) {
        const maybeMsg = (err as Record<string, unknown>).message;
        if (typeof maybeMsg === 'string') message = maybeMsg;
      }
      alert(message);
    }
  };



  const disabledAll = !isEditMode;

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
                      <input type="file" className="upload" accept="image/jpeg,image/jpg,image/png,image/svg+xml" onChange={onImageChange} disabled={disabledAll} />
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
                    <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={disabledAll} />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={disabledAll} />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Display Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} disabled={disabledAll} />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} disabled={disabledAll} />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Phone Numbers <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="Comma separated" value={phoneNumbers} onChange={(e) => setPhoneNumbers(e.target.value)} disabled={disabledAll} />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabledAll} />
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={disabledAll}
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={disabledAll}
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
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      disabled={disabledAll}
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
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      disabled={disabledAll}
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
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      disabled={disabledAll}
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
                      disabled={disabledAll}
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
                      disabled={disabledAll}
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
                      disabled={disabledAll}
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
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                      disabled={disabledAll}
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

            {/* Education Details Section */}
            <div className="setting-card">
              <h4 className="card-title">Education Details</h4>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Institution Name <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., Harvard Medical School"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Degree <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., MD, PhD, BDS"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Start Year <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="e.g., 2010"
                      min="1950"
                      max="2030"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      End Year <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="e.g., 2014"
                      min="1950"
                      max="2030"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      Description
                    </label>
                    <textarea 
                      className="form-control" 
                      rows={2}
                      placeholder="Additional details about your education..."
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button type="button" className="btn btn-outline-primary">
                    + Add Another Education
                  </button>
                </div>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="setting-card">
              <h4 className="card-title">Work Experience</h4>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Organization/Hospital <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., City General Hospital"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Position/Title <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., Senior Cardiologist"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Start Year <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="e.g., 2015"
                      min="1950"
                      max="2030"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      End Year
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Leave empty if current"
                      min="1950"
                      max="2030"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      Description
                    </label>
                    <textarea 
                      className="form-control" 
                      rows={2}
                      placeholder="Describe your role and responsibilities..."
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button type="button" className="btn btn-outline-primary">
                    + Add Another Experience
                  </button>
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
                            initialTags={servicesOffered}
                            onTagsChange={setServicesOffered}/>
                        <Link to="#" className="input-text save-btn">
                          Save
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Awards & Recognition Section */}
            <div className="setting-card">
              <h4 className="card-title">Awards & Recognition</h4>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Award Title <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., Best Doctor Award"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-wrap">
                    <label className="form-label">
                      Year <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="e.g., 2020"
                      min="1950"
                      max="2030"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      Organization
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., Medical Association"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-wrap">
                    <label className="form-label">
                      Description
                    </label>
                    <textarea 
                      className="form-control" 
                      rows={2}
                      placeholder="Describe the award and its significance..."
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button type="button" className="btn btn-outline-primary">
                    + Add Another Award
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-gray">
                Cancel
              </Link>
              <button type="button" className="btn btn-primary prime-btn" onClick={onPrimaryButtonClick} disabled={isSaving}>
                {isEditMode ? (isSaving ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
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
