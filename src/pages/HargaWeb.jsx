import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Zap, Star, Crown } from 'lucide-react';

const HargaWeb = () => {
  const packages = [
    {
      name: 'Starter',
      price: 'Rp 500.000',
      icon: Zap,
      color: 'blue',
      features: [
        'Landing Page 1 Halaman',
        'Desain Responsif',
        '3 Revisi',
        'Hosting 1 Tahun',
        'Domain .com (Opsional)',
        'Support Email',
        'Selesai 3-5 Hari'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 'Rp 1.500.000',
      icon: Star,
      color: 'purple',
      features: [
        'Website 3-5 Halaman',
        'Desain Custom',
        '5 Revisi',
        'Hosting 1 Tahun',
        'Domain .com GRATIS',
        'Form Kontak',
        'Google Maps Integration',
        'Support WhatsApp',
        'Selesai 5-7 Hari'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Rp 3.000.000',
      icon: Crown,
      color: 'emerald',
      features: [
        'Website Multi-Page',
        'E-commerce Basic',
        'Desain Premium Custom',
        'Unlimited Revisi',
        'Hosting 1 Tahun',
        'Domain .com GRATIS',
        'SEO Optimization',
        'Blog Integration',
        'Admin Dashboard',
        'Google Analytics',
        'Support Priority 24/7',
        'Selesai 7-10 Hari'
      ],
      popular: false
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
              Paket Harga <span className="text-purple-600">BuildUMKM</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Semua paket sudah termasuk hosting dan support!
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 ${
                    pkg.popular ? 'ring-4 ring-purple-600' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                      TERPOPULER
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-${pkg.color}-100 rounded-full flex items-center justify-center mb-6`}>
                      <pkg.icon className={`w-8 h-8 text-${pkg.color}-600`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-gray-600">/proyek</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/login"
                      className={`block w-full py-3 text-center rounded-lg font-semibold transition-all ${
                        pkg.popular
                          ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Pilih Paket
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Informasi Tambahan
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Pembayaran:</strong> Transfer 50% DP sebelum mulai, 50% sisanya setelah website selesai
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Garansi:</strong> Revisi gratis selama 30 hari setelah website selesai
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Perpanjangan Hosting:</strong> Rp 300.000/tahun setelah tahun pertama
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Custom Request:</strong> Butuh fitur khusus? Hubungi kami untuk penawaran custom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Pertanyaan Umum
            </h2>
            <div className="space-y-4">
              <details className="bg-white rounded-lg shadow-md p-6">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Apakah saya bisa upgrade paket di tengah jalan?
                </summary>
                <p className="mt-3 text-gray-600">
                  Ya, Anda bisa upgrade paket kapan saja dengan membayar selisih harga dan fitur tambahan akan ditambahkan.
                </p>
              </details>
              <details className="bg-white rounded-lg shadow-md p-6">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Apakah harga sudah termasuk konten?
                </summary>
                <p className="mt-3 text-gray-600">
                  Anda perlu menyediakan konten (teks, gambar, logo). Kami akan membantu mengatur layout dan desainnya.
                </p>
              </details>
              <details className="bg-white rounded-lg shadow-md p-6">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Bagaimana jika saya tidak puas dengan hasilnya?
                </summary>
                <p className="mt-3 text-gray-600">
                  Setiap paket memiliki jumlah revisi. Kami akan terus memperbaiki sampai Anda puas dalam batas revisi yang disediakan.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Masih Bingung Pilih Paket?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Konsultasi gratis dengan BumiBot AI untuk rekomendasi paket yang tepat!
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Konsultasi Gratis
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HargaWeb;
