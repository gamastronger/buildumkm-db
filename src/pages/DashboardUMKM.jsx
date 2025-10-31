import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  MessageCircle, 
  BookOpen, 
  LogOut,
  User,
  Sparkles
} from 'lucide-react';
import ChatBot from '../components/ChatBot';
import { useAuth } from '../context/useAuth';
import authService from '../services/authService';

const DashboardUMKM = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = React.useState('proyek');
  
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
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium w-full transition ${activeMenu === 'proyek' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveMenu('proyek')}
            >
              <FolderOpen className="w-5 h-5" />
              <span>Proyek Saya</span>
            </button>
            <button
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium w-full transition ${activeMenu === 'chatbot' ? 'bg-purple-50 text-purple-600' : 'text-gray-400 cursor-not-allowed select-none'}`}
              disabled
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chatbot</span>
            </button>
            <button
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium w-full transition ${activeMenu === 'panduan' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => {
                setActiveMenu('panduan');
                navigate('/panduan');
              }}
            >
              <BookOpen className="w-5 h-5" />
              <span>Panduan</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition w-full"
              >
                <Home className="w-5 h-5" />
                <span>Lihat BuildUMKM</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Konten sesuai menu aktif */}
          {activeMenu === 'proyek' && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard UMKM</h1>
                <p className="text-gray-600">Selamat datang kembali! Kelola proyek website Anda di sini.</p>
              </div>
              {/* Profile Card */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 text-white mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{user?.name || 'Pengguna UMKM'}</h2>
                      <p className="text-purple-100">{user?.email || ''}</p>
                      <p className="text-sm text-purple-200 mt-1">{getMemberSince()}</p>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition">
                    Edit Profil
                  </button>
                </div>
              </div>
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Proyek</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Proyek Selesai</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">0</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Dalam Progress</p>
                      <p className="text-3xl font-bold text-blue-600 mt-1">0</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Project Status */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Status Proyek</h3>
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Belum ada proyek</p>
                  <p className="text-gray-400 text-sm mb-6">Mulai proyek pertama Anda dengan memilih template di bawah</p>
                  <button 
                    onClick={() => navigate('/pilihan-tema')}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
                  >
                    Buat Proyek Baru
                  </button>
                </div>
              </div>
              {/* Template Library */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Template Rekomendasi</h3>
                  <button onClick={() => navigate('/pilihan-tema')} className="text-purple-600 hover:text-purple-700 font-medium">
                    Lihat Semua →
                  </button>
                </div>
                <p className="text-gray-500 text-center py-8">
                  Template akan tersedia setelah Anda memulai proyek pertama
                </p>
              </div>
            </>
          )}
          {/* Konten menu Panduan sekarang diarahkan ke halaman /panduan, tidak perlu render di dashboard */}
        </div>
      </div>

      {/* ChatBot Floating Button & Window */}
      <ChatBot />
    </div>
  );
};

export default DashboardUMKM;
