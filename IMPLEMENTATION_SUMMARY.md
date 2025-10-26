# 📝 Ringkasan Implementasi Sistem Autentikasi BuildUMKM

Sistem autentikasi berbasis **Role-Based Access Control (RBAC)** telah diimplementasikan menggunakan **data dummy** untuk *testing*. Sistem ini menggunakan **React Context** untuk manajemen *global state* dan **LocalStorage** untuk sesi persisten.

## 🔑 Kredensial Login (Testing Only)

| Role | Email | Password | Dashboard |
| :--- | :--- | :--- | :--- |
| **UMKM** | `umkm@test.com` | `umkm123` | `/dashboard-umkm` |
| **Developer** | `developer@test.com` | `dev123` | `/dashboard-developer` |
| **Admin** | `admin@test.com` | `admin123` | `/dashboard-admin` |

## ✅ Fitur Utama

| Kategori | Fitur yang Diimplementasikan | File Kunci |
| :--- | :--- | :--- |
| **Autentikasi** | Login, Logout, Validasi Kredensial, Error/Loading States. | `Login.jsx` |
| **Authorization** | Role-Based Access Control (RBAC), Auto Redirect sesuai role, Protected Routes (`<ProtectedRoute>`). | `ProtectedRoute.jsx` |
| **Sesi** | Persistent Login (`localStorage`), Guest Routes (Redirect jika sudah login). | `AuthContext.jsx` |
| **UI/UX** | Navbar dinamis (tampil nama user & tombol logout), Quick Demo Login Buttons. | `Navbar.jsx`, `Login.jsx` |

## 🚀 Cara Testing (Quick Guide)

1. **Demo Cepat:** Akses `/login` dan klik salah satu dari **3 Tombol Demo Login Cepat**.
2. **Test RBAC:** Login sebagai UMKM, lalu coba akses rute `/dashboard-admin`. Sistem harus otomatis me-redirect ke `/dashboard-umkm`.
3. **Test Sesi:** Setelah login, *refresh* halaman (**F5**). User harus tetap login (Persistent Session).
4. **Test Logout:** Klik tombol **"Keluar"** di navbar.

## 🛠️ Panduan Integrasi Backend

Ketika backend sudah siap, fokus pada pembaruan berikut untuk mengganti data dummy dengan API sungguhan.

### 1. Update Logic Login (`src/pages/Login.jsx`)

Ganti logika autentikasi dummy dengan panggilan API untuk mendapatkan data user dan **JWT token**.

### 2. Update Manajemen Token (`src/context/AuthContext.jsx`)

Tambahkan state untuk `token`. Perbarui fungsi `login` dan `logout` untuk menyimpan dan menghapus token di `localStorage`.

```jsx
// Di AuthContext.jsx
const login = (userData, authToken) => {
  // ... set user data
  localStorage.setItem('token', authToken); // Tambahkan baris ini
};

const logout = () => {
  // ... clear user data
  localStorage.removeItem('token'); // Tambahkan baris ini
};

// Di src/utils/api.js
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
      // Token expired, auto-logout
      window.location.href = '/logout-logic';
    }
    return Promise.reject(error);
  }
);

