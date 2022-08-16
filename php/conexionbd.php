<?php
    $servername = "localhost";
    $database = "proyecto";
    $username = "root";
    $password = "";
    
    // Create connection
    
    $conn = mysqli_connect($servername, $username, $password, $database, 3307);
    if($conn -> connect_error){
        echo("Se produjo un error al conectar a la base de datos");
    }
?>
