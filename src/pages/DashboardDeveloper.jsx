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

const DashboardDeveloper = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const availableProjects = [
    {
      id: 1,
      title: 'Landing Page Kuliner Nusantara',
      description: 'Dibutuhkan landing page untuk bisnis kuliner dengan menu online',
      fee: 'Rp 1.500.000',
      deadline: '7 hari',
      difficulty: 'Mudah'
    },
    {
      id: 2,
      title: 'Website E-commerce Batik',
      description: 'Website toko online untuk produk batik dengan katalog produk',
      fee: 'Rp 2.500.000',
      deadline: '14 hari',
      difficulty: 'Menengah'
    },
    {
      id: 3,
      title: 'Portfolio Kerajinan Tangan',
      description: 'Website portfolio untuk menampilkan produk kerajinan tangan',
      fee: 'Rp 1.200.000',
      deadline: '5 hari',
      difficulty: 'Mudah'
    },
  ];

  const activeProject = {
    title: 'Landing Page Kopi Nusantara',
    client: 'Pak Budi',
    progress: 65,
    deadline: '3 hari lagi',
    fee: 'Rp 1.800.000'
  };

  const completedProjects = [
    {
      id: 1,
      title: 'Website Batik Siti',
      client: 'Ibu Siti',
      completedDate: '15 Jan 2025',
      fee: 'Rp 2.000.000',
      rating: 5,
      review: 'Developer sangat profesional dan hasil memuaskan!'
    },
    {
      id: 2,
      title: 'Landing Page Fashion UMKM',
      client: 'Ibu Ani',
      completedDate: '8 Jan 2025',
      fee: 'Rp 1.500.000',
      rating: 5,
      review: 'Cepat dan hasil bagus, terima kasih!'
    },
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
              <span>Dashboard</span>
            </a>
            <a href="#projects" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
              <Briefcase className="w-5 h-5" />
              <span>Proyek Tersedia</span>
            </a>
            <a href="#history" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
              <History className="w-5 h-5" />
              <span>Riwayat</span>
            </a>
            <a href="#profile" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
              <User className="w-5 h-5" />
              <span>Profil</span>
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
                  <h2 className="text-2xl font-bold">Ahmad Developer</h2>
                  <p className="text-purple-100">Full Stack Developer</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-300" />
                      <span className="text-sm">4.9/5</span>
                    </div>
                    <span className="text-sm text-purple-200">12 Proyek Selesai</span>
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">Rp 18.5 Juta</p>
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
                  <p className="text-2xl font-bold text-blue-600 mt-1">1</p>
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
                  <p className="text-2xl font-bold text-purple-600 mt-1">12</p>
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
                  <p className="text-2xl font-bold text-yellow-600 mt-1">4.9/5</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Active Project */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Proyek Aktif</h3>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{activeProject.title}</h4>
                  <p className="text-gray-600">Klien: {activeProject.client}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Deadline: {activeProject.deadline}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">{activeProject.fee}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress Pengerjaan</span>
                  <span className="text-sm font-semibold text-purple-600">{activeProject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all"
                    style={{ width: `${activeProject.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Upload Hasil Pekerjaan</h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link Website (GitHub/Demo)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload File (ZIP)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept=".zip"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      />
                      <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Projects */}
          <div id="projects" className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Proyek Tersedia</h3>
            <div className="space-y-4">
              {availableProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{project.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.difficulty === 'Mudah' ? 'bg-green-100 text-green-700' :
                          project.difficulty === 'Menengah' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1 text-green-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold">{project.fee}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Deadline: {project.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition whitespace-nowrap">
                      Ambil Proyek
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Projects & Ratings */}
          <div id="history" className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Riwayat Proyek</h3>
            <div className="space-y-4">
              {completedProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{project.title}</h4>
                      <p className="text-sm text-gray-600">Klien: {project.client}</p>
                      <p className="text-xs text-gray-500 mt-1">Selesai: {project.completedDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{project.fee}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(project.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 italic">"{project.review}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDeveloper;
