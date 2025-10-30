import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Briefcase, 
  DollarSign, 
  LogOut,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  UserCheck,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import authService from '../services/authService';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Tetap logout di frontend meskipun backend error
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              BuildUMKM
            </span>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-purple-50 text-purple-600 rounded-lg font-medium">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#users" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
              <Users className="w-5 h-5" />
              <span>Manajemen User</span>
            </a>
            <a href="#projects" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
              <Briefcase className="w-5 h-5" />
              <span>Validasi Proyek</span>
            </a>
            <a href="#fees" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
              <DollarSign className="w-5 h-5" />
              <span>Pembagian Fee</span>
            </a>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Selamat datang, {user?.name || 'Admin'} - Kelola seluruh aktivitas platform BuildUMKM</p>
          </div>

          {/* Admin Info Card */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <UserCheck className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name || 'Administrator'}</h2>
                  <p className="text-purple-100">{user?.email || ''}</p>
                  <p className="text-sm text-purple-200 mt-1">Role: Super Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total UMKM</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500 mt-1">Belum ada data</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Developer Aktif</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500 mt-1">Belum ada data</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Proyek Selesai</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500 mt-1">Belum ada data</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Proyek Aktif</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500 mt-1">Belum ada data</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-emerald-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Fee</p>
                  <p className="text-2xl font-bold text-gray-900">Rp 0</p>
                  <p className="text-xs text-gray-500 mt-1">Belum ada data</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div id="users" className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Manajemen Pengguna</h3>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Belum ada pengguna terdaftar</p>
              <p className="text-gray-400 text-sm">User UMKM dan Developer yang mendaftar akan muncul di sini</p>
            </div>
          </div>

          {/* Project Validation */}
          <div id="projects" className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Validasi Proyek</h3>
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Belum ada proyek untuk divalidasi</p>
              <p className="text-gray-400 text-sm">Proyek yang diselesaikan developer akan muncul di sini untuk validasi</p>
            </div>
          </div>

          {/* Fee Distribution */}
          <div id="fees" className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Sistem Pembagian Fee (70% Developer / 30% Platform)</h3>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-purple-900">
                <strong>Skema Pembagian:</strong> Setiap proyek yang selesai, 70% fee akan diterima oleh Developer dan 30% untuk Platform BuildUMKM
              </p>
            </div>
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Belum ada transaksi</p>
              <p className="text-gray-400 text-sm">Riwayat pembagian fee akan muncul di sini setelah ada proyek yang selesai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
