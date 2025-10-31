import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import Tentang from './pages/Tentang';
import Benefit from './pages/Benefit';
import HargaWeb from './pages/HargaWeb';
import PilihanTema from './pages/PilihanTema';
import Kontak from './pages/Kontak';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardUMKM from './pages/DashboardUMKM';
import DashboardDeveloper from './pages/DashboardDeveloper';
import DashboardAdmin from './pages/DashboardAdmin';
import Panduan from './pages/Panduan';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/tentang" element={<PageTransition><Tentang /></PageTransition>} />
          <Route path="/benefit" element={<PageTransition><Benefit /></PageTransition>} />
          <Route path="/harga-web" element={<PageTransition><HargaWeb /></PageTransition>} />
          <Route path="/pilihan-tema" element={<PageTransition><PilihanTema /></PageTransition>} />
          <Route path="/kontak" element={<PageTransition><Kontak /></PageTransition>} />
          
          {/* Guest Routes - redirect jika sudah login */}
          <Route 
            path="/login" 
            element={
              <GuestRoute>
                <PageTransition><Login /></PageTransition>
              </GuestRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <GuestRoute>
                <PageTransition><Register /></PageTransition>
              </GuestRoute>
            } 
          />
          
          {/* Protected Routes - hanya untuk user yang sudah login */}
          <Route 
            path="/dashboard-umkm" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <PageTransition><DashboardUMKM /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard-developer" 
            element={
              <ProtectedRoute allowedRoles={['developer']}>
                <PageTransition><DashboardDeveloper /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard-admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTransition><DashboardAdmin /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route path="/panduan" element={<PageTransition><Panduan /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
