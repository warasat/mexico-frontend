import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'patient' | 'doctor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType
}) => {
  const { authState } = useAuth();
  const { isAuthenticated, userType, isLoading } = authState;
  const location = useLocation();

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

  // If not authenticated, redirect to appropriate login based on the route
  if (!isAuthenticated) {
    // Check the current path to determine which login page to redirect to
    if (location.pathname.startsWith('/doctor/')) {
      return <Navigate to="/doctor/doctor-register" state={{ from: location }} replace />;
    } else if (location.pathname.startsWith('/system-admin/')) {
      return <Navigate to="/system-admin/login" state={{ from: location }} replace />;
    } else {
      return <Navigate to="/pages/patient-signup" state={{ from: location }} replace />;
    }
  }

  // If user type is specified and doesn't match, redirect to appropriate login
  if (requiredUserType && userType !== requiredUserType) {
    switch (requiredUserType) {
      case 'patient':
        return <Navigate to="/pages/patient-signup" state={{ from: location }} replace />;
      case 'doctor':
        return <Navigate to="/doctor/doctor-register" state={{ from: location }} replace />;
      case 'admin':
        return <Navigate to="/system-admin/login" state={{ from: location }} replace />;
      default:
        return <Navigate to="/pages/patient-signup" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;