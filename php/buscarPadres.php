<?php

    include './conexionbd.php';

    $resultado = $conn->query("SELECT DISTINCT 
    c.id as id, c.nombre as nombre 
    FROM categoria c JOIN categoriaHasCategoria chc ON 
    c.id = chc.fkPadre");

    $categorias = array();

    while($categoria = $resultado->fetch_assoc()){
        $categorias[] = json_encode(["id" => $categoria['id'], "nombre" => $categoria['nombre']]);
    }

    echo json_encode($categorias);
?>