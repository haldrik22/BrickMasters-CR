<?php
$servername = "localhost";
$username = "SGC";
$password = "12345";
$dbname = "brickmasters";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$distributorName = $_POST['distributor_name'];
$distributorPhone = $_POST['distributor_phone'];
// Agrega más variables si es necesario

$sql = "INSERT INTO distribuidor (distributor_name, distributor_phone) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $distributorName,$distributorPhone);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();