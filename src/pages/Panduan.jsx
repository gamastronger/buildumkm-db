import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  User,
  Palette,
  Tag,
  ShoppingCart,
  Megaphone,
  Smile,
  HelpCircle,
  BookOpen,
  CheckSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

const sections = [
  {
    title: 'Mulai & Lengkapi Profil Bisnis',
    icon: <User className="w-7 h-7 text-purple-600" />,
    tips: [
      'Lengkapi data usaha (nama, kontak, lokasi)',
      'Upload logo & foto terbaik',
      'Tips branding singkat',
    ],
  },
  {
    title: 'Pilih & Sesuaikan Template Website',
    icon: <Palette className="w-7 h-7 text-purple-600" />,
    tips: [
      'Pilih tema sesuai jenis usaha',
      'Sesuaikan warna & foto',
      'Cek tampilan mobile',
    ],
  },
  {
    title: 'Kelola Produk & Layanan',
    icon: <Tag className="w-7 h-7 text-purple-600" />,
    tips: [
      'Upload foto produk berkualitas',
      'Tambahkan harga dan deskripsi lengkap',
      'Update stok & kategori',
    ],
  },
  {
    title: 'Kelola Pesanan & Pelanggan',
    icon: <ShoppingCart className="w-7 h-7 text-purple-600" />,
    tips: [
      'Pantau pesanan',
      'Balas cepat',
      'Jaga kualitas layanan',
    ],
  },
  {
    title: 'Promosi & Strategi Pemasaran',
    icon: <Megaphone className="w-7 h-7 text-purple-600" />,
    tips: [
      'Share link website ke social media',
      'Pakai testimoni',
      'Konten harian sederhana',
    ],
  },
  {
    title: 'Tips Produktivitas & Manajemen Stres',
    icon: <Smile className="w-7 h-7 text-purple-600" />,
    tips: [
      'Buat checklist harian',
      'Istirahat terjadwal',
      'Fokus progress, bukan perbandingan',
    ],
  },
  {
    title: 'Bantuan & Dukungan',
    icon: <HelpCircle className="w-7 h-7 text-purple-600" />,
    tips: [
      'Kunjungi halaman bantuan/support',
      'Hubungi tim support jika butuh bantuan',
    ],
  },
];

const Panduan = () => {
  const navigate = useNavigate();
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32 pb-24 px-4 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="w-14 h-14 mx-auto text-purple-600 mb-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Panduan Sukses UMKM</h1>
            <p className="text-gray-600 text-lg md:text-xl">
              Alur langkah demi langkah untuk online bersama kami
            </p>
          </motion.div>

          <div ref={timelineRef} className="relative">
            <motion.div
              className="absolute left-6 md:left-7 top-0 w-1.5 h-full bg-purple-200 rounded-full"
              style={{ scaleY, transformOrigin: 'top' }}
            />

            <div className="relative z-10 space-y-10">
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  className="relative flex items-start"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
                >
                  <div className="flex-shrink-0 absolute left-0 top-1 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-purple-600 rounded-full border-4 border-white shadow-lg z-20">
                    <span className="text-xl md:text-2xl font-bold text-white">{idx + 1}</span>
                  </div>

                  <div className="ml-20 md:ml-24 w-full bg-white rounded-2xl shadow-lg p-6 group transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 bg-purple-100 rounded-full p-2.5">
                        {section.icon}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700">
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-2 ml-1">
                      {section.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckSquare className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-base">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <motion.button
              onClick={() => navigate('/faq')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium shadow hover:bg-purple-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="w-5 h-5" />
              Butuh bantuan lebih lanjut? FAQ & Support
            </motion.button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Panduan;
