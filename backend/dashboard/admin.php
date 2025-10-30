<?php
/**
 * Dashboard Admin Endpoint
 * 
 * Endpoint khusus untuk user dengan role 'admin'
 * Return data statistik dan management untuk Admin
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
    // Require login dan role admin
    requireRole('admin');
    
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
    
    // Get total users berdasarkan role
    $stmt = $db->prepare("SELECT role, COUNT(*) as count FROM users GROUP BY role");
    $stmt->execute();
    $usersByRole = $stmt->fetchAll();
    
    // Get total all users
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM users");
    $stmt->execute();
    $totalUsers = $stmt->fetch()['total'];
    
    // Get recent registered users
    $stmt = $db->prepare("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5");
    $stmt->execute();
    $recentUsers = $stmt->fetchAll();
    
    // Prepare stats
    $stats = [
        'totalUsers' => (int)$totalUsers,
        'totalProjects' => 0,
        'totalDevelopers' => 0,
        'totalUMKM' => 0,
        'totalAdmins' => 0
    ];
    
    // Fill stats dari usersByRole
    foreach ($usersByRole as $roleData) {
        switch ($roleData['role']) {
            case 'user':
                $stats['totalUMKM'] = (int)$roleData['count'];
                break;
            case 'developer':
                $stats['totalDevelopers'] = (int)$roleData['count'];
                break;
            case 'admin':
                $stats['totalAdmins'] = (int)$roleData['count'];
                break;
        }
    }
    
    // Prepare dashboard data
    $dashboardData = [
        'user' => $user,
        'stats' => $stats,
        'recentUsers' => $recentUsers,
        'charts' => [
            'usersByRole' => $usersByRole
        ]
    ];
    
    // Send success response
    sendSuccess($dashboardData, 'Dashboard data retrieved successfully');
    
} catch (Exception $e) {
    // Log error
    error_log("Dashboard Error: " . $e->getMessage());
    sendError('Failed to load dashboard', 500);
}
?>
