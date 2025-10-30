<?php
/**
 * Login Endpoint
 * 
 * Handle login untuk semua role (user, developer, admin)
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
    $requiredFields = ['email', 'password'];
    $errors = validateRequired($data, $requiredFields);
    
    if (!empty($errors)) {
        sendValidationError($errors);
    }
    
    // Sanitize input
    $email = sanitizeEmail($data['email']);
    $password = $data['password'];
    
    // Validasi email format
    if (!validateEmail($email)) {
        sendError('Invalid email format', 422);
    }
    
    // Get database connection
    $db = getDBConnection();
    if ($db === null) {
        sendError('Database connection failed', 500);
    }
    
    // Get user dari database
    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    // Check jika user tidak ditemukan
    if (!$user) {
        sendError('Invalid email or password', 401);
    }
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        sendError('Invalid email or password', 401);
    }
    
    // Remove password dari response
    unset($user['password']);
    
    // Set session
    setUserSession($user);
    
    // Determine redirect path berdasarkan role
    $redirectPath = '/';
    switch ($user['role']) {
        case 'user':
            $redirectPath = '/dashboard-umkm';
            break;
        case 'developer':
            $redirectPath = '/dashboard-developer';
            break;
        case 'admin':
            $redirectPath = '/dashboard-admin';
            break;
    }
    
    // Send success response
    sendSuccess([
        'user' => $user,
        'redirect' => $redirectPath,
        'message' => 'Login successful'
    ], 'Login successful');
    
} catch (PDOException $e) {
    // Log database error
    error_log("Database Error: " . $e->getMessage());
    sendError('Login failed. Please try again.', 500);
    
} catch (Exception $e) {
    // Log general error
    error_log("Error: " . $e->getMessage());
    sendError('An error occurred', 500);
}
?>
