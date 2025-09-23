const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Appointment {
  _id: string;
  appointmentId: string;
  bookingId: string;
  doctor: {
    _id: string;
    name: string;
    specialty: string;
    imageUrl: string;
    location: string;
  };
  patient: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    profileImage?: string;
  };
  doctorName: string;
  patientName: string;
  date: string;
  timeSlot: string;
  location: string;
  insurance?: string;
  service: string;
  mode: 'video' | 'clinic';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  cancelled: boolean;
  isCompleted: boolean;
  patientEmail?: string;
  patientPhone?: string;
  symptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentRequest {
  doctorId: string;
  patientId: string;
  date: string;
  timeSlot: string;
  location: string;
  insurance?: string;
  service: string;
  mode: 'video' | 'clinic';
  patientEmail?: string;
  patientPhone?: string;
  symptoms?: string;
  notes?: string;
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  data: Appointment;
}

export interface AppointmentsListResponse {
  success: boolean;
  count: number;
  data: Appointment[];
}

class AppointmentService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<AppointmentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create appointment');
      }

      return result;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  async getMyAppointments(): Promise<AppointmentsListResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/me`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch appointments');
      }

      return result;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  async getDoctorAppointments(): Promise<AppointmentsListResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/doctor/me`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch doctor appointments');
      }

      return result;
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      throw error;
    }
  }

  async getAppointmentById(appointmentId: string): Promise<AppointmentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch appointment');
      }

      return result;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }
  }

  async updateAppointmentStatus(appointmentId: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed'): Promise<AppointmentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update appointment status');
      }

      return result;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  }

  async cancelAppointment(appointmentId: string): Promise<AppointmentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/cancel`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to cancel appointment');
      }

      return result;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  }
}

export const appointmentService = new AppointmentService();
