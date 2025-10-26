import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        when: 'afterChildren',
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.05,
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-xl">B</span>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              BuildUMKM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
              Beranda
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/tentang" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
              Tentang
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/benefit" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
              Benefit
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/harga-web" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
              Harga Website
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/pilihan-tema" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
              Pilihan Tema
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/kontak" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
              Kontak
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-5 py-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Masuk
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="block px-6 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                Daftar
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-4 py-4 space-y-3">
              <motion.div variants={menuItemVariants}>
                <Link
                  to="/"
                  className="block py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  onClick={toggleMenu}
                >
                  Beranda
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  to="/tentang"
                  className="block py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  onClick={toggleMenu}
                >
                  Tentang
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  to="/benefit"
                  className="block py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  onClick={toggleMenu}
                >
                  Benefit
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  to="/harga-web"
                  className="block py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  onClick={toggleMenu}
                >
                  Harga Website
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  to="/pilihan-tema"
                  className="block py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  onClick={toggleMenu}
                >
                  Pilihan Tema
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  to="/kontak"
                  className="block py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  onClick={toggleMenu}
                >
                  Kontak
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants} className="pt-4 space-y-2 border-t border-gray-200">
                <Link
                  to="/login"
                  className="block py-2 text-center text-purple-600 font-semibold"
                  onClick={toggleMenu}
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="block py-2.5 text-center bg-purple-600 text-white rounded-lg font-semibold"
                  onClick={toggleMenu}
                >
                  Daftar
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
