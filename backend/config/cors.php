<?php
/**
 * CORS Configuration
 * 
 * Menghandle Cross-Origin Resource Sharing untuk komunikasi
 * antara frontend (React) dan backend (PHP)
 */

// Allowed origins (sesuaikan dengan URL frontend Anda)
$allowedOrigins = [
    'http://localhost:5173',      // Vite dev server default
    'http://localhost:3000',      // Alternative port
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    // Tambahkan domain production Anda di sini
    // 'https://yourdomain.com'
];

// Get origin dari request
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Check jika origin diizinkan
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Default fallback untuk development
    header("Access-Control-Allow-Origin: http://localhost:5173");
}

// Allow credentials (untuk cookie/session)
header("Access-Control-Allow-Credentials: true");

// Allowed methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allowed headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Max age untuk preflight request
header("Access-Control-Max-Age: 3600");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Set content type untuk JSON
header('Content-Type: application/json; charset=UTF-8');
?>
