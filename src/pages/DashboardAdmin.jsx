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

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const stats = {
    totalUMKM: 156,
    activeDevelopers: 48,
    completedProjects: 243,
    activeProjects: 12,
    totalFee: 'Rp 485.000.000'
  };

  const pendingUsers = [
    { id: 1, name: 'Budi Santoso', type: 'Developer', email: 'budi@email.com', date: '25 Okt 2025' },
    { id: 2, name: 'Toko Roti Manis', type: 'UMKM', email: 'rotimanis@email.com', date: '25 Okt 2025' },
    { id: 3, name: 'Siti Rahayu', type: 'Developer', email: 'siti@email.com', date: '24 Okt 2025' },
  ];

  const pendingProjects = [
    { id: 1, title: 'Website Batik Modern', developer: 'Ahmad', client: 'Batik Siti', status: 'Menunggu Validasi' },
    { id: 2, title: 'Landing Page Kopi', developer: 'Rudi', client: 'Kopi Nusantara', status: 'Dalam Review' },
  ];

  const recentTransactions = [
    { id: 1, project: 'Website Fashion UMKM', amount: 'Rp 2.100.000', developer: 'Rp 1.470.000', platform: 'Rp 630.000', date: '24 Okt 2025' },
    { id: 2, project: 'Landing Page Kuliner', amount: 'Rp 1.500.000', developer: 'Rp 1.050.000', platform: 'Rp 450.000', date: '23 Okt 2025' },
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
            <p className="text-gray-600">Kelola seluruh aktivitas platform BuildUMKM</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total UMKM</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUMKM}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% bulan ini</p>
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
                  <p className="text-3xl font-bold text-gray-900">{stats.activeDevelopers}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 8% bulan ini</p>
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
                  <p className="text-3xl font-bold text-gray-900">{stats.completedProjects}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 15% bulan ini</p>
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
                  <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
                  <p className="text-xs text-gray-500 mt-1">Sedang dikerjakan</p>
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
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFee}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 20% bulan ini</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div id="users" className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Manajemen Pengguna - Pending Approval</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tipe</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal Daftar</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{user.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.type === 'Developer' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {user.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-gray-600">{user.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">
                            Terima
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">
                            Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Project Validation */}
          <div id="projects" className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Validasi Proyek</h3>
            <div className="space-y-4">
              {pendingProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{project.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Developer: <strong>{project.developer}</strong></span>
                        <span>Klien: <strong>{project.client}</strong></span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>Review</span>
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Setujui</span>
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center space-x-1">
                        <XCircle className="w-4 h-4" />
                        <span>Tolak</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Distribution */}
          <div id="fees" className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Sistem Pembagian Fee (70% Developer / 30% Platform)</h3>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
                Export Data
              </button>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-purple-900">
                <strong>Skema Pembagian:</strong> Setiap proyek yang selesai, 70% fee akan diterima oleh Developer dan 30% untuk Platform BuildUMKM
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Proyek</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Fee</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Developer (70%)</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Platform (30%)</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{transaction.project}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">{transaction.amount}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">{transaction.developer}</td>
                      <td className="py-3 px-4 text-purple-600 font-medium">{transaction.platform}</td>
                      <td className="py-3 px-4 text-gray-600">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
