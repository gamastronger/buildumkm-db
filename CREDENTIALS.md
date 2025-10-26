# Kredensial Login Demo

Berikut adalah kredensial untuk testing login sementara sebelum integrasi backend:

UMKM Account

-**Email:** `umkm@test.com`
-**Password:** `umkm123`
-**Role:** UMKM (Pemilik Usaha)
-**Dashboard:** `/dashboard-umkm`

## 💻 Developer Account

- **Email:** `developer@test.com`
- **Password:** `dev123`
- **Role:** Developer
- **Dashboard:** `/dashboard-developer`

## 👨‍💼 Admin Account

- **Email:** `admin@test.com`
- **Password:** `admin123`
- **Role:** Administrator
- **Dashboard:** `/dashboard-admin`

---

## 📝 Catatan

1. **Data Dummy:** Semua kredensial ini adalah data dummy untuk testing dan akan diganti saat integrasi dengan backend.

2. **Lokasi File:**
   - Data users: `src/data/dummyUsers.js`
   - Auth Context: `src/context/AuthContext.jsx`
   - Protected Routes: `src/components/ProtectedRoute.jsx`

3. **Fitur yang Sudah Diimplementasi:**
   - ✅ Login dengan validasi email & password
   - ✅ Auto redirect berdasarkan role setelah login
   - ✅ Protected routes (hanya bisa diakses jika sudah login dengan role yang sesuai)
   - ✅ Guest routes (redirect ke dashboard jika sudah login)
   - ✅ Persistent login (data tersimpan di localStorage)
   - ✅ Logout functionality
   - ✅ Quick demo login buttons di halaman login

4. **Testing:**
   - Buka halaman `/login`
   - Gunakan salah satu kredensial di atas
   - Atau klik tombol "Demo Login Cepat" untuk langsung login

5. **Role-Based Access Control:**
   - UMKM hanya bisa akses `/dashboard-umkm`
   - Developer hanya bisa akses `/dashboard-developer`
   - Admin hanya bisa akses `/dashboard-admin`
   - Jika mencoba akses dashboard lain, akan auto redirect ke dashboard sesuai role

6. **Untuk Integrasi Backend:**
   - Ganti fungsi `authenticateUser` di `src/data/dummyUsers.js` dengan API call
   - Update `login` function di `src/context/AuthContext.jsx` untuk handle token dari backend
   - Tambahkan refresh token mechanism jika diperlukan
   - Update `logout` untuk clear backend session

---

## 🔐 Security Notes

⚠️ **PENTING:**

- Password ini tidak di-hash karena hanya untuk demo/testing
- Jangan gunakan kredensial ini di production
- Saat integrasi backend, pastikan password di-hash (bcrypt, argon2, dll)
- Implementasikan JWT atau session-based authentication
- Tambahkan rate limiting untuk prevent brute force attacks
