import { api } from '../utils/apiClient';
import API_ENDPOINTS from '../config/api.config';

/**
 * Authentication Service
 * Handle semua API calls terkait autentikasi
 */

export const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} User data dan token
   */
  login: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const { user, token, refreshToken } = response.data;

      // Store token dan user data
      localStorage.setItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || 'buildumkm_token', token);
      localStorage.setItem(import.meta.env.VITE_AUTH_STORAGE_KEY || 'buildumkm_user', JSON.stringify(user));
      
      if (refreshToken) {
        localStorage.setItem('buildumkm_refresh_token', refreshToken);
      }

      return { user, token };
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - { name, email, password, role, businessName, etc }
   * @returns {Promise} User data
   */
  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      
      // Clear storage
      localStorage.removeItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || 'buildumkm_token');
      localStorage.removeItem(import.meta.env.VITE_AUTH_STORAGE_KEY || 'buildumkm_user');
      localStorage.removeItem('buildumkm_refresh_token');
    } catch (error) {
      // Tetap clear storage meskipun API error
      localStorage.removeItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || 'buildumkm_token');
      localStorage.removeItem(import.meta.env.VITE_AUTH_STORAGE_KEY || 'buildumkm_user');
      localStorage.removeItem('buildumkm_refresh_token');
      
      throw error.response?.data || error;
    }
  },

  /**
   * Get current user data
   * @returns {Promise} User data
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Refresh token
   * @returns {Promise} New token
   */
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('buildumkm_refresh_token');
      const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
      
      const { token } = response.data;
      localStorage.setItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || 'buildumkm_token', token);
      
      return token;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Verify email
   * @param {string} token - Verification token
   * @returns {Promise}
   */
  verifyEmail: async (token) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Forgot password
   * @param {string} email - User email
   * @returns {Promise}
   */
  forgotPassword: async (email) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Reset password
   * @param {Object} data - { token, newPassword }
   * @returns {Promise}
   */
  resetPassword: async (data) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default authService;
