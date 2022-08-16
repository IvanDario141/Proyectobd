<?php
    include './conexionbd.php';
    $formaOrden = $_POST['formaOrden'];
    $ordenPor = $_POST['ordenPor'];
    $idPadre = $_POST['categoria'];
    $marca = $_POST['marca'];
    $precioMin = intval($_POST['precioMin']);
    $precioMax = intval($_POST['precioMax']);

    if(isset($_POST['categoria']) && $_POST['categoria'] != 0){
        $query="SELECT 
            p.id AS idProducto,
            p.nombre AS nombreProducto, 
            m.nombre AS nombreMarca, 
            precio, 
            cantidad, 
            vendidos, 
            lanzamiento
        FROM producto p JOIN marca m ON p.marca = m.id
        WHERE (p.categoria IN (SELECT fkHijo
            FROM categoriahascategoria chc 
            WHERE chc.fkPadre = $idPadre";
        if($marca != 0){
            $query.=" AND p.marca = $marca)";
        }else{
            $query.=")";
        }
        $query.=" OR p.categoria = $idPadre)
        AND (precio > $precioMin AND precio < $precioMax)"; 
       
        if($marca != 0) $query.=" AND (p.marca = $marca)";
        $query.=" ORDER BY $ordenPor $formaOrden";
        
        #echo $query;
        #return

        $resultado = $conn->query($query);
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
    }else{
        $query="SELECT 
            p.id AS idProducto,
            p.nombre AS nombreProducto, 
            m.nombre AS nombreMarca, 
            precio, 
            cantidad, 
            vendidos, 
            lanzamiento
        FROM producto p JOIN marca m ON m.id=p.marca
        WHERE (precio > $precioMin AND precio < $precioMax)";
        if($marca != 0) $query.=" AND (p.marca = $marca)";
        $query.=" ORDER BY $ordenPor $formaOrden";

        $resultado = $conn->query($query);
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