<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo json_encode(array('error' => 'Veuillez fournir un nom d\'utilisateur et un mot de passe.'));
        exit;
    }

    include 'Connect.php';

    $sql = "SELECT id, nom, email, username FROM users WHERE username = ? AND mp = ?";
    $statement = $conn->prepare($sql);
    $statement->bind_param('ss', $username, $password);
    $statement->execute();
    $statement->store_result();

    if ($statement->num_rows > 0) {
        $statement->bind_result($id, $nom, $email, $username);
        $statement->fetch();

        echo json_encode(array(
            'success' => true,
            'id' => $id,
            'nom' => $nom,
            'email' => $email,
            'username' => $username
        ));
    } else {
        echo json_encode(array('error' => 'Nom d\'utilisateur ou mot de passe incorrect.'));
    }

    $statement->close();
    $conn->close();
} else {
    echo json_encode(array('error' => 'Méthode de requête invalide.'));
}
?>
