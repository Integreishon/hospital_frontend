import api from './api';

const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await api.get('/auth/me');
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Request password reset
  async requestPasswordReset(email) {
    try {
      return await api.post('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  },

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      return await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
};

export default authService; 