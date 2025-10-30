# Kredensial Admin BuildUMKM

## ⚠️ TROUBLESHOOTING: Error 401 Unauthorized

Jika Anda mendapat error **401 Unauthorized** saat login admin, kemungkinan password di database tidak sesuai. Ikuti langkah berikut:

### Cara 1: Generate Hash Password Baru (Recommended)

1. Buka browser: `http://localhost/buildumkm-db/backend/generate_password.php`
2. Copy hash password untuk `admin123` yang baru di-generate
3. Buka phpMyAdmin: `http://localhost/phpmyadmin`
4. Pilih database: `buildumkm_db`
5. Pilih tabel: `users`
6. Edit baris admin (email: `admin@buildumkm.com`)
7. Paste hash baru ke kolom `password`
8. Klik "Go"
9. Coba login lagi

### Cara 2: Update via SQL Query

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Pilih database: `buildumkm_db`
3. Klik tab "SQL"
4. Jalankan query berikut:

```sql
-- Update password admin menjadi 'admin123'
UPDATE users 
SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE email = 'admin@buildumkm.com';
```

5. Klik "Go"
6. Coba login lagi

---

## Login Admin

Untuk mengakses Dashboard Admin, gunakan kredensial berikut:

```
Email: admin@buildumkm.com
Password: admin123
```

## Hak Akses Admin

Admin memiliki hak akses penuh untuk:
- ✅ Melihat dan mengelola semua pengguna (UMKM dan Developer)
- ✅ Memvalidasi dan menyetujui proyek yang diselesaikan
- ✅ Mengelola sistem pembagian fee (70% Developer / 30% Platform)
- ✅ Melihat statistik dan laporan platform
- ✅ Mengakses semua fitur manajemen platform

## Catatan Keamanan

⚠️ **PENTING:**
- Kredensial admin ini hanya untuk development/testing
- Untuk production, segera ubah password admin melalui database
- Jangan bagikan kredensial ini ke publik
- Admin TIDAK bisa register melalui form register (harus dibuat manual di database)

## Cara Menambah Admin Baru (Manual via Database)

Jika ingin menambahkan admin baru, jalankan query SQL berikut di phpMyAdmin:

```sql
INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES (
  'Nama Admin Baru',
  'emailadmin@example.com',
  '$2y$10$hashedPasswordDisini',  -- Password harus di-hash dengan bcrypt
  'admin',
  NOW(),
  NOW()
);
```

Untuk hash password, bisa menggunakan PHP:
```php
<?php
echo password_hash('password_baru', PASSWORD_BCRYPT);
?>
```

## Akses Dashboard

Setelah login, admin akan otomatis diarahkan ke:
```
http://localhost:5173/dashboard-admin
```

---

**Last Updated:** 31 Oktober 2025
