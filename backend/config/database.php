<?php
/**
 * Database Configuration untuk BuildUMKM
 * 
 * File ini menghandle koneksi database menggunakan PDO
 * PDO lebih aman dari mysqli karena support prepared statements
 */

// Konfigurasi Database
// Sesuaikan dengan setting phpMyAdmin Anda
define('DB_HOST', 'localhost');
define('DB_NAME', 'buildumkm_db');
define('DB_USER', 'root');
define('DB_PASS', ''); // Kosongkan jika tidak ada password (default XAMPP/WAMP)

/**
 * Fungsi untuk mendapatkan koneksi database
 * 
 * @return PDO|null Database connection atau null jika gagal
 */
function getDBConnection() {
    try {
        // DSN (Data Source Name) untuk MySQL
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        
        // Options untuk PDO
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Throw exception on error
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Fetch sebagai associative array
            PDO::ATTR_EMULATE_PREPARES   => false,                  // Gunakan real prepared statements
        ];
        
        // Buat koneksi PDO
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        
        return $pdo;
        
    } catch (PDOException $e) {
        // Log error (dalam production, jangan tampilkan error detail ke user)
        error_log("Database Connection Error: " . $e->getMessage());
        
        // Return null jika koneksi gagal
        return null;
    }
}

/**
 * Test koneksi database
 * Fungsi helper untuk mengecek apakah database bisa terkoneksi
 * 
 * @return bool True jika berhasil, false jika gagal
 */
function testDBConnection() {
    $conn = getDBConnection();
    if ($conn === null) {
        return false;
    }
    return true;
}

// Uncomment baris berikut untuk test koneksi
// if (testDBConnection()) {
//     echo "Database connected successfully!";
// } else {
//     echo "Database connection failed!";
// }
?>
