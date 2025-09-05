import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Custom hook to handle browser back button behavior ONLY for admin dashboard
 * - Only applies to: http://localhost:5173/react/template/admin
 * - When admin is on this exact URL and clicks back, redirect to admin login
 * - All other routes maintain their original routing behavior
 */
export const useBackButtonHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useAuth();
  const { isAuthenticated, userType } = authState;

  useEffect(() => {
    // Only apply this logic for authenticated admin users
    if (!isAuthenticated || userType !== 'admin') {
      return;
    }

    // Get the current path without the /react/template/ prefix
    const currentPath = location.pathname.replace('/react/template', '') || location.pathname;

    // ONLY target the exact admin dashboard route
    const isOnAdminDashboard = currentPath === '/admin';

    // Only apply back button handling for the exact admin dashboard route
    if (!isOnAdminDashboard) {
      return;
    }

    // Handle browser back button - redirect to admin login
    const handlePopState = () => {
      // Navigate to admin login page
      navigate('/admin/login', { replace: true });
    };

    // Add event listener for popstate (back button)
    window.addEventListener('popstate', handlePopState);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isAuthenticated, userType, location.pathname, navigate]);

  // Additional effect to manipulate browser history
  useEffect(() => {
    // Only apply this logic for authenticated admin users
    if (!isAuthenticated || userType !== 'admin') {
      return;
    }

    // Get the current path without the /react/template/ prefix
    const currentPath = location.pathname.replace('/react/template', '') || location.pathname;

    // ONLY target the exact admin dashboard route
    const isOnAdminDashboard = currentPath === '/admin';

    // Only apply history manipulation for the exact admin dashboard route
    if (isOnAdminDashboard) {
      // Push the admin login route to history so back button goes there
      window.history.pushState(null, '', '/admin/login');
      
      // Immediately navigate back to the current route
      navigate(currentPath, { replace: true });
    }
  }, [isAuthenticated, userType, location.pathname, navigate]);
};
