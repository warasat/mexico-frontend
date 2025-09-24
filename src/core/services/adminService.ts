const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export interface DashboardStats {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}

export interface MonthlyStat {
  month: string;
  doctors: number;
  patients: number;
  appointments: number;
}

export interface MonthlyStatsResponse {
  success: boolean;
  data: MonthlyStat[];
}

export interface Doctor {
  id: string;
  DoctorName: string;
  Speciality: string;
  image: string;
  Date: string;
  time: string;
  createdAt?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalDoctors: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface DoctorsListResponse {
  success: boolean;
  data: Doctor[];
  pagination: PaginationInfo;
}

export interface Patient {
  id: string;
  PatientID: string;
  PatientName: string;
  Age: string;
  Address: string;
  Phone: string;
  profileImage: string;
  LastVisit: string;
  LastVisitTime: string;
  Date: string;
  time: string;
}

export interface PatientsListResponse {
  success: boolean;
  data: Patient[];
  pagination: PaginationInfo;
}

export interface AppointmentData {
  id: string;
  DoctorName: string;
  Speciality: string;
  PatientName: string;
  AppointmentTime: string;
  Date: string;
  Status: string;
  DoctorProfileImage: string;
  PatientProfileImage: string;
  CreatedAt: string;
  time: string;
}

export interface AppointmentsListResponse {
  success: boolean;
  data: AppointmentData[];
  pagination: PaginationInfo;
}

class AdminService {
  async getDashboardStats(): Promise<DashboardStatsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  async getMonthlyStats(): Promise<MonthlyStatsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/monthly-stats`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
      throw error;
    }
  }

  async getDoctorsList(page: number = 1, limit: number = 10): Promise<DoctorsListResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/doctors?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching doctors list:', error);
      throw error;
    }
  }

  async getPatientsList(page: number = 1, limit: number = 10): Promise<PatientsListResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/patients?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching patients list:', error);
      throw error;
    }
  }

  async getAppointmentsList(page: number = 1, limit: number = 10): Promise<AppointmentsListResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/appointments?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching appointments list:', error);
      throw error;
    }
  }
}

export default new AdminService();
