<?php
require_once 'Connect.php'; 
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titre = $_POST['titreP'];
    $desc = $_POST['dsc'];
    $userId = $_POST['userId'];
    $cat = $_POST['catP'];

    
    if (empty($titre) || empty($cat)) {
        echo json_encode(['error' => 'Title and category are required.']);
        http_response_code(400);
        exit();
    }
    if (empty($desc) && empty($_FILES['imgP']['name'])) {
        echo json_encode(['error' => 'Either description or image must be provided.']);
        http_response_code(400);
        exit();
    }

    
    $image = null;
    if (isset($_FILES['imgP']) && $_FILES['imgP']['error'] == 0) {
        $target_dir = "uploads/";
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        $target_file = $target_dir . basename($_FILES["imgP"]["name"]);
        if (move_uploaded_file($_FILES["imgP"]["tmp_name"], $target_file)) {
            $image = $target_file;
        } else {
            echo json_encode(['error' => 'Failed to upload image.']);
            http_response_code(500);
            exit();
        }
    }

    
    $stmt = $conn->prepare("INSERT INTO posts (titre, descp, image, id, cat) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssis", $titre, $desc, $image, $userId, $cat);

    
    if ($stmt->execute()) {
        echo json_encode(['message' => 'New post created successfully']);
        http_response_code(201);
    } else {
        echo json_encode(['error' => 'Error: ' . $stmt->error]);
        http_response_code(500);
    }

    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Invalid request method']);
    http_response_code(405);
}
?>
