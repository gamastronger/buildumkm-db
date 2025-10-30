# 🚀 BuildUMKM - Platform Digitalisasi UMKM

Platform website untuk menghubungkan UMKM dengan developer, membantu digitalisasi bisnis UMKM Indonesia.

## 📋 Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **PHP 7.4+** - Server-side language
- **MySQL** - Database
- **PDO** - Database abstraction layer
- **Session** - Authentication management

## 🎯 Fitur

### ✅ Sudah Selesai
- ✅ Landing page responsive
- ✅ Multi-role authentication (Admin, UMKM, Developer)
- ✅ Login & Register dengan backend PHP
- ✅ Session-based authentication
- ✅ Role-based dashboard access
- ✅ Password hashing (bcrypt)
- ✅ SQL injection prevention (PDO prepared statements)
- ✅ CORS configuration untuk React
- ✅ Protected routes

### 🚧 Dalam Pengembangan
- 🚧 Dashboard dengan data real
- 🚧 CRUD Projects
- 🚧 User profile management
- 🚧 File upload
- 🚧 Project assignment
- 🚧 Payment integration

## 📁 Struktur Project

```
buildumkm-db/
├── backend/                    # Backend PHP
│   ├── config/                # Konfigurasi
│   │   ├── database.php       # Koneksi database
│   │   ├── cors.php          # CORS setup
│   │   └── session.php       # Session management
│   ├── auth/                  # Authentication endpoints
│   │   ├── register.php
│   │   ├── login.php
│   │   ├── logout.php
│   │   └── check-session.php
│   ├── dashboard/            # Dashboard endpoints
│   │   ├── user.php
│   │   ├── developer.php
│   │   └── admin.php
│   ├── utils/                # Helper functions
│   ├── database.sql          # SQL schema & data
│   └── README.md            # Backend documentation
│
├── src/                      # Frontend React
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── context/            # React Context (Auth)
│   ├── services/           # API services
│   ├── config/             # Configuration
│   └── assets/             # Images & icons
│
├── docs/                    # Dokumentasi
│   ├── QUICK_START_BACKEND.md
│   ├── BACKEND_PHP_SETUP.md
│   └── BACKEND_INTEGRATION_SUMMARY.md
│
└── public/                  # Static assets
```

## 🚀 Quick Start

### Persyaratan
- Node.js 16+
- XAMPP/WAMP/MAMP (Apache + MySQL)
- Browser modern

### 1. Clone & Install Dependencies

```bash
# Clone repository (jika dari Git)
git clone <repository-url>
cd buildumkm-db

# Install dependencies
npm install
```

### 2. Setup Database

1. Start XAMPP/WAMP (Apache + MySQL)
2. Buka http://localhost/phpmyadmin
3. Buat database: `buildumkm_db`
4. Import file: `backend/database.sql`

**Detail:** Lihat `docs/QUICK_START_BACKEND.md`

### 3. Konfigurasi Backend

Edit `backend/config/database.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'buildumkm_db');
define('DB_USER', 'root');
define('DB_PASS', ''); // Kosong untuk XAMPP
```

### 4. Jalankan Aplikasi

```bash
# Start frontend
npm run dev
```

Buka browser: http://localhost:5173

## 🔑 Akun Login Default

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@buildumkm.com | admin123 |
| UMKM | umkm@test.com | password123 |
| Developer | developer@test.com | password123 |

## 📚 Dokumentasi

- **Quick Start:** `docs/QUICK_START_BACKEND.md` - Setup dalam 5 menit
- **Setup Guide:** `docs/BACKEND_PHP_SETUP.md` - Panduan lengkap step-by-step
- **Backend API:** `backend/README.md` - Dokumentasi API lengkap
- **Summary:** `docs/BACKEND_INTEGRATION_SUMMARY.md` - Overview integrasi

## 🧪 Testing

### Test Login
```
1. Buka http://localhost:5173
2. Klik "Login"
3. Klik "Admin Demo" (atau role lain)
4. Harus redirect ke dashboard
```

### Test Register
```
1. Klik "Register"
2. Pilih role (UMKM/Developer)
3. Isi form dengan data valid
4. Submit → auto-login → redirect
```

## 🐛 Troubleshooting

### Database Connection Failed
- Pastikan MySQL running di XAMPP/WAMP
- Cek username/password di `backend/config/database.php`
- Verifikasi database `buildumkm_db` sudah dibuat

### CORS Error
- Cek `backend/config/cors.php`
- Pastikan `http://localhost:5173` ada di allowed origins
- Restart Apache setelah edit

### 404 Not Found
- Cek path di `src/services/authService.js`
- Sesuaikan `PHP_BACKEND_URL` dengan lokasi folder Anda
- Default: `http://localhost/buildumkm-db/backend`

**Troubleshooting lengkap:** Lihat `docs/BACKEND_PHP_SETUP.md`

## 🔒 Security

- ✅ Password hashing dengan bcrypt
- ✅ SQL injection prevention (PDO prepared statements)
- ✅ XSS prevention (input sanitization)
- ✅ CSRF protection (session httponly)
- ✅ Role-based access control
- ✅ Session security (regeneration on login)

## 📞 Support & Kontribusi

Jika menemukan bug atau punya saran:
1. Cek dokumentasi terlebih dahulu
2. Lihat troubleshooting guide
3. Buat issue di repository (jika menggunakan Git)

## 📝 License

[Tentukan license Anda - MIT/Apache/etc]

## 👥 Tim

BuildUMKM - Platform untuk Digitalisasi UMKM Indonesia

---

**🚀 Happy Coding!**
