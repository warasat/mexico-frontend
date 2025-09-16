const API_BASE_URL = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? 'http://localhost:5000/api'
  : 'https://doctor-appointment-system-backend-rho.vercel.app/api';

export interface PatientRegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface PatientLoginData {
  email: string;
  password: string;
}

export interface Patient {
  id: string;
  patientId?: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  patient?: Patient;
}

class PatientAuthService {
  async register(data: PatientRegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      return result;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(data: PatientLoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

export default new PatientAuthService();
