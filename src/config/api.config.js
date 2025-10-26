/**
 * API Configuration untuk BuildUMKM
 * Centralized API endpoint management
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://buildumkm.vercel.app/api';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    ME: `${API_BASE_URL}/auth/me`,
  },

  // UMKM
  UMKM: {
    LIST: `${API_BASE_URL}/umkm`,
    CREATE: `${API_BASE_URL}/umkm`,
    DETAIL: (id) => `${API_BASE_URL}/umkm/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/umkm/${id}`,
    DELETE: (id) => `${API_BASE_URL}/umkm/${id}`,
    PROJECTS: (id) => `${API_BASE_URL}/umkm/${id}/projects`,
  },

  // Developer
  DEVELOPER: {
    LIST: `${API_BASE_URL}/developers`,
    CREATE: `${API_BASE_URL}/developers`,
    DETAIL: (id) => `${API_BASE_URL}/developers/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/developers/${id}`,
    DELETE: (id) => `${API_BASE_URL}/developers/${id}`,
    PORTFOLIO: (id) => `${API_BASE_URL}/developers/${id}/portfolio`,
    PROJECTS: (id) => `${API_BASE_URL}/developers/${id}/projects`,
  },

  // Projects
  PROJECTS: {
    LIST: `${API_BASE_URL}/projects`,
    CREATE: `${API_BASE_URL}/projects`,
    DETAIL: (id) => `${API_BASE_URL}/projects/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/projects/${id}`,
    DELETE: (id) => `${API_BASE_URL}/projects/${id}`,
    ASSIGN_DEVELOPER: (id) => `${API_BASE_URL}/projects/${id}/assign`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/projects/${id}/status`,
  },

  // Templates
  TEMPLATES: {
    LIST: `${API_BASE_URL}/templates`,
    CREATE: `${API_BASE_URL}/templates`,
    DETAIL: (id) => `${API_BASE_URL}/templates/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/templates/${id}`,
    DELETE: (id) => `${API_BASE_URL}/templates/${id}`,
    CATEGORIES: `${API_BASE_URL}/templates/categories`,
  },

  // Pricing/Packages
  PACKAGES: {
    LIST: `${API_BASE_URL}/packages`,
    CREATE: `${API_BASE_URL}/packages`,
    DETAIL: (id) => `${API_BASE_URL}/packages/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/packages/${id}`,
    DELETE: (id) => `${API_BASE_URL}/packages/${id}`,
  },

  // Orders/Transactions
  ORDERS: {
    LIST: `${API_BASE_URL}/orders`,
    CREATE: `${API_BASE_URL}/orders`,
    DETAIL: (id) => `${API_BASE_URL}/orders/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/orders/${id}`,
    CANCEL: (id) => `${API_BASE_URL}/orders/${id}/cancel`,
    PAYMENT: (id) => `${API_BASE_URL}/orders/${id}/payment`,
  },

  // Admin
  ADMIN: {
    DASHBOARD_STATS: `${API_BASE_URL}/admin/stats`,
    USERS: `${API_BASE_URL}/admin/users`,
    USER_DETAIL: (id) => `${API_BASE_URL}/admin/users/${id}`,
    UPDATE_USER: (id) => `${API_BASE_URL}/admin/users/${id}`,
    DELETE_USER: (id) => `${API_BASE_URL}/admin/users/${id}`,
    APPROVE_DEVELOPER: (id) => `${API_BASE_URL}/admin/developers/${id}/approve`,
  },

  // Contact
  CONTACT: {
    SEND: `${API_BASE_URL}/contact`,
  },

  // File Upload
  UPLOAD: {
    IMAGE: `${API_BASE_URL}/upload/image`,
    FILE: `${API_BASE_URL}/upload/file`,
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: `${API_BASE_URL}/notifications`,
    MARK_READ: (id) => `${API_BASE_URL}/notifications/${id}/read`,
    MARK_ALL_READ: `${API_BASE_URL}/notifications/read-all`,
  },

  // Reviews/Ratings
  REVIEWS: {
    LIST: (projectId) => `${API_BASE_URL}/projects/${projectId}/reviews`,
    CREATE: (projectId) => `${API_BASE_URL}/projects/${projectId}/reviews`,
    UPDATE: (projectId, reviewId) => `${API_BASE_URL}/projects/${projectId}/reviews/${reviewId}`,
    DELETE: (projectId, reviewId) => `${API_BASE_URL}/projects/${projectId}/reviews/${reviewId}`,
  },
};

export default API_ENDPOINTS;
