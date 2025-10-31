import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  History, 
  User, 
  LogOut,
  DollarSign,
  Star,
  Clock,
  Upload,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import authService from '../services/authService';

const DashboardDeveloper = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = React.useState('dashboard');

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

  // Format tanggal bergabung
  const getMemberSince = () => {
    if (!user?.created_at) return 'Baru bergabung';
    const date = new Date(user.created_at);
    const options = { year: 'numeric', month: 'long' };
    return `Member sejak ${date.toLocaleDateString('id-ID', options)}`;
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
            <button
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium w-full transition ${activeMenu === 'dashboard' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveMenu('dashboard')}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium w-full transition ${activeMenu === 'projects' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveMenu('projects')}
            >
              <Briefcase className="w-5 h-5" />
              <span>Proyek Tersedia</span>
            </button>
            <button
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium w-full transition ${activeMenu === 'history' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveMenu('history')}
            >
              <History className="w-5 h-5" />
              <span>Riwayat</span>
            </button>
            <button
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium w-full transition ${activeMenu === 'profile' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveMenu('profile')}
            >
              <User className="w-5 h-5" />
              <span>Profil</span>
            </button>
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
          {/* Render konten sesuai menu aktif */}
          {activeMenu === 'dashboard' && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Developer</h1>
                <p className="text-gray-600">Kelola proyek dan tingkatkan pendapatan Anda</p>
              </div>
              {/* Developer Profile Card */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 text-white mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{user?.name || 'Developer'}</h2>
                      <p className="text-purple-100">{user?.email || ''}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current text-yellow-300" />
                          <span className="text-sm">Belum ada rating</span>
                        </div>
                        <span className="text-sm text-purple-200">{getMemberSince()}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition">
                    Edit Profil
                  </button>
                </div>
              </div>
              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Pendapatan</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">Rp 0</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Proyek Aktif</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">0</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Proyek Selesai</p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">0</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Rating</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">-</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeMenu === 'projects' && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proyek Tersedia</h3>
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Belum ada proyek tersedia</p>
                <p className="text-gray-400 text-sm">Proyek baru akan muncul di sini ketika UMKM membuat permintaan</p>
              </div>
            </div>
          )}
          {activeMenu === 'history' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Riwayat Proyek</h3>
              <div className="text-center py-12">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Belum ada riwayat proyek</p>
                <p className="text-gray-400 text-sm">Riwayat proyek yang selesai akan muncul di sini</p>
              </div>
            </div>
          )}
          {activeMenu === 'profile' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Profil Developer</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name || 'Developer'}</h2>
                  <p className="text-gray-600">{user?.email || ''}</p>
                  <span className="text-sm text-gray-400">{getMemberSince()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardDeveloper;
