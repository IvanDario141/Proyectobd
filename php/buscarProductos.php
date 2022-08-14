<?php
    include './conexionbd.php';

    if(isset($_POST['categoria']) && $_POST['categoria'] != 0){
        $formaOrden = $_POST['formaOrden'];
        $ordenPor = $_POST['ordenPor'];
        $idPadre = $_POST['categoria'];
        $resultado = $conn->query("SELECT 
                p.id AS idProducto,
                p.nombre AS nombreProducto, 
                m.nombre AS nombreMarca, 
                precio, 
                cantidad, 
                vendidos, 
                lanzamiento
            FROM producto p JOIN marca m ON p.marca = m.id
            WHERE p.categoria IN (SELECT fkHijo
                FROM categoriahascategoria chc 
                WHERE chc.fkPadre = $idPadre) 
            OR p.categoria = $idPadre
            ORDER BY $ordenPor $formaOrden");
        $productos = array();
        while($producto = $resultado->fetch_assoc()){
            $productos[] = json_encode([
                "id" => $producto['idProducto'],
                "nombre" => $producto['nombreProducto'],
                "marca" => $producto['nombreMarca'],
                "precio" => $producto['precio'],
                "cantidad" => $producto['cantidad'],
                "vendidos" => $producto['vendidos'],
                "lanzamiento" => $producto['lanzamiento']
            ]);
        }
        echo json_encode($productos);
    }
?>