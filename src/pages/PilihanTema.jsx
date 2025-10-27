import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

// ✅ Import gambar langsung dari folder src
import GamaImage from '../assets/images/gama.webp';

const PilihanTema = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua Template' },
    { id: 'kuliner', name: 'Kuliner' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'kerajinan', name: 'Kerajinan' },
    { id: 'jasa', name: 'Jasa' },
    { id: 'ecommerce', name: 'E-commerce' }
  ];

  // ✅ Gunakan gambar hasil import agar React bisa membaca path-nya
  const templates = [
    {
      id: 1,
      name: 'Kuliner Modern',
      category: 'kuliner',
      image: GamaImage,
      preview: '#'
    },
    {
      id: 2,
      name: 'Fashion Minimalis',
      category: 'fashion',
      image: GamaImage,
      preview: '#'
    },
    {
      id: 3,
      name: 'Kerajinan Tradisional',
      category: 'kerajinan',
      image: GamaImage,
      preview: '#'
    },
    {
      id: 4,
      name: 'Kopi Nusantara',
      category: 'kuliner',
      image: GamaImage,
      preview: '#'
    },
    {
      id: 5,
      name: 'Batik Store',
      category: 'fashion',
      image: GamaImage,
      preview: '#'
    },
    {
      id: 6,
      name: 'Laundry Service',
      category: 'jasa',
      image: GamaImage,
      preview: '#'
    },
    {
      id: 7,
      name: 'Organic Shop',
      category: 'ecommerce',
      image: GamaImage,
      preview: '#'
    },
    {
      id: 8,
      name: 'Salon & Spa',
      category: 'jasa',
      image: GamaImage,
      preview: '#'
    },
    {
      id: 9,
      name: 'Handmade Craft',
      category: 'kerajinan',
      image: GamaImage,
      preview: '#'
    }
  ];

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pilihan Tema Website <span className="text-purple-600">BuildUMKM</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilih dari berbagai template profesional yang dirancang khusus untuk UMKM Indonesia
            </p>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="py-8 bg-white sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a
                        href={template.preview}
                        className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                      >
                        Lihat Preview
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                        {categories.find(c => c.id === template.category)?.name}
                      </span>
                      <a
                        href="/login"
                        className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                      >
                        Pilih Template →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Tidak Menemukan Template yang Cocok?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Kami bisa buatkan custom design sesuai kebutuhan bisnis Anda!
            </p>
            <a
              href="/kontak"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Hubungi Kami
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PilihanTema;
