import { api } from '../utils/apiClient';
import API_ENDPOINTS from '../config/api.config';

/**
 * Upload Service
 * Handle file upload
 */

export const uploadService = {
  /**
   * Upload image
   * @param {File} file - Image file
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} Image URL
   */
  uploadImage: async (file, onProgress) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.upload(
        API_ENDPOINTS.UPLOAD.IMAGE,
        formData,
        (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) {
            onProgress(percentCompleted);
          }
        }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Upload file
   * @param {File} file - File to upload
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} File URL
   */
  uploadFile: async (file, onProgress) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.upload(
        API_ENDPOINTS.UPLOAD.FILE,
        formData,
        (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) {
            onProgress(percentCompleted);
          }
        }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Validate file before upload
   * @param {File} file - File to validate
   * @returns {Object} { valid: boolean, error: string }
   */
  validateFile: (file) => {
    const maxSize = parseInt(import.meta.env.VITE_MAX_FILE_SIZE || 5) * 1024 * 1024; // Convert MB to bytes
    const allowedTypes = (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(',');

    if (!file) {
      return { valid: false, error: 'No file selected' };
    }

    if (file.size > maxSize) {
      return { valid: false, error: `File size exceeds ${maxSize / (1024 * 1024)}MB` };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
    }

    return { valid: true };
  },
};

export default uploadService;
