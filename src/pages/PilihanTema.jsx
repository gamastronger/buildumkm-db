import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PilihanTema = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <section className="bg-gradient-to-br from-purple-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pilihan Tema Website
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lihat berbagai pilihan tema website untuk bisnis UMKM Anda
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-gray-600 mb-8">
              Halaman ini menampilkan koleksi lengkap tema yang tersedia. Silakan kunjungi halaman{' '}
              <a href="/template-library" className="text-purple-600 font-semibold hover:text-purple-700">
                Template Library
              </a>{' '}
              untuk melihat seluruh pilihan tema yang tersedia.
            </p>
            <a
              href="/template-library"
              className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all shadow-lg"
            >
              Lihat Template Library
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PilihanTema;
