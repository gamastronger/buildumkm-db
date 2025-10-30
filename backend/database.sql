-- =============================================
-- BuildUMKM Database Schema
-- =============================================
-- Untuk dijalankan di phpMyAdmin
-- 
-- LANGKAH INSTALASI:
-- 1. Buka phpMyAdmin (http://localhost/phpmyadmin)
-- 2. Buat database baru bernama 'buildumkm_db'
-- 3. Pilih database tersebut
-- 4. Buka tab "SQL"
-- 5. Copy-paste script ini dan klik "Go"
-- =============================================

-- Buat database (jika belum ada)
CREATE DATABASE IF NOT EXISTS buildumkm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Gunakan database
USE buildumkm_db;

-- =============================================
-- Tabel: users
-- =============================================
-- Menyimpan data semua user (UMKM, Developer, Admin)
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'developer', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Insert Data Admin Default
-- =============================================
-- Password untuk semua akun adalah: admin123
-- Hash dibuat dengan PHP password_hash()
-- =============================================
INSERT INTO users (name, email, password, role) VALUES
('Admin BuildUMKM', 'admin@buildumkm.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- =============================================
-- Insert Data Testing (OPSIONAL)
-- =============================================
-- Uncomment untuk menambahkan data testing
-- Password untuk semua akun testing: password123
-- =============================================

-- User/UMKM Testing
INSERT INTO users (name, email, password, role) VALUES
('Ibu Siti', 'umkm@test.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user'),
('Bapak Joko', 'joko@umkm.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- Developer Testing
INSERT INTO users (name, email, password, role) VALUES
('Budi Santoso', 'developer@test.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'developer'),
('Andi Wijaya', 'andi@dev.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'developer');

-- =============================================
-- Verifikasi Data
-- =============================================
-- Jalankan query berikut untuk memastikan data sudah masuk:
-- SELECT * FROM users;
-- =============================================

-- =============================================
-- INFORMASI LOGIN DEFAULT
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
