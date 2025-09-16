/* eslint-disable no-empty */
import DashboardSidebar from "../sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import Footer from "../../../footer.jsx";
import Header from "../../../header.jsx";
import { DatePicker } from "antd";
import Select from "react-select";
import ImageWithBasePath from "../../../../../components/imageWithBasePath";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import type { Dayjs } from "dayjs";
import patientProfileService, { type PatientProfileDto } from "../../../../../core/services/patientProfileService";
import dayjs from "dayjs";

type Props = Record<string, unknown>;
const Profile: FC<Props> = (props) => {
  const [profile, setProfile] = useState<PatientProfileDto>({});
  const [originalProfile, setOriginalProfile] = useState<PatientProfileDto>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editStateKey = 'patientProfile_isEditing';
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const BloodGroup = useMemo(() => ([
    { value: "", label: "Select" },
    { value: "B+ve", label: "B+ve" },
    { value: "AB+ve", label: "AB+ve" },
    { value: "B-ve", label: "B-ve" },
    { value: "O+ve", label: "O+ve" },
    { value: "O-ve", label: "O-ve" },
  ]), []);

  useEffect(() => {
    (async () => {
      try {
        const res = await patientProfileService.getMe();
        setProfile(res.profile || {});
        setOriginalProfile(res.profile || {});
      } catch (err) { console.error(err); }
    })();
    try { if (sessionStorage.getItem(editStateKey) === '1') setIsEditing(true); } catch {}
  }, []);

  const selectedBlood = useMemo(() => {
    const found = BloodGroup.find(x => x.value === (profile.bloodGroup || ""));
    return found || BloodGroup[0];
  }, [profile.bloodGroup, BloodGroup]);

  const handleChange = (key: keyof PatientProfileDto, value: string) => {
    if (!isEditing) return;
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload: PatientProfileDto = { ...profile };
      const res = await patientProfileService.updateMe(payload);
      setProfile(res.profile || payload);
      setOriginalProfile(res.profile || payload);
      setIsEditing(false);
      try { sessionStorage.removeItem(editStateKey); } catch {}
       
      try { window.dispatchEvent(new CustomEvent('patientProfileUpdated')); } catch {}
    } catch (err) {
      // keep editing state so user can retry
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const onUploadImage = async (file: File) => {
    try {
      const allowed = ["image/jpeg","image/jpg","image/png","image/svg+xml","image/webp","image/gif","image/heic","image/heif"];
      if (!allowed.includes(file.type)) {
        alert('Only JPG, JPEG, PNG, SVG, WEBP, GIF, HEIC/HEIF files are allowed');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        alert('File must be 8MB or smaller');
        return;
      }
      const res = await patientProfileService.uploadImage(file);
      setProfile(res.profile || profile);
    } catch (err) { console.error(err); }
  };

  const GenderOptions = useMemo(() => ([
    { value: '', label: 'Select' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ]), []);

  const selectedGender = useMemo(() => {
    const found = GenderOptions.find(x => x.value === (profile.gender || ''));
    return found || GenderOptions[0];
  }, [profile.gender, GenderOptions]);

  return (
    <div>
      <Header {...props} />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">
                      <i className="isax isax-home-15" />
                    </Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Patient
                  </li>
                  <li className="breadcrumb-item active">Settings</li>
                </ol>
                <h2 className="breadcrumb-title">Settings</h2>
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

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar />
              </StickyBox>
            </div>

            <div className="col-lg-8 col-xl-9">
              <form onSubmit={handleSave} autoComplete="off">
                <nav className="settings-tab mb-1">
                  <ul className="nav nav-tabs-bottom" role="tablist">
                    <li className="nav-item" role="presentation">
                      <Link className="nav-link active" to='/patient/profile'>
                        Profile
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="card">
                  <div className="card-body">
                    <div className="border-bottom pb-3 mb-3">
                      <h5>Profile Settings</h5>
                    </div>
                    <div>
                      <div className="setting-card">
                        <label className="form-label mb-2">Profile Photo</label>
                        <div className="change-avatar img-upload">
                          <div className="profile-img">
                            {profile?.profileImage?.url ? (
                              <img src={profile.profileImage.url} alt="profile" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%' }} />
                            ) : (
                            <i className="fa-solid fa-file-image" />
                            )}
                          </div>
                          <div className="upload-img">
                            <div className="imgs-load d-flex align-items-center">
                              <div className="change-photo">
                                Upload New
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  className="upload"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) onUploadImage(f);
                                  }}
                                  disabled={!isEditing}
                                />
                              </div>
                              <Link to="#" className="upload-remove">
                                Remove
                              </Link>
                            </div>
                            <p>Your Image should Below 4 MB, Accepted format jpg,png,svg</p>
                          </div>
                        </div>
                      </div>
                      <div className="setting-title">
                        <h6>Information</h6>
                      </div>
                      <div className="setting-card">
                        <div className="row">
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                First Name <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" value={profile.firstName || ''} onChange={(e) => handleChange('firstName', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Last Name <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" value={profile.lastName || ''} onChange={(e) => handleChange('lastName', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Gender <span className="text-danger">*</span>
                              </label>
                              <Select className="select" options={GenderOptions} placeholder="Select" isClearable={true} isSearchable={true} value={selectedGender} onChange={(opt: { value?: string } | null) => handleChange('gender', opt?.value || '')} isDisabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Date of Birth <span className="text-danger">*</span>
                              </label>
                              <div className="form-icon">
                                <DatePicker className="form-control datetimepicker" placeholder="dd/mm/yyyy" value={profile.dateOfBirth ? (dayjs(profile.dateOfBirth) as unknown as Dayjs) : null} onChange={(d: Dayjs | null) => handleChange('dateOfBirth', d ? d.format('YYYY-MM-DD') : '')} disabled={!isEditing} />
                                <span className="icon">
                                  <i className="isax isax-calendar-1" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Phone Number <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" value={profile.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Email Address <span className="text-danger">*</span>
                              </label>
                              <input type="email" className="form-control" value={profile.email || ''} onChange={(e) => handleChange('email', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Blood Group <span className="text-danger">*</span>
                              </label>
                              <Select className="select" options={BloodGroup} placeholder="Select Gender" isClearable={true} isSearchable={true} value={selectedBlood} onChange={(opt: { value?: string } | null) => handleChange('bloodGroup', opt?.value || '')} isDisabled={!isEditing} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="setting-title">
                        <h6>Address</h6>
                      </div>
                      <div className="setting-card">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Address <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" value={profile.addressLine || ''} onChange={(e) => handleChange('addressLine', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                City <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" value={profile.city || ''} onChange={(e) => handleChange('city', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                State <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" value={profile.state || ''} onChange={(e) => handleChange('state', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Country <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" value={profile.country || ''} onChange={(e) => handleChange('country', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Pincode <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" value={profile.pincode || ''} onChange={(e) => handleChange('pincode', e.target.value)} disabled={!isEditing} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-btn text-end">
                        {isEditing && (
                          <Link to="#" className="btn btn-md btn-light rounded-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProfile(originalProfile); setIsEditing(false); try { sessionStorage.removeItem('patientProfile_isEditing'); } catch {} }}>
                          Cancel
                        </Link>
                        )}
                        {isEditing ? (
                          <button type="submit" disabled={isSaving} className="btn btn-md btn-primary-gradient rounded-pill">{isSaving ? 'Saving...' : 'Save Changes'}</button>
                        ) : (
                          <button type="button" className="btn btn-md btn-primary-gradient rounded-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(true); try { sessionStorage.setItem('patientProfile_isEditing', '1'); } catch {} }}>Edit</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Profile;
