<?php
$servername = "localhost";
$username = "SGC";
$password = "12345";
$dbname = "brickmasters";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to sanitize input data
function clean_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

// Handle the request
$nombre_producto = clean_input($_POST["nombre_producto"]);
$rango_edad = clean_input($_POST["rango_edad"]);
$detalles_juego = clean_input($_POST["detalles_juego"]);
$precio = clean_input($_POST["precio"]);
$cantidad = clean_input($_POST["cantidad"]);

$stmt = $conn->prepare("INSERT INTO Producto (Nombre, Rango_Edad, Detalles_Juego, Precio, Cantidad) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sisdi", $nombre_producto, $rango_edad, $detalles_juego, $precio, $cantidad);

if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

if (isset($_FILES['file'])) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if ($check === false) {
        die("File is not an image.");
    }

    // Check file type
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        die("Only JPG, JPEG, PNG & GIF files are allowed.");
    }

    // Upload the file
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
    } else {
        echo "Error uploading the file.";
    }
}

$stmt->close();
$conn->close();

