<?php
/**
 * Validation Utility Functions
 * 
 * Helper functions untuk validasi input
 */

/**
 * Validasi email
 * 
 * @param string $email Email to validate
 * @return bool True jika valid
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validasi password strength
 * Minimal 6 karakter
 * 
 * @param string $password Password to validate
 * @return bool True jika valid
 */
function validatePassword($password) {
    return strlen($password) >= 6;
}

/**
 * Validasi required fields
 * 
 * @param array $data Data array
 * @param array $requiredFields Array of required field names
 * @return array Array of errors (empty jika tidak ada error)
 */
function validateRequired($data, $requiredFields) {
    $errors = [];
    
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || trim($data[$field]) === '') {
            $errors[$field] = ucfirst($field) . ' is required';
        }
    }
    
    return $errors;
}

/**
 * Sanitize string input
 * 
 * @param string $input Input to sanitize
 * @return string Sanitized input
 */
function sanitizeString($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

/**
 * Sanitize email input
 * 
 * @param string $email Email to sanitize
 * @return string Sanitized email
 */
function sanitizeEmail($email) {
    return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
}

/**
 * Validasi role
 * 
 * @param string $role Role to validate
 * @return bool True jika valid
 */
function validateRole($role) {
    $allowedRoles = ['user', 'developer', 'admin'];
    return in_array($role, $allowedRoles);
}
?>
