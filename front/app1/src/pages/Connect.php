<?php


$servername = "localhost";
$username = "root";
$password = "";
$Database = "blogs";
$conn = new mysqli($servername, $username, $password, $Database);
if ($conn->connect_error) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    die("connexion a échoué" . $conn->connect_error);

}
echo 'connected';
?>