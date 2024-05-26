<?php
include 'Connect.php';


$data = json_decode(file_get_contents('php://input'), true);
$postId = $data['postId'];
$titre = $data['titre'];
$descp = $data['descp'];
$image = $data['image'];
$cat = $data['cat'];

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if (!$postId || !$titre || !$cat || (!$descp && !$image)) {
    echo json_encode(["error" => "All fields are required except image or description, but one of them must be provided"]);
    exit;
}


$stmt = $conn->prepare("UPDATE posts SET titre = ?, descp = ?, image = ?, cat = ? WHERE idp = ?");
$stmt->bind_param("ssssi", $titre, $descp, $image, $cat, $postId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to update post"]);
}

$stmt->close();
$conn->close();
?>
