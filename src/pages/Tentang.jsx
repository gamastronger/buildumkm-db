import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Target, Award, Heart } from 'lucide-react';

const Tentang = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Tentang <span className="text-purple-600">BuildUMKM</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Platform yang menghubungkan UMKM dengan developer lokal untuk menciptakan kehadiran digital yang kuat
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl">
                <Target className="w-12 h-12 text-purple-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h2>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform terdepan di Indonesia yang memberdayakan UMKM melalui transformasi digital, 
                  sekaligus menciptakan ekosistem yang menguntungkan bagi developer lokal.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl">
                <Award className="w-12 h-12 text-purple-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h2>
                <p className="text-gray-600 leading-relaxed">
                  Memberikan akses mudah dan terjangkau bagi UMKM untuk memiliki website profesional, 
                  sambil memberdayakan developer lokal dengan proyek-proyek berkualitas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    BuildUMKM lahir dari keprihatinan kami melihat banyak UMKM Indonesia yang kesulitan 
                    untuk hadir di dunia digital karena keterbatasan biaya dan pengetahuan teknis.
                  </p>
                  <p>
                    Di sisi lain, banyak developer berbakat yang mencari proyek untuk mengasah skill 
                    dan menambah penghasilan. Kami melihat peluang untuk menjembatani keduanya.
                  </p>
                  <p>
                    Sejak diluncurkan tahun 2024, BuildUMKM telah membantu ratusan UMKM memiliki 
                    website profesional dan memberikan ribuan jam kerja kepada developer lokal di seluruh Indonesia.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600"
                  alt="Team BuildUMKM"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
              <p className="text-lg text-gray-600">Prinsip yang menjadi fondasi BuildUMKM</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Kolaborasi</h3>
                <p className="text-gray-600">
                  Membangun ekosistem yang saling menguntungkan antara UMKM dan developer
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Kepedulian</h3>
                <p className="text-gray-600">
                  Peduli terhadap perkembangan UMKM dan karir developer Indonesia
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Kualitas</h3>
                <p className="text-gray-600">
                  Berkomitmen memberikan hasil terbaik dengan standar profesional
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold mb-2">500+</p>
                <p className="text-purple-200">UMKM Terlayani</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">150+</p>
                <p className="text-purple-200">Developer Aktif</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">800+</p>
                <p className="text-purple-200">Proyek Selesai</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">4.9/5</p>
                <p className="text-purple-200">Rating Kepuasan</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Tentang;
