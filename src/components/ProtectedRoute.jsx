import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

// Component untuk protect route berdasarkan autentikasi
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect ke dashboard sesuai role jika akses tidak diizinkan
    const redirectPaths = {
      'umkm': '/dashboard-umkm',
      'developer': '/dashboard-developer',
      'admin': '/dashboard-admin'
    };
    return <Navigate to={redirectPaths[user.role] || '/'} replace />;
  }

  return children;
};

// Component untuk redirect jika sudah login
export const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (user) {
    const redirectPaths = {
      'umkm': '/dashboard-umkm',
      'developer': '/dashboard-developer',
      'admin': '/dashboard-admin'
    };
    return <Navigate to={redirectPaths[user.role] || '/'} replace />;
  }

  return children;
};
