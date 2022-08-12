<?php
    include './conexionbd.php';

    $result = $conn->query("SELECT * FROM categoria");

    #Se crea un arreglo en el que irán cada uno de los objetos de la búsqueda en formato json
    $categorias = array();

    while($categoria = $result->fetch_assoc()){
        $categorias[] = json_encode(["id" => $categoria['id'], "nombre" => $categoria['nombre']]);
    }

    echo(json_encode($categorias));
?>