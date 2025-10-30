<?php
/**
 * Backend API Index
 * 
 * Endpoint info untuk BuildUMKM Backend
 */

header('Content-Type: application/json');

$response = [
    'name' => 'BuildUMKM Backend API',
    'version' => '1.0.0',
    'status' => 'running',
    'endpoints' => [
        'auth' => [
            'login' => 'POST /auth/login.php',
            'register' => 'POST /auth/register.php',
            'logout' => 'POST /auth/logout.php',
            'check_session' => 'GET /auth/check-session.php',
        ],
        'dashboard' => [
            'user' => 'GET /dashboard/user.php',
            'developer' => 'GET /dashboard/developer.php',
            'admin' => 'GET /dashboard/admin.php',
        ]
    ],
    'documentation' => 'See README.md for full documentation',
    'database' => [
        'host' => DB_HOST ?? 'localhost',
        'name' => DB_NAME ?? 'buildumkm_db',
        'connected' => false
    ]
];

// Test database connection
if (file_exists('config/database.php')) {
    require_once 'config/database.php';
    $db = getDBConnection();
    $response['database']['connected'] = ($db !== null);
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
