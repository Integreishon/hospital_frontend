import api from './api';

/**
 * Service functions for authentication.
 */
export const authService = {
  /**
   * Logs in a user.
   * @param {string} username - The user's username (DNI or email).
   * @param {string} password - The user's password.
   * @returns {Promise<object>} The server response, typically includes a token and user data.
   */
  async login(username, password) {
    try {
      const response = await api.post('/auth/login', { username, password });
      // The response from the backend is wrapped in a generic ApiResponse
      // The actual data (AuthResponse) is in the `data` property.
      if (response && response.data) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        return response.data;
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      // The api helper throws an error with the message from the backend on non-ok responses
      console.error('Login failed:', error);
      throw error;
    }
  },

  /**
   * Logs out the current user.
   */
  logout() {
    // Simply remove the token from localStorage
    localStorage.removeItem('token');
  },

  /**
   * Gets the currently authenticated user from localStorage.
   * This is a placeholder and should be replaced with a call to a /profile or /me endpoint.
   */
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    // In a real app, you would decode the token to get user info or call an endpoint
    // For now, we just know a token exists. The AuthContext will hold the full user object.
    return { token };
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