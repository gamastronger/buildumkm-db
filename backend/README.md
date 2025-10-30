# 🚀 BuildUMKM Backend - PHP

Backend sederhana untuk sistem autentikasi BuildUMKM menggunakan PHP procedural, PDO, dan MySQL.

## 📁 Struktur Folder

```
backend/
├── config/
│   ├── database.php      # Konfigurasi koneksi database
│   ├── cors.php          # Konfigurasi CORS untuk React
│   └── session.php       # Manajemen session
├── auth/
│   ├── register.php      # Endpoint registrasi
│   ├── login.php         # Endpoint login
│   ├── logout.php        # Endpoint logout
│   └── check-session.php # Endpoint cek session
├── dashboard/
│   ├── user.php          # Dashboard untuk UMKM
│   ├── developer.php     # Dashboard untuk Developer
│   └── admin.php         # Dashboard untuk Admin
├── utils/
│   ├── response.php      # Helper untuk JSON response
│   └── validation.php    # Helper untuk validasi
├── .htaccess             # Konfigurasi Apache
├── database.sql          # Script SQL untuk setup database
└── README.md             # Dokumentasi ini
```

## 🛠️ Teknologi

- **PHP 7.4+** - Server-side language
- **MySQL 5.7+** - Database
- **PDO** - Database connection (prepared statements)
- **Session** - Authentication management
- **CORS** - Cross-Origin Resource Sharing untuk React

## 📋 Persiapan & Instalasi

### 1. Persyaratan Sistem

- **XAMPP** / **WAMP** / **MAMP** / **LAMP**
- **PHP 7.4 atau lebih tinggi**
- **MySQL 5.7 atau lebih tinggi**
- **Apache** dengan mod_rewrite enabled

### 2. Setup Database

#### Langkah A: Buka phpMyAdmin
1. Jalankan **XAMPP/WAMP** Control Panel
2. Start **Apache** dan **MySQL**
3. Buka browser, akses: `http://localhost/phpmyadmin`

#### Langkah B: Buat Database
1. Klik tab **"Databases"**
2. Nama database: `buildumkm_db`
3. Collation: `utf8mb4_unicode_ci`
4. Klik **"Create"**

#### Langkah C: Import SQL
1. Pilih database `buildumkm_db`
2. Klik tab **"SQL"**
3. Buka file `backend/database.sql`
4. Copy semua isinya
5. Paste ke textarea SQL di phpMyAdmin
6. Klik **"Go"**

#### Langkah D: Verifikasi
Jalankan query ini untuk memastikan data sudah masuk:
```sql
SELECT * FROM users;
```

Anda harus melihat minimal 1 user admin dan beberapa data testing.

### 3. Konfigurasi Backend

#### Edit `backend/config/database.php`

Sesuaikan dengan konfigurasi MySQL Anda:

```php
define('DB_HOST', 'localhost');      // Host MySQL
define('DB_NAME', 'buildumkm_db');   // Nama database
define('DB_USER', 'root');           // Username MySQL
define('DB_PASS', '');               // Password MySQL (kosongkan jika default)
```

**Untuk XAMPP default:** Biasanya username = `root` dan password = kosong  
**Untuk MAMP:** Username = `root`, Password = `root`  
**Untuk production:** Gunakan username dan password yang aman!

#### Edit `backend/config/cors.php`

Sesuaikan allowed origins dengan URL frontend Anda:

```php
$allowedOrigins = [
    'http://localhost:5173',      // Vite default
    'http://localhost:3000',      // Alternative port
    // Tambahkan domain production Anda
];
```

### 4. Setup Frontend Integration

#### Edit `src/services/authService.js`

Pastikan `PHP_BACKEND_URL` sesuai dengan lokasi folder backend Anda:

```javascript
const PHP_BACKEND_URL = 'http://localhost/buildumkm-db/backend';
```

**Catatan:**
- Jika folder project di `C:\xampp\htdocs\buildumkm-db`, maka URL sudah benar
- Jika folder berbeda, sesuaikan path-nya

### 5. Jalankan Aplikasi

#### Terminal 1: Start Backend
```bash
# Pastikan Apache dan MySQL sudah running di XAMPP/WAMP
```

#### Terminal 2: Start Frontend
```bash
npm run dev
```

Aplikasi akan berjalan di:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost/buildumkm-db/backend

## 🔐 Akun Default

### Admin
- **Email:** admin@buildumkm.com
- **Password:** admin123
- **Redirect:** /dashboard-admin

### UMKM (Testing)
- **Email:** umkm@test.com
- **Password:** password123
- **Redirect:** /dashboard-umkm

### Developer (Testing)
- **Email:** developer@test.com
- **Password:** password123
- **Redirect:** /dashboard-developer

## 🧪 Testing

### 1. Test Database Connection

Buka di browser:
```
http://localhost/buildumkm-db/backend/config/database.php
```

Uncomment baris terakhir di `database.php`:
```php
if (testDBConnection()) {
    echo "Database connected successfully!";
} else {
    echo "Database connection failed!";
}
```

Jika muncul "Database connected successfully!" berarti koneksi berhasil.

### 2. Test Login Endpoint

Buka **Postman** atau **Thunder Client**:

**POST** `http://localhost/buildumkm-db/backend/auth/login.php`

Headers:
```
Content-Type: application/json
```

Body (JSON):
```json
{
  "email": "admin@buildumkm.com",
  "password": "admin123"
}
```

Response yang diharapkan:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin BuildUMKM",
      "email": "admin@buildumkm.com",
      "role": "admin"
    },
    "redirect": "/dashboard-admin"
  }
}
```

### 3. Test Register Endpoint

**POST** `http://localhost/buildumkm-db/backend/auth/register.php`

Body (JSON):
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123",
  "role": "user"
}
```

### 4. Test dari Frontend

1. Buka http://localhost:5173
2. Klik **"Login"**
3. Coba klik salah satu tombol **"Demo Login Cepat"**
4. Jika berhasil, Anda akan di-redirect ke dashboard sesuai role

## 🐛 Troubleshooting

### Error: "Database connection failed"

**Solusi:**
1. Cek apakah MySQL sudah running
2. Periksa username dan password di `config/database.php`
3. Pastikan database `buildumkm_db` sudah dibuat
4. Coba test koneksi manual lewat phpMyAdmin

### Error: "CORS policy blocked"

**Solusi:**
1. Periksa `backend/config/cors.php`
2. Pastikan URL frontend ada di `$allowedOrigins`
3. Restart Apache setelah edit file

### Error: "Session not working"

**Solusi:**
1. Pastikan di setiap endpoint sudah ada `require_once '../config/session.php';`
2. Cek apakah cookie session ter-set di browser (DevTools > Application > Cookies)
3. Pastikan `credentials: 'include'` di fetch frontend

### Error: "404 Not Found"

**Solusi:**
1. Pastikan folder backend ada di htdocs
2. Cek path di `authService.js` sudah benar
3. Coba akses langsung: `http://localhost/buildumkm-db/backend/auth/login.php`

### Login berhasil tapi redirect gagal

**Solusi:**
1. Cek response dari backend, pastikan ada field `redirect`
2. Periksa route di `App.jsx` sudah sesuai dengan path redirect
3. Cek console browser untuk error JavaScript

## 🔒 Security Best Practices

### Untuk Development
- ✅ Menggunakan password_hash() dengan bcrypt
- ✅ Prepared statements PDO (SQL injection prevention)
- ✅ Session dengan httponly cookies
- ✅ Input validation dan sanitization
- ✅ CORS configuration

### Untuk Production
- 🔐 Ubah password database yang kuat
- 🔐 Set `display_errors = Off` di php.ini
- 🔐 Gunakan HTTPS untuk semua request
- 🔐 Implement rate limiting untuk login
- 🔐 Set session cookie dengan `secure` flag
- 🔐 Backup database secara berkala
- 🔐 Update allowed origins di CORS ke domain production only

## 📚 API Endpoints

### Authentication

#### POST /auth/register.php
Registrasi user baru (role: user, developer)

**Request:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 6 chars)",
  "role": "user | developer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... }
  }
}
```

#### POST /auth/login.php
Login untuk semua role

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "redirect": "/dashboard-xxx"
  }
}
```

#### POST /auth/logout.php
Logout dan destroy session

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### GET /auth/check-session.php
Cek apakah user masih login

**Response:**
```json
{
  "success": true,
  "message": "Session is valid",
  "data": {
    "user": { ... },
    "isAuthenticated": true
  }
}
```

### Dashboard

#### GET /dashboard/user.php
Dashboard untuk role 'user' (UMKM)

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "stats": { ... },
    "recentProjects": [ ... ]
  }
}
```

#### GET /dashboard/developer.php
Dashboard untuk role 'developer'

#### GET /dashboard/admin.php
Dashboard untuk role 'admin'

## 📞 Support

Jika ada pertanyaan atau issue:
1. Cek dokumentasi ini terlebih dahulu
2. Cek troubleshooting section
3. Lihat error log di browser console dan PHP error log

## 📝 Next Steps

Setelah autentikasi berfungsi, Anda bisa expand backend dengan:

1. **Projects Management** - CRUD untuk project UMKM
2. **User Profile** - Update profil, foto, dll
3. **File Upload** - Upload gambar produk, portfolio
4. **Notifications** - Sistem notifikasi
5. **API untuk Dashboard** - Data real untuk dashboard

---

**Happy Coding! 🚀**
