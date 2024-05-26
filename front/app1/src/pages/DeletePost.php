<?php
include 'Connect.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



$postId = $_POST['postId'];


if (!$postId) {
    echo json_encode(["error" => "Post ID is required"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM posts WHERE idp = ?");
$stmt->bind_param("i", $postId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to delete post"]);
}

$stmt->close();
$conn->close();
?>
