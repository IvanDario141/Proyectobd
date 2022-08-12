<?php
    require './conexionbd.php';
    $nombre = $_POST['nombreCategoria'];
    $padre = intval($_POST['idPadre']);
    #Se verifica que la categoria ingresada no esté repetida
    $busq = $conn->query("SELECT id FROM categoria WHERE nombre = '$nombre'");
    $cant = $busq->num_rows;
    $padreExiste = true;
    if($cant == 0){
        $resultado = $conn->query("INSERT INTO categoria VALUES ('NULL', '$nombre')");
        if($padre != 0){
            $busq = $conn->query("SELECT id FROM categoria WHERE nombre = '$nombre'");
            $id = $busq->fetch_assoc()['id'];
            
            $resultado = $conn->query("INSERT INTO categoriaHasCategoria VALUES('null', $padre, $id)");
            
        }
        echo $nombre;
    }
    echo "";
    $conn -> close();
?>