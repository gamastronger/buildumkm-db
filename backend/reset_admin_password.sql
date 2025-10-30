-- Reset Password Admin
-- Copy dan jalankan query ini di phpMyAdmin (tab SQL)

UPDATE users 
SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE email = 'admin@buildumkm.com';
