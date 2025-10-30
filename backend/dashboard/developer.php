<?php
/**
 * Dashboard Developer Endpoint
 * 
 * Endpoint khusus untuk user dengan role 'developer'
 * Return data yang relevan untuk Developer
 */

// Include required files
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../config/session.php';
require_once '../utils/response.php';

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

try {
    // Require login dan role developer
    requireRole('developer');
    
    // Get current user
    $currentUser = getCurrentUser();
    
    // Get database connection
    $db = getDBConnection();
    if ($db === null) {
        sendError('Database connection failed', 500);
    }
    
    // Get user detail dari database
    $stmt = $db->prepare("SELECT id, name, email, role, created_at FROM users WHERE id = ?");
    $stmt->execute([$currentUser['id']]);
    $user = $stmt->fetch();
    
    // Prepare dashboard data
    $dashboardData = [
        'user' => $user,
        'stats' => [
            'totalProjects' => 0,
            'ongoingProjects' => 0,
            'completedProjects' => 0,
            'totalEarnings' => 0
        ],
        'recentProjects' => [],
        'availableProjects' => [],
        'notifications' => []
    ];
    
    // Send success response
    sendSuccess($dashboardData, 'Dashboard data retrieved successfully');
    
} catch (Exception $e) {
    // Log error
    error_log("Dashboard Error: " . $e->getMessage());
    sendError('Failed to load dashboard', 500);
}
?>
