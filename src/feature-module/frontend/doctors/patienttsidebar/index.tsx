import React, { useState, useEffect } from "react";
import IMG01 from "../../../../assets/img/patients/patient.jpg";
import IMG02 from "../../../../assets/img/doctors/doctor-thumb-02.jpg";
import { Link } from "react-router-dom";

const PatientSidebar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading patient data
    const loadPatientData = async () => {
      try {
        // In a real implementation, this would fetch actual patient data
        // For now, we'll use loading state to prevent showing dummy data
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    loadPatientData();
  }, []);

  return (
    <>
      <div className="card widget-profile pat-widget-profile">
        <div className="card-body">
          <div className="pro-widget-content">
            <div className="profile-info-widget">
              <Link to="#" className="booking-doc-img">
                <img src={IMG01} alt="User" />
              </Link>
              <div className="profile-det-info">
                <h3>
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '120px'}}></div>
                  ) : (
                    'Patient Name'
                  )}
                </h3>

                <div className="patient-details">
                  <h5>
                    <b>Patient ID :</b> 
                    {isLoading ? (
                      <span className="placeholder-text" style={{height: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '60px', display: 'inline-block', marginLeft: '5px'}}></span>
                    ) : (
                      'Loading...'
                    )}
                  </h5>
                  <h5 className="mb-0">
                    <i className="fas fa-map-marker-alt"></i> 
                    {isLoading ? (
                      <span className="placeholder-text" style={{height: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '100px', display: 'inline-block', marginLeft: '5px'}}></span>
                    ) : (
                      'Loading...'
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-info">
            <ul>
              <li>
                Phone 
                {isLoading ? (
                  <span className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '80px', display: 'inline-block', marginLeft: '5px'}}></span>
                ) : (
                  <span>Loading...</span>
                )}
              </li>
              <li>
                Age 
                {isLoading ? (
                  <span className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '60px', display: 'inline-block', marginLeft: '5px'}}></span>
                ) : (
                  <span>Loading...</span>
                )}
              </li>
              <li>
                Blood Group 
                {isLoading ? (
                  <span className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '40px', display: 'inline-block', marginLeft: '5px'}}></span>
                ) : (
                  <span>Loading...</span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Last Booking */}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Last Booking</h4>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="media align-items-center d-flex">
              <div className="me-3 flex-shrink-0">
                <img
                  alt="Image placeholder"
                  src={IMG02}
                  className="avatar  rounded-circle"
                />
              </div>
              <div className="media-body flex-grow-1">
                <h5 className="d-block mb-0">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '100px'}}></div>
                  ) : (
                    'Loading...'
                  )}
                </h5>
                <span className="d-block text-sm text-muted">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '60px'}}></div>
                  ) : (
                    'Loading...'
                  )}
                </span>
                <span className="d-block text-sm text-muted">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '80px'}}></div>
                  ) : (
                    'Loading...'
                  )}
                </span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="media align-items-center d-flex">
              <div className="me-3 flex-shrink-0">
                <img
                  alt="Image placeholder"
                  src={IMG02}
                  className="avatar  rounded-circle"
                />
              </div>
              <div className="media-body flex-grow-1">
                <h5 className="d-block mb-0">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '100px'}}></div>
                  ) : (
                    'Loading...'
                  )}
                </h5>
                <span className="d-block text-sm text-muted">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '60px'}}></div>
                  ) : (
                    'Loading...'
                  )}
                </span>
                <span className="d-block text-sm text-muted">
                  {isLoading ? (
                    <div className="placeholder-text" style={{height: '14px', backgroundColor: '#f8f9fa', borderRadius: '4px', width: '80px'}}></div>
                  ) : (
                    'Loading...'
                  )}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* /Last Booking */}
    </>
  );
};

export default PatientSidebar;
