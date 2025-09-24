import Header from "../../header";
import Doctors from "./doctors";
import Footer from "../../footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalTranslation } from "../../../../hooks/useGlobalTranslation";
import { specialtiesData } from "../../common/data/specialties";

const SearchDoctor = (props: any) => {
  const navigate = useNavigate();
  const { t } = useGlobalTranslation();
  const [searchParams] = useSearchParams();
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>('');
  const [selectedDisease, setSelectedDisease] = useState<string>('');
  
  // Read URL parameters and set initial form values
  useEffect(() => {
    const specialtyParam = searchParams.get("specialty");
    const cityParam = searchParams.get("city");
    const diseaseParam = searchParams.get("disease");
    
    if (specialtyParam) setSelectedSpeciality(specialtyParam);
    if (cityParam) setSelectedLocation(cityParam);
    if (diseaseParam) setSelectedDisease(diseaseParam);
  }, [searchParams]);
  
  // Mexican cities for location dropdown
  const mexicanCities = [
    "Puerto Vallarta",
    "Mexico City", 
    "Playa del Carmen",
    "Lake Chapala",
    "San Miguel de Allende",
    "Guadalajara"
  ];
  // Insurance providers list (kept consistent)
  const insuranceProviders = [
    "Aetna","Anthem Blue Cross Blue Shield","Blue Cross Blue Shield","Cigna","Humana","UnitedHealth","Kaiser Permanente","AARP","Medicare","Medicaid","Tricare","VA Health Care"
  ];
  

  return (
    <div className="main-wrapper">
      <Header {...props} />


      {/* Hero Section Search Box - Centered on page */}
      <div className="container" style={{paddingTop: '120px', paddingBottom: '80px'}}>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8 col-xxl-6">
            <div className="search-box-one aos" data-aos="fade-up">
              <form
                className="p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const spec = selectedSpeciality.trim();
                  const disease = selectedDisease.trim();
                  if (!spec) return;

                  // User is authenticated as patient, proceed to search
                  const params = new URLSearchParams();
                  params.append('specialty', spec);
                  if (disease) params.append('disease', disease);
                  if (selectedLocation) params.append('city', selectedLocation);
                  
                  navigate(`/patient/search-doctor1?${params.toString()}`);
                }}
              >
                <div className="row flex-row justify-content-center align-items-center">
                  <div className="col-lg-8">
                    <div className="search-input search-map-line">
                      <i className="isax isax-hospital5 bficon" />
                      <div
                        className=" mb-0 position-relative"
                        style={{ width: "100%" }}
                      >
                        <select
                          value={selectedSpeciality}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSelectedSpeciality(val);
                            setSelectedDisease("");
                          }}
                          className="form-control"
                          style={{ paddingLeft: "45px" }}
                        >
                          <option value="">
                            {t("search.searchDoctors") as string}
                          </option>
                          {specialtiesData.map((s) => (
                            <option
                              key={s.specialty}
                              value={s.specialty}
                            >
                              {s.specialty}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="search-input search-map-line">
                      <i className="isax isax-hospital5 bficon" />
                      <div
                        className="mb-0 position-relative"
                        style={{ width: "100%" }}
                      >
                        {selectedSpeciality ? (
                          (() => {
                            const selectedSpecialty =
                              specialtiesData.find(
                                (s) =>
                                  s.specialty === selectedSpeciality
                              );
                            const diseases =
                              selectedSpecialty?.diseases ?? [];
                            return (
                              <select
                                value={selectedDisease}
                                onChange={(e) =>
                                  setSelectedDisease(e.target.value)
                                }
                                className="form-control"
                                style={{ paddingLeft: "45px" }}
                              >
                                <option value="" data-key="patient.search.selectCondition">
                                  {t("patient.search.selectCondition")}
                                </option>
                                {diseases.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                            );
                          })()
                        ) : (
                          <select
                            value={selectedDisease}
                            onChange={(e) =>
                              setSelectedDisease(e.target.value)
                            }
                            className="form-control"
                            style={{ paddingLeft: "45px" }}
                          >
                            <option value="" data-key="patient.search.selectCondition">
                              {t("patient.search.selectCondition")}
                            </option>
                          </select>
                        )}
                      </div>
                    </div>
                    <div className="search-input search-map-line">
                      <i className="isax isax-location5" />
                      <div className=" mb-0">
                        <select
                          value={selectedLocation}
                          onChange={(e) =>
                            setSelectedLocation(e.target.value)
                          }
                          className="form-control"
                          style={{ paddingLeft: "45px" }}
                        >
                          <option value="">
                            {t("maps.location")}
                          </option>
                          {mexicanCities.map((city, idx) => (
                            <option key={idx} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="search-input search-map-line">
                      <i className="isax isax-shield-tick5 bficon" />
                      <div className=" mb-0">
                        <select
                          value={selectedInsurance}
                          onChange={(e) =>
                            setSelectedInsurance(e.target.value)
                          }
                          className="form-control"
                          style={{ paddingLeft: "45px" }}
                        >
                          <option value="">Insurance</option>
                          {insuranceProviders.map(
                            (insurance, idx) => (
                              <option key={idx} value={insurance}>
                                {insurance}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className=" mt-2 form-search-btn">
                      <button
                        className="btn btn-primary"
                        type="submit"
                      >
                        <i className="isax isax-search-normal5 me-2" />
                        {t("common.search")}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
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
