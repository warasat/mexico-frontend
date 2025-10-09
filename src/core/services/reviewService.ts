import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all reviews for a specific doctor
export const getDoctorReviews = async (doctorId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor reviews:', error);
    throw error;
  }
};

// Create a new review
export const createReview = async (doctorId: string, reviewData: {
  rating: number;
  comment: string;
}) => {
  try {
    if (!doctorId) {
      throw new Error('Doctor ID is required');
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found. Please login again.');
    }
    
    console.log('Creating review for doctor:', doctorId, 'with data:', reviewData);
    
    const response = await axios.post(
      `${API_BASE_URL}/reviews/doctor/${doctorId}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating review:', error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to create review. Please try again.');
    }
  }
};

// Update a review
export const updateReview = async (reviewId: string, reviewData: {
  rating?: number;
  comment?: string;
}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_BASE_URL}/reviews/${reviewId}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `${API_BASE_URL}/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};
