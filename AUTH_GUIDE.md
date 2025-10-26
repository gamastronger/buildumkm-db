# Tentu. Berikut adalah versi yang sangat ringkas, berfokus pada informasi penting, dan menggunakan blok kode untuk memudahkan *copy-paste* pada bagian kredensial dan integrasi kode

-----

## Sistem Autentikasi BuildUMKM (Data Dummy)

Sistem autentikasi berbasis **Role-Based Access Control (RBAC)** untuk 3 peran: **UMKM**, **Developer**, dan **Admin**. Menggunakan **React Context** dan **LocalStorage** untuk sesi persisten.

## 📋 Kredensial Login (Testing Only)

| Role | Email | Password | Dashboard |
| :--- | :--- | :--- | :--- |
| **UMKM** | `umkm@test.com` | `umkm123` | `/dashboard-umkm` |
| **Developer** | `developer@test.com` | `dev123` | `/dashboard-developer` |
| **Admin** | `admin@test.com` | `admin123` | `/dashboard-admin` |

## ✅ Fitur & Cara Kerja

| Kategori | Deskripsi |
| :--- | :--- |
| **Autentikasi** | Login, validasi, dan *error handling*. Tersedia **3 Quick Demo Login Buttons**. |
| **Authorization** | *Protected routes* (`<ProtectedRoute>`). Auto-redirect ke dashboard sesuai role (`/dashboard-umkm`, dll.). |
| **Sesi** | *Persistent login* dengan `localStorage`. **Logout** membersihkan sesi. |
| **UI** | Navbar menampilkan nama user, tombol logout, dan link dashboard. |
| **Struktur** | Logika auth terpusat di `src/context/AuthContext.jsx`. |

## 🛠️ Contoh Penggunaan Kode

### 1\. Mengakses Status Auth (di komponen)

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isUMKM, logout } = useAuth();
  // ...
}
```

### 2\. Melindungi Route (di file Routing)

```jsx
import { ProtectedRoute } from '../components/ProtectedRoute';

// Hanya untuk user yang sudah login
<Route path="/protected" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />

// Hanya untuk role tertentu (contoh: Admin)
<Route 
  path="/admin-only" 
  element={<ProtectedRoute allowedRoles={['admin']}><AdminPage /></ProtectedRoute>} 
/>
```

-----

## 🚀 Next Steps: Integrasi Backend

Ketika backend siap, Anda perlu memperbarui logika login untuk menangani **token (JWT)** dan menambahkan *API Interceptor*.

### Update Token Management (di `AuthContext.jsx`)

```jsx
const [token, setToken] = useState(localStorage.getItem('token'));

const login = (userData, authToken) => {
  // ... set user data
  setToken(authToken);
  localStorage.setItem('token', authToken);
};

const logout = () => {
  // ... clear user data
  setToken(null);
  localStorage.removeItem('token');
};
```

### API Interceptor (Tambahkan Token ke Request & Handle 401)

```jsx
import axios from 'axios';

const api = axios.create({ baseURL: 'YOUR_API_URL' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto-logout jika token expired/invalid
      localStorage.removeItem('token');
      localStorage.removeItem('buildumkm_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default api;
