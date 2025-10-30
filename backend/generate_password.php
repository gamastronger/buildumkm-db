<?php
/**
 * Script untuk Generate Password Hash
 * Gunakan untuk membuat hash password baru
 */

// Password yang ingin di-hash
$passwords = [
    'admin123' => 'Password untuk Admin',
    'password123' => 'Password untuk User/Developer testing'
];

echo "<h2>Password Hash Generator</h2>";
echo "<table border='1' cellpadding='10'>";
echo "<tr><th>Password</th><th>Hash (Bcrypt)</th><th>Keterangan</th></tr>";

foreach ($passwords as $password => $keterangan) {
    $hash = password_hash($password, PASSWORD_BCRYPT);
    echo "<tr>";
    echo "<td><strong>$password</strong></td>";
    echo "<td><code>$hash</code></td>";
    echo "<td>$keterangan</td>";
    echo "</tr>";
}

echo "</table>";

echo "<hr>";
echo "<h3>Cara Update Password di Database:</h3>";
echo "<ol>";
echo "<li>Buka phpMyAdmin: <a href='http://localhost/phpmyadmin' target='_blank'>http://localhost/phpmyadmin</a></li>";
echo "<li>Pilih database: <strong>buildumkm_db</strong></li>";
echo "<li>Pilih tabel: <strong>users</strong></li>";
echo "<li>Edit user yang ingin diubah password-nya</li>";
echo "<li>Copy hash dari tabel di atas</li>";
echo "<li>Paste ke kolom <strong>password</strong></li>";
echo "<li>Klik <strong>Go</strong></li>";
echo "</ol>";

echo "<hr>";
echo "<h3>Query SQL untuk Update Password Admin:</h3>";
$adminHash = password_hash('admin123', PASSWORD_BCRYPT);
echo "<pre>";
echo "UPDATE users SET password = '$adminHash' WHERE email = 'admin@buildumkm.com';\n";
echo "</pre>";
?>
