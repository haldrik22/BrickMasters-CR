<?php
$servername = "localhost";
$username = "SGC";
$password = "12345";
$dbname = "brickmasters";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$nombre = $_POST['nombre'];
$email = $_POST['email'];
$metodo = $_POST['metodo'];
$detalles = $_POST['detalles'];

$sql = "INSERT INTO pagos (nombre, email, metodo, detalles) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nombre, $email, $metodo, $detalles);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conn->close();
?>