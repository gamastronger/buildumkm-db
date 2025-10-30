<?php
/**
 * Logout Endpoint
 * 
 * Handle logout dan destroy session
 */

// Include required files
require_once '../config/cors.php';
require_once '../config/session.php';
require_once '../utils/response.php';

// Accept POST and GET (untuk fleksibilitas)
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

try {
    // Check jika user sedang login
    if (!isLoggedIn()) {
        sendError('Not logged in', 400);
    }
    
    // Destroy session
    destroyUserSession();
    
    // Send success response
    sendSuccess(null, 'Logout successful');
    
} catch (Exception $e) {
    // Log error
    error_log("Logout Error: " . $e->getMessage());
    sendError('Logout failed', 500);
}
?>
