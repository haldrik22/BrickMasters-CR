<?php
$servername = "localhost";
$username = "SGC";
$password = "12345";
$dbname = "brickmasters";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM clients";
$result = $conn->query($sql);

$clients = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $clients[] = $row;
    }
}

echo json_encode($clients);

$conn->close();
?>