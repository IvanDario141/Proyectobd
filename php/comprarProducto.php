<?php
    $id = $_POST['id'];
    $cant = $_POST['cantidadComprar'];

    include "./conexionbd.php";

    $resultado = $conn->query("UPDATE producto 
    SET cantidad=$cant
    WHERE id = $id");
?>