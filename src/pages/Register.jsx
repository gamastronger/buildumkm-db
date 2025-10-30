import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, ArrowRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok!');
      return;
    }

    // Validasi panjang password
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter!');
      return;
    }

    setLoading(true);

    try {
      // Prepare data untuk register
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: userType, // 'user' atau 'developer'
      };

      const response = await authService.register(registerData);
      
      if (response.user) {
        // Auto login setelah register
        login(response.user);
        
        // Redirect ke dashboard sesuai role
        const redirectPath = userType === 'user' ? '/dashboard-umkm' : '/dashboard-developer';
        navigate(redirectPath);
      }
    } catch (err) {
      setError(err.message || 'Registrasi gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
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
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Bergabung dengan BuildUMKM</h1>
          <p className="text-gray-600">Pilih tipe akun dan lengkapi data Anda</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setUserType('user')}
              className={`p-4 rounded-xl border-2 transition-all ${
                userType === 'user'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <Building className={`w-8 h-8 mx-auto mb-2 ${userType === 'user' ? 'text-purple-600' : 'text-gray-400'}`} />
              <p className={`font-semibold ${userType === 'user' ? 'text-purple-600' : 'text-gray-600'}`}>
                Saya UMKM
              </p>
              <p className="text-xs text-gray-500 mt-1">Butuh website untuk bisnis</p>
            </button>
            <button
              type="button"
              onClick={() => setUserType('developer')}
              className={`p-4 rounded-xl border-2 transition-all ${
                userType === 'developer'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <User className={`w-8 h-8 mx-auto mb-2 ${userType === 'developer' ? 'text-purple-600' : 'text-gray-400'}`} />
              <p className={`font-semibold ${userType === 'developer' ? 'text-purple-600' : 'text-gray-600'}`}>
                Saya Developer
              </p>
              <p className="text-xs text-gray-500 mt-1">Ingin mengerjakan proyek</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="Nama Anda"
                    required
                  />
                </div>
              </div>

              {userType === 'user' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Bisnis (Opsional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                      placeholder="Nama UMKM Anda"
                    />
                  </div>
                </div>
              )}
            </div>

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

            <div className="grid md:grid-cols-2 gap-5">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-start">
                <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600 mt-1" required />
                <span className="ml-2 text-sm text-gray-600">
                  Saya setuju dengan{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                    Syarat & Ketentuan
                  </a>{' '}
                  dan{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                    Kebijakan Privasi
                  </a>
                </span>
              </label>
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
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                Masuk di sini
              </Link>
            </p>
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

export default Register;
