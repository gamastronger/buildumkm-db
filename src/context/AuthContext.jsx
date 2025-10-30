import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import authService from '../services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user dari localStorage dan verify session saat aplikasi pertama kali dimuat
  useEffect(() => {
    const initAuth = async () => {
      // Coba ambil dari localStorage dulu
      const storedUser = authService.getCurrentUserFromStorage();
      
      if (storedUser) {
        setUser(storedUser);
        
        // Verify session dengan backend
        try {
          const response = await authService.checkSession();
          if (response.user) {
            setUser(response.user);
          }
        } catch (error) {
          // Session tidak valid, clear user
          console.error('Session verification failed:', error);
          setUser(null);
          localStorage.removeItem('buildumkm_user');
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('buildumkm_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('buildumkm_user');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('buildumkm_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    isUMKM: user?.role === 'user',
    isDeveloper: user?.role === 'developer',
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth dipindah ke file terpisah agar tidak error Fast Refresh
