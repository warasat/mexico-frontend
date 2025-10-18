const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ForgotPasswordRequest {
  email: string;
  userType?: 'patient' | 'doctor' | 'admin';
}

export interface VerifyResetCodeRequest {
  email: string;
  code: string;
  userType?: 'patient' | 'doctor' | 'admin';
}

export interface ResetPasswordRequest {
  email: string;
  resetToken: string;
  newPassword: string;
  userType?: 'patient' | 'doctor' | 'admin';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface VerifyResetCodeResponse {
  success: boolean;
  canReset: boolean;
  resetToken?: string;
  message: string;
}

class PasswordResetService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyResetCode(data: VerifyResetCodeRequest): Promise<VerifyResetCodeResponse> {
    return this.makeRequest<VerifyResetCodeResponse>('/auth/verify-reset-code', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

const passwordResetService = new PasswordResetService();
export default passwordResetService;
