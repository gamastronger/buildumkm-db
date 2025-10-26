import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { authenticateUser, getRedirectPath } from '../data/dummyUsers';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = authenticateUser(formData.email, formData.password);
      
      if (user) {
        login(user);
        const redirectPath = getRedirectPath(user.role);
        navigate(redirectPath);
      } else {
        setError('Email atau password salah!');
      }
      
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = (email, password) => {
    setFormData({ email, password });
    const user = authenticateUser(email, password);
    if (user) {
      login(user);
      const redirectPath = getRedirectPath(user.role);
      navigate(redirectPath);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              BuildUMKM
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Selamat Datang Kembali!</h1>
          <p className="text-gray-600">Masuk ke akun BuildUMKM Anda</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600" />
                <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
              </label>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Memproses...
                </>
              ) : (
                <>
                  Masuk
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-purple-600 hover:text-purple-700 font-semibold">
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* Quick Access */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">Demo Login Cepat</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('umkm@test.com', 'umkm123')}
                className="w-full px-4 py-3 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100 transition text-left"
              >
                <div className="font-semibold">UMKM Demo</div>
                <div className="text-xs text-purple-500">umkm@test.com / umkm123</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('developer@test.com', 'dev123')}
                className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition text-left"
              >
                <div className="font-semibold">Developer Demo</div>
                <div className="text-xs text-blue-500">developer@test.com / dev123</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin@test.com', 'admin123')}
                className="w-full px-4 py-3 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition text-left"
              >
                <div className="font-semibold">Admin Demo</div>
                <div className="text-xs text-green-500">admin@test.com / admin123</div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-purple-600 transition">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
