const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface DoctorRegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface DoctorLoginData {
  email: string;
  password: string;
}

export interface Doctor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  doctor?: Doctor;
}

class DoctorAuthService {
  async register(data: DoctorRegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/register`, {
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

  async login(data: DoctorLoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/login`, {
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

  // Client-side logout (clears local storage)
  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
  }
}

export default new DoctorAuthService();
