<?php
    $id = $_POST['id'];
    include "./conexionbd.php";

    $resultado = $conn->query("SELECT nombre, cantidad
    FROM producto WHERE id=$id");

    $producto = $resultado->fetch_assoc();
    echo json_encode(["nombre"=>$producto['nombre'], "cantidad"=>$producto['cantidad']]);
?>