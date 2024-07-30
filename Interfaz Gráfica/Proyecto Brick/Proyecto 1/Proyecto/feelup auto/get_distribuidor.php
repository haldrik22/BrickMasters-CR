<?php
$servername = "localhost";
$username = "SGC";
$password = "12345";
$dbname = "brickmasters";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM distributors";
$result = $conn->query($sql);

$distributors = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $distributors[] = $row;
    }
}

echo json_encode($distributors);

$conn->close();
?>