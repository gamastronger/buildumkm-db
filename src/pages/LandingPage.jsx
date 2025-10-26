import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp, 
  Code, 
  Rocket,
  MessageCircle,
  Layout,
  Server,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';
import gamaImg from '../assets/images/gama.webp';
import webumkm from '../assets/images/webumkm.png';
import logo from '../assets/images/logo.png';
import LazyImage from '../components/LazyImage';
import Footer from '../components/Footer';

const LandingPage = () => {
  const canvasRef = useRef(null);

  // Particle effect for hero section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Portfolio items for scrolling animation
  const portfolioItems = [
  { id: 1, title: 'Kopi Nusantara', image: webumkm },
  { id: 2, title: 'Batik Tradisional', image: webumkm },
  { id: 3, title: 'Kuliner Lokal', image: webumkm },
  { id: 4, title: 'Fashion UMKM', image: webumkm },
  { id: 5, title: 'Kerajinan Tangan', image: webumkm },
  { id: 6, title: 'Produk Organik', image: webumkm },
  ];

  const testimonials = [
    {
      name: 'Ibu Siti',
      role: 'Pemilik Batik Siti',
      image: gamaImg,
      text: 'BuildUMKM sangat membantu usaha saya! Sekarang pelanggan bisa order online dengan mudah.',
      rating: 5
    },
    {
      name: 'Pak Budi',
      role: 'Kopi Budi Jaya',
      image: gamaImg,
      text: 'Website yang dibuat profesional dan harga terjangkau. Recommended!',
      rating: 5
    },
    {
      name: 'Ibu Ani',
      role: 'Kuliner Nusantara',
      image: gamaImg,
      text: 'Pelayanan cepat dan developer sangat responsif. Terima kasih BuildUMKM!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-600 font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Platform Digital untuk UMKM Indonesia
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Bangun Website UMKM-mu dengan{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Mudah, Cepat, dan Terjangkau
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Wujudkan kehadiran digital bisnismu bersama developer lokal terpercaya. 
              Tanpa ribet, tanpa coding, hasil profesional!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center group"
              >
                Mulai Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all flex items-center"
              >
                Jadi Developer
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                100+ UMKM Terlayani
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                50+ Developer Aktif
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Rating 4.9/5
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Scrolling Section */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="flex gap-6 animate-scroll-left">
          {[...portfolioItems, ...portfolioItems].map((item, index) => (
            <div
              key={index}
              className="relative aspect-[2/1] w-[70vw] max-w-[500px] min-w-[250px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex-shrink-0 group bg-white"
            >
              <LazyImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full p-0 flex items-end">
                <div className="w-full px-4 py-2 bg-black/50 backdrop-blur-sm rounded-b-xl">
                  <h3 className="text-white font-semibold text-base text-center whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tentang <span className="text-purple-600">BuildUMKM</span>
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                BuildUMKM adalah platform digital yang menghubungkan pelaku UMKM dengan developer mahasiswa lokal 
                berbakat untuk menciptakan website bisnis yang profesional dan terjangkau.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Kami percaya bahwa setiap UMKM berhak memiliki kehadiran digital yang kuat tanpa harus 
                mengeluarkan biaya mahal atau memiliki keahlian teknis.
              </p>
              <Link
                to="/tentang"
                className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Selengkapnya
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl overflow-hidden flex items-center justify-center mx-auto">
                <LazyImage
                  src={logo}
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why BuildUMKM Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Mengapa Harus <span className="text-purple-600">BuildUMKM</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              BuildUMKM hadir sebagai solusi mudah, cepat, dan terjangkau untuk membawa usaha Anda ke dunia online. 
              Tak perlu keahlian teknis, kami bantu dari awal hingga website Anda siap digunakan!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mudah, Cepat, dan Terjangkau
              </h3>
              <p className="text-gray-600">
                Proses pembuatan website yang simpel dengan harga yang ramah di kantong UMKM. 
                Hasil maksimal tanpa ribet!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Dirancang Khusus UMKM
              </h3>
              <p className="text-gray-600">
                Fitur dan desain yang disesuaikan dengan kebutuhan UMKM Indonesia. 
                Dari konsultasi hingga hasil akhir.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Dukungan Tim yang Responsif
              </h3>
              <p className="text-gray-600">
                Tim support dan developer lokal yang siap membantu kapan pun Anda membutuhkan. 
                Responsif dan terpercaya!
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-12 text-white"
          >
            <p className="text-2xl md:text-3xl font-bold mb-6">
              "Cukup fokus pada bisnis Anda, urusan digital serahkan ke kami."
            </p>
            <Link
              to="/harga-web"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Lihat Paket
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Bagaimana <span className="text-purple-600">BuildUMKM</span> Bekerja?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Empat langkah sederhana untuk website UMKM Anda siap online!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: MessageCircle,
                title: 'Konsultasi AI',
                description: 'UMKM daftar & konsultasi isi website dengan BumiBot (Chatbot AI)'
              },
              {
                step: 2,
                icon: Layout,
                title: 'Pemilihan & Hosting',
                description: 'Memilih template dan paket hosting yang disarankan'
              },
              {
                step: 3,
                icon: Code,
                title: 'Proyek Developer',
                description: 'Developer mengambil dan mengerjakan proyek Anda'
              },
              {
                step: 4,
                icon: Rocket,
                title: 'Selesai & Monitoring',
                description: 'Website selesai, siap tayang, dan dapat dimonitoring gratis'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <item.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-purple-300">
                    <div className="absolute -right-2 -top-1 w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-purple-300 border-b-4 border-b-transparent"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Keunggulan Layanan Kami
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Cepat', description: 'Website jadi dalam 3-7 hari kerja' },
              { icon: TrendingUp, title: 'Murah', description: 'Harga mulai dari Rp 500.000' },
              { icon: Layout, title: 'Desain Profesional', description: 'Template modern dan menarik' },
              { icon: Users, title: 'Support Lokal', description: 'Developer Indonesia terpercaya' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Apa Kata <span className="text-purple-600">Mereka</span>?
            </h2>
            <p className="text-lg text-gray-600">
              Testimoni dari UMKM yang telah bergabung dengan BuildUMKM
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <LazyImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    wrapperClassName="w-12 h-12 rounded-full mr-4 flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Developer Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Code className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Kamu Developer Berbakat?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Bergabunglah dengan BuildUMKM dan dapatkan proyek website dari UMKM di seluruh Indonesia. 
              Kembangkan skill sambil membantu UMKM berkembang!
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Gabung Sebagai Developer
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default LandingPage;
