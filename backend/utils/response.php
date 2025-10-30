<?php
/**
 * Response Utility Functions
 * 
 * Helper functions untuk mengirim JSON response yang konsisten
 */

/**
 * Kirim JSON response
 * 
 * @param int $statusCode HTTP status code
 * @param mixed $data Data yang akan dikirim
 * @param string|null $message Optional message
 */
function sendResponse($statusCode, $data = null, $message = null) {
    // Set HTTP response code
    http_response_code($statusCode);
    
    // Set header untuk JSON
    header('Content-Type: application/json');
    
    // Buat response array
    $response = [];
    
    if ($message !== null) {
        $response['message'] = $message;
    }
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    $response['success'] = ($statusCode >= 200 && $statusCode < 300);
    
    // Output JSON
    echo json_encode($response);
    exit();
}

/**
 * Kirim success response
 * 
 * @param mixed $data Data yang akan dikirim
 * @param string $message Success message
 * @param int $statusCode HTTP status code (default 200)
 */
function sendSuccess($data = null, $message = 'Success', $statusCode = 200) {
    sendResponse($statusCode, $data, $message);
}

/**
 * Kirim error response
 * 
 * @param string $message Error message
 * @param int $statusCode HTTP status code (default 400)
 */
function sendError($message, $statusCode = 400) {
    sendResponse($statusCode, null, $message);
}

/**
 * Kirim validation error response
 * 
 * @param array $errors Array of validation errors
 */
function sendValidationError($errors) {
    http_response_code(422);
    header('Content-Type: application/json');
    
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit();
}

/**
 * Kirim unauthorized response
 * 
 * @param string $message Error message
 */
function sendUnauthorized($message = 'Unauthorized') {
    sendError($message, 401);
}

/**
 * Kirim forbidden response
 * 
 * @param string $message Error message
 */
function sendForbidden($message = 'Forbidden') {
    sendError($message, 403);
}

/**
 * Kirim not found response
 * 
 * @param string $message Error message
 */
function sendNotFound($message = 'Resource not found') {
    sendError($message, 404);
}
?>
