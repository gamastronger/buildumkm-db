-- =============================================
-- Reset Password Admin BuildUMKM
-- =============================================
-- Jalankan script ini di phpMyAdmin jika lupa password admin
-- atau mendapat error 401 Unauthorized saat login
-- =============================================

USE buildumkm_db;

-- Reset password admin menjadi: admin123
UPDATE users 
SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE email = 'admin@buildumkm.com';

-- Reset password user testing menjadi: password123
UPDATE users 
SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE email = 'umkm@test.com';

-- Reset password developer testing menjadi: password123
UPDATE users 
SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE email = 'developer@test.com';

-- Verifikasi hasil update
SELECT id, name, email, role, 
       LEFT(password, 20) as password_hash,
       created_at, updated_at 
FROM users 
WHERE email IN ('admin@buildumkm.com', 'umkm@test.com', 'developer@test.com');

-- =============================================
-- HASIL YANG DIHARAPKAN:
-- =============================================
-- Admin:
--   Email: admin@buildumkm.com
--   Password: admin123
--
-- User/UMKM (testing):
--   Email: umkm@test.com
--   Password: password123
--
-- Developer (testing):
--   Email: developer@test.com
--   Password: password123
-- =============================================
