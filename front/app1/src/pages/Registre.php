<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'] ?? null;
    $pseudo = $_POST['usern'] ?? null;
    $mp = $_POST['pass'] ?? null;
    $mail = $_POST['email_'] ?? null;

    if (!$nom) {
        $response['error'] = "S'il vous plaît entrez votre nom";
    } elseif (!$mail || !filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        $response['error'] = "S'il vous plaît entrez une adresse e-mail valide";
    } elseif (!$pseudo) {
        $response['error'] = "S'il vous plaît entrez votre nom d'utilisateur";
    } elseif (!$mp) {
        $response['error'] = "S'il vous plaît entrez votre mot de passe";
    } else {
        include 'Connect.php';

        
        $checkUserSql = "SELECT id FROM users WHERE username = ? OR email = ?";
        $checkUserStmt = $conn->prepare($checkUserSql);
        $checkUserStmt->bind_param('ss', $pseudo, $mail);
        $checkUserStmt->execute();
        $checkUserStmt->store_result();

        if ($checkUserStmt->num_rows > 0) {
            $response['error'] = "Le nom d'utilisateur ou l'adresse e-mail existe déjà";
        } else {
            
            $sql = "INSERT INTO users (email, nom, username, mp) VALUES (?, ?, ?, ?)";
            $statement = $conn->prepare($sql);
            $statement->bind_param('ssss', $mail, $nom, $pseudo, $mp);

            if ($statement->execute()) {
                $response['success'] = true;
            } else {
                $response['error'] = "Une erreur s'est produite lors de l'inscription";
            }

            $statement->close();
        }

        $checkUserStmt->close();
        $conn->close();
    }
} else {
    $response['error'] = "Méthode de requête invalide";
}

echo json_encode($response);
?>
