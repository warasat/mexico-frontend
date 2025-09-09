import Header from "../../header";
import Doctors from "./doctors";
import Footer from "../../footer";
import { useSearchParams, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { specialtiesData } from "../../common/data/specialties";

const SearchDoctor = (props: any) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>('');
  const [selectedDisease, setSelectedDisease] = useState<string>('');
  const selectedSpec = specialtiesData.find((s) => s.specialty === selectedSpeciality) || null;
  
  // Mexican cities for location dropdown (kept consistent)
  const mexicanCities = [
    "Mexico City","Guadalajara","Monterrey","Puebla","Tijuana","León","Cancún","Mérida","Toluca","Querétaro","San Luis Potosí","Chihuahua"
  ];
  // Insurance providers list (kept consistent)
  const insuranceProviders = [
    "Aetna","Anthem Blue Cross Blue Shield","Blue Cross Blue Shield","Cigna","Humana","UnitedHealth","Kaiser Permanente","AARP","Medicare","Medicaid","Tricare","VA Health Care"
  ];
  
  // Specialty mapping from URL parameters to display names
  const specialtyMapping: { [key: string]: string } = {
    "primary-care": "Primary Care Physicians",
    "dentists": "Dentists",
    "obgyn": "OBGYNs",
    "psychologists": "Psychologists",
    "psychiatrists": "Psychiatrists",
    "therapists": "Therapist-Counselors",
    "urgent-care": "Urgent Care",
    "chiropractors": "Chiropractors",
    "optometrists": "Optometrists",
    "ophthalmologists": "Ophthalmologists",
    "podiatrists": "Podiatrists",
    "pediatricians": "Pediatricians",
    "dermatologists": "Dermatologists",
    "orthopedic-surgeons": "Orthopedic Surgeons"
  };
  const disease = searchParams.get('disease');

  return (
    <div className="main-wrapper">
      <Header {...props} />

      {/* Breadcrumb */}
      <div className="breadcrumb-bar overflow-visible">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">
                {(() => {
                  const spec = searchParams.get("specialty");
                  if (spec) {
                    const label = specialtyMapping[spec] || spec;
                    return disease ? `${label} - ${disease}` : `${label} Doctors`;
                  }
                  return "Doctor Grid";
                })()}
              </h2>
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

      {/* Inline Hero-like Search Box (exact landing design, centered width) */}
      <div className="search-box-one aos" data-aos="fade-up" style={{maxWidth: '860px', margin: '0 auto'}}>
        <form onSubmit={(e) => {
          e.preventDefault();
          const spec = selectedSpeciality.trim();
          const disease = selectedDisease.trim();
          if (!spec) return;
          const url = disease
            ? `/patient/search-doctor1?specialty=${encodeURIComponent(spec)}&disease=${encodeURIComponent(disease)}`
            : `/patient/search-doctor1?specialty=${encodeURIComponent(spec)}`;
          navigate(url);
        }}>
          <div className="search-input search-line">
            <i className="isax isax-hospital5 bficon" />
            <div className=" mb-0 position-relative" style={{width: '100%'}}>
              <select
                value={selectedSpeciality}
                onChange={(e) => { setSelectedSpeciality(e.target.value); setSelectedDisease(''); }}
                className="form-control"
                style={{ paddingLeft: '45px' }}
              >
                <option value="">{t('search.searchDoctors') as string}</option>
                {specialtiesData.map((s) => (
                  <option key={s.specialty} value={s.specialty}>{s.specialty}</option>
                ))}
              </select>
              {selectedSpec && (
                <select
                  value={selectedDisease}
                  onChange={(e) => setSelectedDisease(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '45px', marginTop: 8 }}
                >
                  <option value="">Select Condition</option>
                  {selectedSpec.diseases.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="search-input search-map-line">
            <i className="isax isax-location5" />
            <div className=" mb-0">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '45px' }}
              >
                <option value="">{t('maps.location')}</option>
                {mexicanCities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="search-input search-calendar-line">
            <i className="isax isax-shield-tick5 bficon" />
            <div className=" mb-0">
              <select
                value={selectedInsurance}
                onChange={(e) => setSelectedInsurance(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '45px' }}
              >
                <option value="">Insurance</option>
                {insuranceProviders.map((ins, idx) => (
                  <option key={idx} value={ins}>{ins}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-search-btn">
            <button className="btn btn-primary" type="submit">
              <i className="isax isax-search-normal5 me-2" />
              {t('common.search')}
            </button>
          </div>
        </form>
      </div>

      <div className="doctor-content content">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <Doctors />
            </div>
          </div>
        </div>
      </div>

      <Footer {...props} />
    </div>
  );
};

export default SearchDoctor;
