<?php
/**
 * Check Session Endpoint
 * 
 * Mengecek apakah user masih login dan return user data
 * Digunakan untuk maintain session di frontend
 */

// Include required files
require_once '../config/cors.php';
require_once '../config/session.php';
require_once '../utils/response.php';

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

try {
    // Check jika user sedang login
    if (!isLoggedIn()) {
        sendError('Not authenticated', 401);
    }
    
    // Get current user data
    $user = getCurrentUser();
    
    // Send success response
    sendSuccess([
        'user' => $user,
        'isAuthenticated' => true
    ], 'Session is valid');
    
} catch (Exception $e) {
    // Log error
    error_log("Check Session Error: " . $e->getMessage());
    sendError('Session check failed', 500);
}
?>
