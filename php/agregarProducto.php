<?php

    include "./conexionbd.php";

    $nombre = $_POST["nombre"];
    $idMarca = intval($_POST["marcas"]);
    $precio = intval($_POST["precio"]);
    $cantidad = $_POST["cantidad"];
    $vendidos = 'NULL';
    $lanzamiento = date('Y-m-d', strtotime($_POST["fechaLanzamiento"]));
    $idCategoria = intval($_POST["categorias"]);

    $result = $conn->query("SELECT * FROM producto WHERE nombre = '$nombre' AND marca = $idMarca");
    if($result->num_rows == 0){
        $result = $conn->query("INSERT INTO producto
        VALUES('null', '$nombre', $idMarca, $precio, $cantidad, 0, '$lanzamiento', $idCategoria)");
        echo '1';
        return;
    }

    echo '0';
?>