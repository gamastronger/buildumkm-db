# 🚀 PANDUAN SETUP CEPAT - BuildUMKM Backend PHP

Ikuti langkah-langkah ini untuk setup backend PHP dari awal hingga testing.

## ✅ CHECKLIST PERSIAPAN

- [ ] XAMPP/WAMP sudah terinstall
- [ ] Apache dan MySQL sudah running
- [ ] Browser sudah terbuka
- [ ] Code editor siap (VS Code)

---

## 📌 LANGKAH 1: Setup Database (5 menit)

### 1.1 Buka phpMyAdmin
```
http://localhost/phpmyadmin
```

### 1.2 Buat Database Baru
1. Klik tab **"Databases"**
2. **Nama:** `buildumkm_db`
3. **Collation:** `utf8mb4_unicode_ci`
4. Klik **"Create"**

### 1.3 Import Data
1. Pilih database `buildumkm_db` (klik nama database di sidebar kiri)
2. Klik tab **"SQL"**
3. Buka file: `backend/database.sql` di VS Code
4. **Copy semua isinya** (Ctrl+A, Ctrl+C)
5. **Paste** ke textarea SQL di phpMyAdmin
6. Klik **"Go"**

### 1.4 Verifikasi
Jalankan query ini di tab SQL:
```sql
SELECT * FROM users;
```

**✅ Berhasil jika:** Muncul tabel dengan 5 user (1 admin, 2 UMKM, 2 developer)

---

## 📌 LANGKAH 2: Konfigurasi Backend (2 menit)

### 2.1 Cek Lokasi Project

Pastikan folder project Anda ada di:
```
C:\xampp\htdocs\buildumkm-db
```

Jika berbeda, catat path-nya (akan dipakai nanti).

### 2.2 Edit Database Config (Jika Perlu)

Buka: `backend/config/database.php`

**Default (XAMPP):**
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'buildumkm_db');
define('DB_USER', 'root');
define('DB_PASS', ''); // Kosong untuk XAMPP
```

**Untuk MAMP (Mac):**
```php
define('DB_PASS', 'root'); // MAMP biasanya password = root
```

### 2.3 Test Koneksi Database

Buka di browser:
```
http://localhost/buildumkm-db/backend/config/database.php
```

Edit `backend/config/database.php`, uncomment baris terakhir:
```php
// Uncomment baris berikut untuk test koneksi
if (testDBConnection()) {
    echo "Database connected successfully!";
} else {
    echo "Database connection failed!";
}
```

Refresh browser.

**✅ Berhasil jika:** Muncul "Database connected successfully!"

**❌ Jika gagal:**
- Cek MySQL sudah running
- Cek username/password di config
- Cek database sudah dibuat

---

## 📌 LANGKAH 3: Konfigurasi Frontend (1 menit)

### 3.1 Edit Backend URL

Buka: `src/services/authService.js`

Cari baris:
```javascript
const PHP_BACKEND_URL = 'http://localhost/buildumkm-db/backend';
```

**Sesuaikan dengan lokasi project Anda:**

| Lokasi Project | Backend URL |
|----------------|-------------|
| `C:\xampp\htdocs\buildumkm-db` | `http://localhost/buildumkm-db/backend` ✅ |
| `C:\xampp\htdocs\myproject` | `http://localhost/myproject/backend` |
| `C:\wamp64\www\buildumkm-db` | `http://localhost/buildumkm-db/backend` ✅ |

---

## 📌 LANGKAH 4: Jalankan Aplikasi (1 menit)

### 4.1 Start Backend
Pastikan di XAMPP/WAMP:
- ✅ Apache: Running (hijau)
- ✅ MySQL: Running (hijau)

### 4.2 Start Frontend
Buka terminal di folder project:

```bash
npm run dev
```

**✅ Berhasil jika:** Muncul URL seperti:
```
  ➜  Local:   http://localhost:5173/
```

---

## 📌 LANGKAH 5: Testing (3 menit)

### 5.1 Test Login dari Frontend

1. Buka browser: `http://localhost:5173`
2. Klik tombol **"Login"**
3. Scroll ke bawah, lihat **"Demo Login Cepat"**
4. Klik **"Admin Demo"**

**✅ Berhasil jika:**
- Loading spinner muncul sebentar
- Redirect ke `/dashboard-admin`
- Muncul halaman Dashboard Admin

**❌ Jika error:**
- Buka Console (F12) dan lihat error
- Biasanya CORS error atau 404
- Pastikan backend URL sudah benar

### 5.2 Test Semua Role

Coba login dengan akun berikut:

| Role | Email | Password | Redirect |
|------|-------|----------|----------|
| **Admin** | admin@buildumkm.com | admin123 | /dashboard-admin |
| **UMKM** | umkm@test.com | password123 | /dashboard-umkm |
| **Developer** | developer@test.com | password123 | /dashboard-developer |

### 5.3 Test Register

1. Logout (jika sedang login)
2. Klik **"Register"**
3. Pilih **"Saya UMKM"** atau **"Saya Developer"**
4. Isi form:
   - **Nama:** Test User Baru
   - **Email:** testbaru@gmail.com
   - **Password:** password123
   - **Konfirmasi:** password123
5. Centang Terms & Conditions
6. Klik **"Daftar Sekarang"**

**✅ Berhasil jika:**
- Loading muncul
- Auto login
- Redirect ke dashboard sesuai role yang dipilih

### 5.4 Verifikasi di Database

Buka phpMyAdmin, jalankan:
```sql
SELECT * FROM users ORDER BY id DESC;
```

**✅ Berhasil jika:** User baru yang Anda daftarkan muncul di list teratas.

---

## 📌 LANGKAH 6: Test API dengan Postman (OPSIONAL)

### 6.1 Test Login API

**Method:** POST  
**URL:** `http://localhost/buildumkm-db/backend/auth/login.php`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "admin@buildumkm.com",
  "password": "admin123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin BuildUMKM",
      "email": "admin@buildumkm.com",
      "role": "admin",
      "created_at": "..."
    },
    "redirect": "/dashboard-admin"
  }
}
```

### 6.2 Test Register API

**Method:** POST  
**URL:** `http://localhost/buildumkm-db/backend/auth/register.php`

**Body (JSON):**
```json
{
  "name": "Test API",
  "email": "testapi@example.com",
  "password": "password123",
  "role": "user"
}
```

---

## 🐛 Troubleshooting Umum

### ❌ Error: "CORS policy blocked"

**Penyebab:** Frontend tidak diizinkan akses ke backend

**Solusi:**
1. Buka: `backend/config/cors.php`
2. Cek array `$allowedOrigins`
3. Pastikan ada: `'http://localhost:5173'`
4. Restart Apache

### ❌ Error: "Database connection failed"

**Penyebab:** Koneksi ke MySQL gagal

**Solusi:**
1. Cek MySQL running di XAMPP/WAMP
2. Cek `backend/config/database.php`:
   - Username default: `root`
   - Password default XAMPP: kosong
   - Password default MAMP: `root`
3. Cek database `buildumkm_db` sudah dibuat

### ❌ Error: "404 Not Found"

**Penyebab:** Backend URL salah

**Solusi:**
1. Cek lokasi folder project
2. Update `PHP_BACKEND_URL` di `authService.js`
3. Test langsung di browser:
   ```
   http://localhost/buildumkm-db/backend/auth/login.php
   ```
   Jika 404, berarti path salah

### ❌ Login berhasil tapi tidak redirect

**Penyebab:** Role tidak sesuai dengan route

**Solusi:**
1. Cek console browser (F12)
2. Periksa response dari login API
3. Pastikan route dashboard sudah ada di `App.jsx`

### ❌ Session tidak tersimpan

**Penyebab:** Cookie tidak ter-set

**Solusi:**
1. Buka DevTools > Application > Cookies
2. Pastikan ada cookie `BUILDUMKM_SESSION`
3. Cek `credentials: 'include'` di fetch frontend

---

## ✅ CHECKLIST SELESAI

Jika semua langkah di atas berhasil:

- [x] Database terbuat dan terisi data
- [x] Backend config sudah sesuai
- [x] Frontend config sudah sesuai
- [x] Login admin berhasil → redirect /dashboard-admin
- [x] Login UMKM berhasil → redirect /dashboard-umkm
- [x] Login developer berhasil → redirect /dashboard-developer
- [x] Register user baru berhasil
- [x] User baru muncul di database

**🎉 SELAMAT! Backend PHP sudah terintegrasi dengan sukses!**

---

## 📚 Next Steps

Sekarang backend autentikasi sudah jalan, Anda bisa:

1. **Develop Dashboard Real Data** - Replace dummy data dengan data dari database
2. **CRUD Projects** - Buat backend untuk manage projects
3. **User Profile** - Buat endpoint update profile
4. **File Upload** - Implement upload gambar/file
5. **Deploy ke Production** - Deploy ke hosting dengan PHP & MySQL support

---

**Happy Coding! 🚀**

Jika ada pertanyaan atau error, cek `backend/README.md` untuk dokumentasi lengkap.
