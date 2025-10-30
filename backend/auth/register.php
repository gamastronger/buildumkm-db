<?php
/**
 * Register Endpoint
 * 
 * Handle registrasi user baru (role: user, developer)
 * Admin TIDAK bisa register, hanya dibuat manual di database
 */

// Include required files
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../config/session.php';
require_once '../utils/response.php';
require_once '../utils/validation.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Validasi required fields
    $requiredFields = ['name', 'email', 'password', 'role'];
    $errors = validateRequired($data, $requiredFields);
    
    if (!empty($errors)) {
        sendValidationError($errors);
    }
    
    // Sanitize input
    $name = sanitizeString($data['name']);
    $email = sanitizeEmail($data['email']);
    $password = $data['password'];
    $role = sanitizeString($data['role']);
    
    // Validasi email
    if (!validateEmail($email)) {
        sendError('Invalid email format', 422);
    }
    
    // Validasi password
    if (!validatePassword($password)) {
        sendError('Password must be at least 6 characters', 422);
    }
    
    // Validasi role - ADMIN TIDAK BOLEH REGISTER
    if ($role === 'admin') {
        sendError('Cannot register as admin. Admin accounts must be created manually.', 403);
    }
    
    if (!in_array($role, ['user', 'developer'])) {
        sendError('Invalid role. Allowed roles: user, developer', 422);
    }
    
    // Get database connection
    $db = getDBConnection();
    if ($db === null) {
        sendError('Database connection failed', 500);
    }
    
    // Check jika email sudah terdaftar
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        sendError('Email already registered', 409);
    }
    
    // Hash password menggunakan bcrypt
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
    // Insert user baru ke database
    $stmt = $db->prepare("
        INSERT INTO users (name, email, password, role, created_at) 
        VALUES (?, ?, ?, ?, NOW())
    ");
    
    $stmt->execute([$name, $email, $hashedPassword, $role]);
    
    // Get ID user yang baru dibuat
    $userId = $db->lastInsertId();
    
    // Get user data
    $stmt = $db->prepare("SELECT id, name, email, role, created_at FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    
    // Auto login setelah register - set session
    setUserSession($user);
    
    // Send success response
    sendSuccess([
        'user' => $user,
        'message' => 'Registration successful'
    ], 'Registration successful', 201);
    
} catch (PDOException $e) {
    // Log database error
    error_log("Database Error: " . $e->getMessage());
    sendError('Registration failed. Please try again.', 500);
    
} catch (Exception $e) {
    // Log general error
    error_log("Error: " . $e->getMessage());
    sendError('An error occurred', 500);
}
?>
