import { api } from '../utils/apiClient';
import API_ENDPOINTS from '../config/api.config';

/**
 * Project Service
 * Handle semua API calls terkait projects
 */

export const projectService = {
  /**
   * Get all projects (with filters)
   * @param {Object} params - { page, limit, status, search, etc }
   * @returns {Promise}
   */
  getAll: async (params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.LIST, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get project by ID
   * @param {string} id - Project ID
   * @returns {Promise}
   */
  getById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.DETAIL(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create new project
   * @param {Object} projectData - Project data
   * @returns {Promise}
   */
  create: async (projectData) => {
    try {
      const response = await api.post(API_ENDPOINTS.PROJECTS.CREATE, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update project
   * @param {string} id - Project ID
   * @param {Object} projectData - Updated data
   * @returns {Promise}
   */
  update: async (id, projectData) => {
    try {
      const response = await api.put(API_ENDPOINTS.PROJECTS.UPDATE(id), projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete project
   * @param {string} id - Project ID
   * @returns {Promise}
   */
  delete: async (id) => {
    try {
      const response = await api.delete(API_ENDPOINTS.PROJECTS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Assign developer to project
   * @param {string} id - Project ID
   * @param {string} developerId - Developer ID
   * @returns {Promise}
   */
  assignDeveloper: async (id, developerId) => {
    try {
      const response = await api.post(API_ENDPOINTS.PROJECTS.ASSIGN_DEVELOPER(id), { developerId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update project status
   * @param {string} id - Project ID
   * @param {string} status - New status
   * @returns {Promise}
   */
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(API_ENDPOINTS.PROJECTS.UPDATE_STATUS(id), { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default projectService;
