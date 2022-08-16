<?php
    //Se incluye el header y la conexión a la base de datos
    $archivo = basename(__FILE__, '.php'); 
    include './includes/head.php';
    include './includes/header.php';
?>
<label class="mostrando" id="mostrarForms">
    Agregar productos, categorías o marcas
    <input type="checkbox" name="mostrarForms" id="mostrarFormsCheck" hidden>
</label>
<div id="formularios" class="invisible">
    <form id="agregar-producto" method="POST">
        <h1>Agregar artículo</h1>
        <input type="text" id="titulo" placeholder="Titulo" name="nombre" required>
        <div class="selector">
            <label>Elija la categoría más específica del producto</label>
            <select name="categorias" id="categorias">
                  
            </select>
        </div>
        <input type="number" placeholder="Precio" min=0 max=5000000 name="precio" id="precio" required>
        <div class="selector">
            <label>Elija la marca del producto</label>
            <select name="marcas" id="marcas">
               
            </select>
        </div>
        <input type="number" placeholder="Cantidad" min=0 name="cantidad" id="cantidad" required>
        <input type="date" name="fechaLanzamiento" id="fechaLanzamiento" required>
        <button id="submitProducto" type="submit">Agregar producto</button>
    </form>
    <div class="contenedor-forms">
        <form id="agregar-marca" method="post">
            <h1>Agregar marca</h1>
            <input type="text" placeholder="Nombre" name="nombreMarca" id="nombreMarca">
            <button type="submit" id="submitMarca">Agregar marca</button>
        </form>
    
        <form id="agregar-categoria" method="post" action="./php/agregarCategoria.php">
            <h1>Agregar categoría</h1>
            <input type="text" placeholder="Categoría" name="nombreCategoria" id="nombreCategoria">
            <select name="idPadre" id="idPadre">
                <option value=0>-----</option>
            </select>
            <button type="submit" id="submitMarca">Agregar categoría</button>
        </form>
    </div>
    <span id="estado"></span>
</div>

<div id="filtro-padres">

</div>
<div id="ordenar">
    <div class="contenedor">
        <h2>Ordenar de forma</h2>
        <select name="orden" id="orden">
            <option value="ASC">Ascendente</option>
            <option value="DESC">Descendente</option>
        </select>
    </div>
    <div class="contenedor">
        <h2>Ordenar por</h2>
        <select name="ordenarPor" id="ordenarPor">
            <option value="lanzamiento">Fecha de lanzamiento</option>
            <option value="nombreProducto">Alfabético</option>
            <option value="nombreMarca">Marca</option>
            <option value="precio">Precio</option>
            <option value="cantidad">En inventario</option>
            <option value="vendidos">Vendidos</option>
        </select>
    </div>
    <div class="contenedor">
        <h2>Filtrar por marca</h2>
        <select name="filtroMarca" id="filtro-marca">

        </select>
    </div>
    <div class="contenedor">
        <h2>Filtrar por precio</h2>
        <div class="rango">
            <input placeholder="Mínimo" type="number" min=0 max=5000000 name="precioMin" id="precioMin">
            <input placeholder="Máximo" type="number" min=0 max=5000000 name="precioMax" id="precioMax">
        </div>
    </div>
</div>


<table id="busqueda">

</table>

<form class="comprar-producto" id="comprar-producto">
    <div class="contenedor">
        <h1 id="titulo-comprar">------------</h1>
        <h2 id="cant-comprar">-------</h2>
    </div>
    <input placeholder="Cantidad" type="number" name="cantCompra" id="cantCompra" required>
    <button type="submit">Comprar</button>
</form>

<script src="./src/js/index.js"></script>
<?php
    include './includes/footer.php'
?>