import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Zap, TrendingUp, Shield, Users, Code, Headphones, CheckCircle, DollarSign } from 'lucide-react';

const Benefit = () => {
  const umkmBenefits = [
    {
      icon: Zap,
      title: 'Proses Cepat & Mudah',
      description: 'Website jadi dalam 3-7 hari kerja tanpa ribet. Cukup konsultasi dengan BumiBot AI, pilih template, dan tunggu hasilnya!'
    },
    {
      icon: DollarSign,
      title: 'Harga Terjangkau',
      description: 'Paket mulai dari Rp 500.000 dengan kualitas profesional. Tidak perlu bayar mahal untuk website berkualitas.'
    },
    {
      icon: Code,
      title: 'Desain Profesional',
      description: 'Template modern dan menarik yang dikerjakan oleh developer berpengalaman dengan standar industri.'
    },
    {
      icon: Users,
      title: 'Developer Lokal Terpercaya',
      description: 'Dikerjakan oleh developer Indonesia yang sudah terverifikasi dan berpengalaman membuat website UMKM.'
    },
    {
      icon: Headphones,
      title: 'Support 24/7',
      description: 'Tim support dan developer siap membantu kapan pun Anda membutuhkan bantuan atau konsultasi.'
    },
    {
      icon: TrendingUp,
      title: 'Monitoring Gratis',
      description: 'Pantau performa website Anda secara gratis dan dapatkan saran untuk meningkatkan bisnis online.'
    }
  ];

  const developerBenefits = [
    {
      icon: DollarSign,
      title: 'Penghasilan Kompetitif',
      description: 'Dapatkan 70% dari total fee proyek. Fee mulai dari Rp 1 juta hingga Rp 5 juta per proyek.'
    },
    {
      icon: Zap,
      title: 'Fleksibilitas Waktu',
      description: 'Kerjakan proyek kapan saja, di mana saja. Anda yang tentukan jadwal dan jumlah proyek yang ingin diambil.'
    },
    {
      icon: TrendingUp,
      title: 'Portofolio Bertambah',
      description: 'Setiap proyek yang selesai akan menambah portofolio Anda dan meningkatkan kredibilitas sebagai developer.'
    },
    {
      icon: Users,
      title: 'Network Luas',
      description: 'Terhubung dengan UMKM dari berbagai industri dan perluas jaringan profesional Anda.'
    },
    {
      icon: Shield,
      title: 'Pembayaran Aman',
      description: 'Sistem pembayaran terjamin aman melalui platform. Fee langsung ditransfer setelah proyek divalidasi.'
    },
    {
      icon: Code,
      title: 'Skill Development',
      description: 'Asah skill dengan berbagai jenis proyek dan dapatkan feedback dari klien untuk berkembang lebih baik.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Keuntungan Bergabung dengan <span className="text-purple-600">BuildUMKM</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform yang memberikan manfaat maksimal baik untuk UMKM maupun Developer
            </p>
          </div>
        </section>

        {/* UMKM Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Keuntungan untuk <span className="text-purple-600">UMKM</span>
              </h2>
              <p className="text-lg text-gray-600">
                Nikmati berbagai kemudahan dalam membangun kehadiran digital bisnis Anda
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {umkmBenefits.map((benefit, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <benefit.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                BuildUMKM vs Cara Tradisional
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-purple-600 mb-6">Dengan BuildUMKM</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Harga mulai Rp 500.000</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Selesai dalam 3-7 hari</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Konsultasi AI gratis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Developer terverifikasi</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Support berkelanjutan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Monitoring gratis</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-8 rounded-2xl shadow-lg opacity-75">
                <h3 className="text-2xl font-bold text-gray-600 mb-6">Cara Tradisional</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1 flex-shrink-0">✗</span>
                    <span className="text-gray-600">Biaya mulai Rp 5-10 juta</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1 flex-shrink-0">✗</span>
                    <span className="text-gray-600">Butuh waktu 1-3 bulan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1 flex-shrink-0">✗</span>
                    <span className="text-gray-600">Konsultasi berbayar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1 flex-shrink-0">✗</span>
                    <span className="text-gray-600">Risiko developer tidak jelas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1 flex-shrink-0">✗</span>
                    <span className="text-gray-600">Support terbatas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1 flex-shrink-0">✗</span>
                    <span className="text-gray-600">Biaya maintenance tinggi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Keuntungan untuk <span className="text-purple-600">Developer</span>
              </h2>
              <p className="text-lg text-gray-600">
                Kembangkan karir dan tingkatkan penghasilan dengan bergabung sebagai developer
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {developerBenefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <benefit.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Merasakan Manfaatnya?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Bergabunglah dengan ratusan UMKM dan developer yang telah merasakan keuntungan bersama BuildUMKM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                Daftar Sekarang
              </a>
              <a
                href="/harga-web"
                className="px-8 py-4 bg-purple-700 text-white border-2 border-white rounded-lg font-semibold text-lg hover:bg-purple-800 transition-all"
              >
                Lihat Paket Harga
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Benefit;
