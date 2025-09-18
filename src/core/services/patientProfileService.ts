const API_BASE_URL = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? (import.meta.env.VITE_API_BASE_URL || 'https://doctor-appointment-system-backend-rho.vercel.app//api')
  : (import.meta.env.VITE_API_BASE_URL_PROD || 'https://doctor-appointment-system-backend-rho.vercel.app/api');

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export interface PatientProfileDto {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // YYYY-MM-DD
  gender?: string;
  phone?: string;
  email?: string;
  bloodGroup?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  profileImage?: { url: string };
}

class PatientProfileService {
  async getMe(): Promise<{ success: boolean; profile: PatientProfileDto & { id?: string } }>{
    const res = await fetch(`${API_BASE_URL}/patients/me`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  }

  async updateMe(payload: PatientProfileDto): Promise<{ success: boolean; profile: PatientProfileDto }>{
    const res = await fetch(`${API_BASE_URL}/patients/me`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  }

  async uploadImage(file: File): Promise<{ success: boolean; profile: PatientProfileDto }>{
    const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('image', file);
    const res = await fetch(`${API_BASE_URL}/patients/me/upload-image`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: form,
    });
    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
  }
}

export default new PatientProfileService();


