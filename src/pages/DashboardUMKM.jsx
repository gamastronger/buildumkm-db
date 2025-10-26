import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  MessageCircle, 
  BookOpen, 
  LogOut,
  User,
  Send,
  X,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const DashboardUMKM = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      message: 'Halo! Saya BumiBot, asisten AI BuildUMKM. Mau konsultasi website untuk bisnismu?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatMessages([...chatMessages, { type: 'user', message: inputMessage }]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: 'Terima kasih! Saya akan membantu Anda. Bisa ceritakan lebih detail tentang bisnis Anda?'
      }]);
    }, 1000);

    setInputMessage('');
  };

  const projects = [
    { id: 1, name: 'Website Batik Siti', status: 'Selesai', progress: 100 },
    { id: 2, name: 'Landing Page Kopi Nusantara', status: 'Dikerjakan', progress: 65 },
  ];

  const templates = [
    { id: 1, name: 'Template Modern', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400' },
    { id: 2, name: 'Template Minimalis', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400' },
    { id: 3, name: 'Template Elegan', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400' },
  ];

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
              <span>Beranda</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
              <FolderOpen className="w-5 h-5" />
              <span>Proyek Saya</span>
            </a>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsChatOpen(true);
              }}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chatbot</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
              <BookOpen className="w-5 h-5" />
              <span>Panduan</span>
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
                  <h2 className="text-2xl font-bold">Batik Siti</h2>
                  <p className="text-purple-100">Ibu Siti Nurhaliza</p>
                  <p className="text-sm text-purple-200 mt-1">Member sejak Januari 2025</p>
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
                  <p className="text-3xl font-bold text-gray-900 mt-1">2</p>
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
                  <p className="text-3xl font-bold text-green-600 mt-1">1</p>
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
                  <p className="text-3xl font-bold text-blue-600 mt-1">1</p>
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
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.status}</p>
                    </div>
                    {project.status === 'Selesai' && (
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
                        Lihat Website Jadi
                      </button>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${project.status === 'Selesai' ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{project.progress}% Selesai</p>
                </div>
              ))}
            </div>
          </div>

          {/* Template Library */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Template Rekomendasi</h3>
              <Link to="/template-library" className="text-purple-600 hover:text-purple-700 font-medium">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="group cursor-pointer">
                  <div className="aspect-video rounded-lg overflow-hidden mb-2">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-medium text-gray-900">{template.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Widget */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">BumiBot</h3>
                  <p className="text-xs text-purple-100">Asisten AI BuildUMKM</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Chatbot Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-50"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default DashboardUMKM;
