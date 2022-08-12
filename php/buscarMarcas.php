<?php
    include './conexionbd.php';

    $result = $conn->query("SELECT * FROM marca");

    #Se crea un arreglo en el que irán cada uno de los objetos de la búsqueda en formato json
    $marcas = array();

    while($marca = $result->fetch_assoc()){
        $marcas[] = json_encode(["id" => $marca['id'], "nombre" => $marca['nombre']]);
    }

    echo(json_encode($marcas));
?>