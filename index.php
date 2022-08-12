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
    <form id="agregar-producto">
        <h1>Agregar artículo</h1>
        <input type="text" placeholder="Titulo" name="titulo" required>
        <div class="selector">
            <label>Elija la marca del producto</label>
            <select name="marcas" id="marcas">
               
            </select>
        </div>
        <input type="number" placeholder="Precio" name="precio" id="precio" required>
        <input type="number" placeholder="Cantidad" name="cantidad" id="cantidad" required>
        <input type="date" name="fechaLanzamiento" id="fechaLanzamiento">
        <div class="selector">
            <label>Elija la categoría más específica del producto</label>
            <select name="categorias" id="categorias">
                  
            </select>
        </div>
        <button id="submitProducto">Agregar producto</button>
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

<script src="./src/js/index.js"></script>
<?php
    include './includes/footer.php'
?>