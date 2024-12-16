import axios from 'axios';

const API_URL = 'http://localhost:8800';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Auth API calls
export const checkAuthStatus = async () => {
  try {
    const response = await api.get('/auth/status');
    return response.data;
  } catch (error) {
    console.error('Auth status check failed:', error);
    return { isAuthenticated: false };
  }
};

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const logout = async () => {
  try {
    await api.get('/auth/logout');
    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Feedback API calls
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/api/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Feedback submission failed:', error);
    throw error;
  }
};

export const getFeedbackByCategory = async (category) => {
  try {
    const response = await api.get(`/api/feedback/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Fetching feedback failed:', error);
    throw error;
  }
};

export const getUserFeedback = async () => {
  try {
    const response = await api.get('/api/feedback/user');
    return response.data;
  } catch (error) {
    console.error('Fetching user feedback failed:', error);
    throw error;
  }
};

export const getFeedbackStats = async () => {
  try {
    const response = await api.get('/api/feedback/stats');
    return response.data;
  } catch (error) {
    console.error('Fetching feedback stats failed:', error);
    throw error;
  }
};
