<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



include 'Connect.php';

$category = isset($_GET['cat']) ? $_GET['cat'] : null;
$sql = "SELECT * FROM posts";
if ($category) {
    $sql .= " WHERE cat = '$category'";
}
$result = $conn->query($sql);

$posts = array();

if ($result->num_rows > 0) {
    $posts = array();
    while($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    echo json_encode($posts);
} else {
    echo json_encode(array("message" => "aucun article trouvé"));
    exit();
}

echo json_encode($posts);
$conn->close();
?>
