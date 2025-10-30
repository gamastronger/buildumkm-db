/**
 * Authentication Service - PHP Backend Integration
 * Handle semua API calls terkait autentikasi ke PHP backend
 */

// Tidak perlu base URL, gunakan path relatif agar Vite proxy bekerja
const PHP_BACKEND_URL = '';

/**
 * Helper function untuk fetch dengan credentials
 */
const fetchWithCredentials = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Important untuk session cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} User data
   */
  login: async (credentials) => {
  const response = await fetchWithCredentials(`/auth/login.php`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store user data di localStorage
    if (response.data && response.data.user) {
      localStorage.setItem('buildumkm_user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  /**
   * Register new user
   * @param {Object} userData - { name, email, password, role }
   * @returns {Promise} User data
   */
  register: async (userData) => {
    // register.php is the actual PHP endpoint
  const response = await fetchWithCredentials(`/auth/register.php`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Store user data di localStorage setelah register (auto-login)
    if (response.data && response.data.user) {
      localStorage.setItem('buildumkm_user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  logout: async () => {
    try {
  await fetchWithCredentials(`/auth/logout.php`, {
        method: 'POST',
      });

      // Clear storage
      localStorage.removeItem('buildumkm_user');
    } catch (error) {
      // Tetap clear storage meskipun API error
      localStorage.removeItem('buildumkm_user');
      throw error;
    }
  },

  /**
   * Check session - cek apakah user masih login
   * @returns {Promise} User data
   */
  checkSession: async () => {
    try {
  const response = await fetchWithCredentials(`/auth/check-session.php`, {
        method: 'GET',
      });

      // Update localStorage dengan data terbaru
      if (response.data && response.data.user) {
        localStorage.setItem('buildumkm_user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      // Clear storage jika session tidak valid
      localStorage.removeItem('buildumkm_user');
      throw error;
    }
  },

  /**
   * Get current user dari localStorage
   * @returns {Object|null} User data atau null
   */
  getCurrentUserFromStorage: () => {
    const userStr = localStorage.getItem('buildumkm_user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      localStorage.removeItem('buildumkm_user');
      return null;
    }
  },
};

export default authService;
