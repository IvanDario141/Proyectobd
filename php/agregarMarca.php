<?php
    require './conexionbd.php';
    $nombre = $_POST['nombre'];
    
    #Se verifica que la marca ingresada no esté repetida
    $busq = $conn->query("SELECT id FROM marca WHERE nombre = '$nombre'");
    $cant = $busq->num_rows;
    if($cant == 0){
        
        #Se inserta la marca en la tabla
        $resultado = $conn->query("INSERT INTO marca VALUES ('NULL', '$nombre')");
        echo $nombre;
    }
    echo "";
    $conn -> close();
?>