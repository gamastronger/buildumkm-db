# ⚡ QUICK START - BuildUMKM dengan Backend PHP

Panduan singkat untuk menjalankan project BuildUMKM dengan backend PHP dalam waktu 5 menit!

## 🎯 Prerequisites

- ✅ XAMPP/WAMP sudah terinstall
- ✅ Node.js sudah terinstall
- ✅ Dependencies frontend sudah ter-install (`npm install`)

## 🚀 5 Langkah Setup

### 1️⃣ Start XAMPP/WAMP (30 detik)

1. Buka **XAMPP/WAMP Control Panel**
2. Klik **Start Apache**
3. Klik **Start MySQL**
4. Tunggu sampai status hijau

### 2️⃣ Setup Database (2 menit)

1. Buka browser: **http://localhost/phpmyadmin**
2. Klik **"New"** di sidebar kiri
3. Nama database: `buildumkm_db`
4. Klik **"Create"**
5. Pilih database `buildumkm_db` (klik namanya)
6. Klik tab **"SQL"**
7. Buka file `backend/database.sql` di VS Code
8. Copy semua isinya (Ctrl+A, Ctrl+C)
9. Paste ke textarea di phpMyAdmin
10. Klik **"Go"**

**✅ Selesai!** Database dan user default sudah siap.

### 3️⃣ Cek Konfigurasi (30 detik)

#### Cek Backend Config

Buka `backend/config/database.php`, pastikan:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'buildumkm_db');
define('DB_USER', 'root');
define('DB_PASS', ''); // Kosong untuk XAMPP
```

#### Cek Frontend Config

Buka `src/services/authService.js`, pastikan:

```javascript
const PHP_BACKEND_URL = 'http://localhost/buildumkm-db/backend';
```

**Sesuaikan** jika folder Anda bukan di `C:\xampp\htdocs\buildumkm-db`

### 4️⃣ Start Frontend (30 detik)

Buka terminal di folder project:

```bash
npm run dev
```

Tunggu sampai muncul:
```
  ➜  Local:   http://localhost:5173/
```

### 5️⃣ Test Login (1 menit)

1. Buka browser: **http://localhost:5173**
2. Klik **"Login"**
3. Scroll ke bawah
4. Klik **"Admin Demo"** (atau role lainnya)

**✅ Berhasil!** Jika redirect ke dashboard, berarti sudah jalan!

---

## 🔑 Akun Login Default

### Admin
- **Email:** admin@buildumkm.com
- **Password:** admin123
- **Dashboard:** /dashboard-admin

### UMKM (Testing)
- **Email:** umkm@test.com
- **Password:** password123
- **Dashboard:** /dashboard-umkm

### Developer (Testing)
- **Email:** developer@test.com
- **Password:** password123
- **Dashboard:** /dashboard-developer

---

## 🧪 Quick Test

### Test 1: Login ✅
1. Login dengan salah satu akun di atas
2. Harus redirect ke dashboard sesuai role

### Test 2: Register ✅
1. Logout (jika sudah login)
2. Klik **"Register"**
3. Pilih role (**Saya UMKM** atau **Saya Developer**)
4. Isi form dengan data valid
5. Klik **"Daftar Sekarang"**
6. Harus auto-login dan redirect

### Test 3: Logout ✅
1. Dari dashboard, klik **"Logout"** (jika ada button)
2. Atau akses URL: http://localhost:5173/login
3. Harus kembali ke halaman login

---

## 🐛 Troubleshooting Cepat

### ❌ Error: "Database connection failed"

**Cek:**
1. MySQL sudah running? (Lihat XAMPP/WAMP control panel)
2. Database `buildumkm_db` sudah dibuat?
3. Username/password di `backend/config/database.php` benar?

**Fix:**
```php
// Untuk MAMP (Mac), password biasanya 'root'
define('DB_PASS', 'root');
```

### ❌ Error: "CORS policy blocked"

**Cek:**
1. Buka `backend/config/cors.php`
2. Pastikan ada: `'http://localhost:5173'` di array `$allowedOrigins`

### ❌ Error: "404 Not Found"

**Cek:**
1. Folder project ada di mana?
2. Update `PHP_BACKEND_URL` di `src/services/authService.js`

Contoh:
- Jika di `C:\xampp\htdocs\myproject`:
  ```javascript
  const PHP_BACKEND_URL = 'http://localhost/myproject/backend';
  ```

### ❌ Login berhasil tapi tidak redirect

**Cek:**
1. Buka Console browser (F12)
2. Lihat ada error?
3. Pastikan route dashboard ada di `src/App.jsx`

---

## 📚 Dokumentasi Lengkap

Untuk panduan detail, lihat:

- **`backend/README.md`** - Dokumentasi lengkap backend
- **`docs/BACKEND_PHP_SETUP.md`** - Setup step-by-step
- **`docs/BACKEND_INTEGRATION_SUMMARY.md`** - Summary integrasi

---

## 🎉 Selamat!

Jika semua test di atas berhasil, **backend PHP sudah terintegrasi dengan sukses!**

Sekarang Anda bisa:
- ✅ Login/Register dengan database real
- ✅ Session management yang aman
- ✅ Role-based dashboard access
- ✅ Develop fitur baru dengan confidence

**Happy Coding! 🚀**
