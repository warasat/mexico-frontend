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
}

interface AuthContextType {
  authState: AuthState;
  login: (userType: UserType, user: { id: string; patientId?: string; name: string; email: string }, token?: string) => void;
  logout: () => void;
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
  });

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setAuthState(authData);
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = (userType: UserType, user: { id: string; patientId?: string; name: string; email: string }, token?: string) => {
    const newAuthState = {
      isAuthenticated: true,
      userType,
      user,
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
    };
    setAuthState(newAuthState);
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
  };

  const value = {
    authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
