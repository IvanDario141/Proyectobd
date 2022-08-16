<?php
    $id = $_POST['id'];
    $cant = $_POST['cantCompra'];

    include "./conexionbd.php";

    $resultado = $conn->query("UPDATE producto 
    SET cantidad=cantidad - $cant, vendidos= vendidos + $cant
    WHERE id = $id");
?>