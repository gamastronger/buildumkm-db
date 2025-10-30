<?php
/**
 * Session Configuration
 * 
 * Konfigurasi session untuk autentikasi
 */

// Pastikan session belum dimulai
if (session_status() === PHP_SESSION_NONE) {
    // Session configuration
    ini_set('session.cookie_httponly', 1);  // Prevent JavaScript access to session cookie
    ini_set('session.use_only_cookies', 1); // Only use cookies for session
    ini_set('session.cookie_samesite', 'Lax'); // CSRF protection
    
    // Session name
    session_name('BUILDUMKM_SESSION');
    
    // Start session
    session_start();
}

/**
 * Check jika user sudah login
 * 
 * @return bool True jika sudah login
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && isset($_SESSION['user_email']);
}

/**
 * Get current user data dari session
 * 
 * @return array|null User data atau null jika belum login
 */
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    
    return [
        'id' => $_SESSION['user_id'],
        'name' => $_SESSION['user_name'],
        'email' => $_SESSION['user_email'],
        'role' => $_SESSION['user_role']
    ];
}

/**
 * Set user session
 * 
 * @param array $user User data dari database
 */
function setUserSession($user) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_role'] = $user['role'];
    
    // Regenerate session ID untuk keamanan
    session_regenerate_id(true);
}

/**
 * Destroy user session (logout)
 */
function destroyUserSession() {
    // Unset all session variables
    $_SESSION = [];
    
    // Destroy session cookie
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }
    
    // Destroy session
    session_destroy();
}

/**
 * Check user role
 * 
 * @param string $role Role to check
 * @return bool True jika role sesuai
 */
function hasRole($role) {
    return isLoggedIn() && $_SESSION['user_role'] === $role;
}

/**
 * Require login - redirect atau error jika belum login
 */
function requireLogin() {
    if (!isLoggedIn()) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized - Please login first'
        ]);
        exit();
    }
}

/**
 * Require specific role
 * 
 * @param string|array $allowedRoles Single role atau array of roles
 */
function requireRole($allowedRoles) {
    requireLogin();
    
    // Convert single role to array
    if (!is_array($allowedRoles)) {
        $allowedRoles = [$allowedRoles];
    }
    
    if (!in_array($_SESSION['user_role'], $allowedRoles)) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Forbidden - Insufficient permissions'
        ]);
        exit();
    }
}
?>
