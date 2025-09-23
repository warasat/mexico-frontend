import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserType = 'patient' | 'doctor' | 'admin' | null;

interface AuthState {
  isAuthenticated: boolean;
  userType: UserType;
  user: {
    id: string;
    patientId?: string;
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
}

interface AuthContextType {
  authState: AuthState;
  login: (userType: UserType, user: { id: string; patientId?: string; name: string; email: string }, token?: string) => void;
  logout: () => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userType: null,
    user: null,
    isLoading: true,
  });

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const initializeAuth = () => {
      const storedAuth = localStorage.getItem('auth');
      
      // For new users or if no stored auth, ensure login button is visible
      if (!storedAuth) {
        setAuthState({
          isAuthenticated: false,
          userType: null,
          user: null,
          isLoading: false,
        });
        console.log('New user - Login button should be visible');
        return;
      }
      
      // If stored auth exists, validate it
      try {
        const authData = JSON.parse(storedAuth);
        
        // Validate the auth data structure
        if (authData && typeof authData.isAuthenticated === 'boolean') {
          setAuthState({
            ...authData,
            isLoading: false,
          });
          console.log('Existing user authenticated:', authData.userType);
        } else {
          // Invalid auth data, clear it and show login button
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
          setAuthState({
            isAuthenticated: false,
            userType: null,
            user: null,
            isLoading: false,
          });
          console.log('Invalid auth data cleared - Login button should be visible');
        }
      } catch (error) {
        // Error parsing auth data, clear it and show login button
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        setAuthState({
          isAuthenticated: false,
          userType: null,
          user: null,
          isLoading: false,
        });
        console.log('Auth data error cleared - Login button should be visible');
      }
    };

    // Add a small delay to ensure proper initialization
    const timer = setTimeout(initializeAuth, 50);
    return () => clearTimeout(timer);
  }, []);

  const login = (userType: UserType, user: { id: string; patientId?: string; name: string; email: string }, token?: string) => {
    const newAuthState = {
      isAuthenticated: true,
      userType,
      user,
      isLoading: false,
    };
    setAuthState(newAuthState);
    localStorage.setItem('auth', JSON.stringify(newAuthState));
    
    // Store JWT token if provided
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  const logout = () => {
    const newAuthState = {
      isAuthenticated: false,
      userType: null,
      user: null,
      isLoading: false,
    };
    setAuthState(newAuthState);
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
  };

  const clearAuth = () => {
    const newAuthState = {
      isAuthenticated: false,
      userType: null,
      user: null,
      isLoading: false,
    };
    setAuthState(newAuthState);
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    console.log('Authentication cleared - Login button should now be visible');
  };

  const value = {
    authState,
    login,
    logout,
    clearAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
