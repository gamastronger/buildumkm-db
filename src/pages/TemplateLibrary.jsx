import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const TemplateLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua Template' },
    { id: 'kuliner', name: 'Kuliner' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'kerajinan', name: 'Kerajinan' },
    { id: 'jasa', name: 'Jasa' },
    { id: 'ecommerce', name: 'E-commerce' }
  ];

  const templates = [
    {
      id: 1,
      name: 'Kuliner Modern',
      category: 'kuliner',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      preview: '#'
    },
    {
      id: 2,
      name: 'Fashion Minimalis',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      preview: '#'
    },
    {
      id: 3,
      name: 'Kerajinan Tradisional',
      category: 'kerajinan',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop',
      preview: '#'
    },
    {
      id: 4,
      name: 'Kopi Nusantara',
      category: 'kuliner',
      image: 'https://images.unsplash.com/photo-1559305616-3bea1dbb6e70?w=400&h=300&fit=crop',
      preview: '#'
    },
    {
      id: 5,
      name: 'Batik Store',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',
      preview: '#'
    },
    {
      id: 6,
      name: 'Laundry Service',
      category: 'jasa',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
      preview: '#'
    },
    {
      id: 7,
      name: 'Organic Shop',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      preview: '#'
    },
    {
      id: 8,
      name: 'Salon & Spa',
      category: 'jasa',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      preview: '#'
    },
    {
      id: 9,
      name: 'Handmade Craft',
      category: 'kerajinan',
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop',
      preview: '#'
    }
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Template Library <span className="text-purple-600">BuildUMKM</span>
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

export default TemplateLibrary;
