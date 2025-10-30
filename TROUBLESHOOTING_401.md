# 🔧 Troubleshooting: Error 401 Unauthorized saat Login

## Masalah
Saat mencoba login dengan kredensial admin, muncul error:
```
Status Code: 401 Unauthorized
```

## Penyebab
Password yang tersimpan di database tidak sesuai dengan yang Anda masukkan, atau hash password rusak/berbeda.

## Solusi Cepat (Pilih salah satu)

### ✅ Solusi 1: Gunakan Password Generator (Paling Mudah)

1. Buka di browser:
   ```
   http://localhost/buildumkm-db/backend/generate_password.php
   ```

2. Copy hash password baru untuk `admin123`

3. Buka phpMyAdmin:
   ```
   http://localhost/phpmyadmin
   ```

4. Pilih database `buildumkm_db` → tabel `users`

5. Edit baris dengan email `admin@buildumkm.com`

6. Paste hash baru ke kolom `password`, klik "Go"

7. **Selesai!** Coba login lagi dengan:
   - Email: `admin@buildumkm.com`
   - Password: `admin123`

---

### ✅ Solusi 2: Reset Password via SQL

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`

2. Pilih database `buildumkm_db`

3. Klik tab "SQL"

4. Copy-paste dan jalankan query ini:

```sql
UPDATE users 
SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE email = 'admin@buildumkm.com';
```

5. Klik "Go"

6. **Selesai!** Coba login lagi

---

### ✅ Solusi 3: Import Ulang Database (Jika semua gagal)

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`

2. Pilih database `buildumkm_db`

3. Klik tab "Import"

4. Pilih file: `backend/database.sql`

5. Klik "Go"

6. Database akan direset dengan password default

---

## Kredensial Default Setelah Reset

**Admin:**
- Email: `admin@buildumkm.com`
- Password: `admin123`

**User UMKM (Testing):**
- Email: `umkm@test.com`
- Password: `password123`

**Developer (Testing):**
- Email: `developer@test.com`
- Password: `password123`

---

## Catatan Penting

⚠️ **Jika masih error setelah reset password:**

1. Pastikan XAMPP/Apache sudah running
2. Pastikan Vite dev server sudah running (`npm run dev`)
3. Clear browser cache (Ctrl + Shift + Delete)
4. Clear localStorage: 
   - Buka Console (F12)
   - Ketik: `localStorage.clear()`
   - Refresh halaman (F5)

---

**Last Updated:** 31 Oktober 2025
