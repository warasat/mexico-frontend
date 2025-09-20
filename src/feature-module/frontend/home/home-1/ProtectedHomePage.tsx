import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../core/context/AuthContext';
import GeneralHomeOne from './generalHomeOne';

const ProtectedHomePage: React.FC = () => {
  const { authState } = useAuth();
  const { isAuthenticated, userType, isLoading } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    // If doctor is logged in, redirect to their profile management page
    if (isAuthenticated && userType === 'doctor') {
      navigate('/doctor/profile-setting', { replace: true });
    }
  }, [isAuthenticated, userType, navigate]);

  // Show loading state while authentication is being restored
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If doctor is logged in, don't render the home page (redirect will happen)
  if (isAuthenticated && userType === 'doctor') {
    return null;
  }

  // For non-doctors (patients or unauthenticated users), show the home page
  return <GeneralHomeOne />;
};

export default ProtectedHomePage;
