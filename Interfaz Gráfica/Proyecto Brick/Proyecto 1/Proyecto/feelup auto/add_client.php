<?php
$servername = "localhost";
$username = "SGC";
$password = "12345";
$dbname = "brickmasters";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$clientName = $_POST['client_name'];
$clientPhone = $_POST['client_phone'];
// Agrega más variables si es necesario

$sql = "INSERT INTO clients (client_name, client_phone) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $clientName,$clientPhone);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();
?>