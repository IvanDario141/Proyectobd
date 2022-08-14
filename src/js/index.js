//Evento cuando se carga la pagina
let categoriaActual = 1;
let formaOrden = "ASC";
let ordenPor = "lanzamiento";
$(document).ready(() => {
    buscarMarcas();
    buscarCategorias();
    ponerCategoriasPadre();
    
});

$("#orden").on("change", ()=>{
    formaOrden = $("#orden option:selected").val();
    filtrarPorPadres(categoriaActual);
});
$("#ordenarPor").on("change", ()=>{
    ordenPor = $("#ordenarPor option:selected").val();
    filtrarPorPadres(categoriaActual);
});
function ponerCategoriasPadre(){
    $.ajax({
        url: "./php/buscarPadres.php",
        success: ponerPadres
    });
}
function ponerPadres(categorias){
    categorias = JSON.parse(categorias);
    $("#filtro-padres").empty();
    categorias.map((categoria) => {
        categoria = JSON.parse(categoria);
        $("#filtro-padres").append("<button onclick='filtrarPorPadres("+categoria.id+")' class='filtrarPorPadres'>"+categoria.nombre+"</button>");
    })
}
function filtrarPorPadres(id){
    categoriaActual = id;
    buscarProductos({
        categoria: id, 
        formaOrden: formaOrden, 
        ordenPor: ordenPor
    });
}
function buscarProductos(filtros){
    $.ajax({
        data: filtros,
        type: "post",
        datatype: "json",
        url: "./php/buscarProductos.php",
        success: (texto) => {
            let productos = JSON.parse(texto);
            let tabla = $("#busqueda");
            let marcas = [];
            tabla.empty();
            tabla.append("<tr> <th>Nombre</th> <th>Marca</th> <th>Precio</th> <th>En inventario</th> <th>Vendidos</th> <th>Fecha lanzamiento</th><th></th></tr>");
            productos.map((producto) => {
                producto = JSON.parse(producto);
                if(!marcas.includes(producto.marca)) marcas.push(producto.marca);
                tabla.append(`<tr> <td>${producto.nombre}</td> <td>${producto.marca}</td> <td>${producto.precio}</td> <td>${producto.cantidad}</td> <td>${producto.vendidos}</td> <td>${producto.lanzamiento}</td> <td><button onClick='comprar(${producto.id})'>Comprar</button></td> </tr>`);
            });
            ponerFiltroMarca(marcas)
        }
    });
}

function ponerFiltroMarca(marcas){
    let filtro = $("#filtro-marca");
    filtro.empty();
    marcas.map((marca) =>{
        filtro.append(`<option value=${marca}>${marca}</option>`);
    });
}

$("#mostrarFormsCheck").on("change", () =>{
    $("#mostrarForms").toggleClass("mostrando").toggleClass("no-mostrando");
    $("#formularios").toggleClass("visible").toggleClass("invisible");
});

function buscarMarcas(){
    $.ajax({
        url: "./php/buscarMarcas.php",
        success: ponerMarcas
    });
}

function buscarCategorias(){
    $.ajax({
        url: "./php/buscarCategorias.php",
        success: ponerCategorias
    });
}

function ponerCategorias(data){
    let arreglo = JSON.parse(data);
    $("#categorias").empty();
    arreglo.map((categoria) => {
        categoria = JSON.parse(categoria);
        $("#categorias").append("<option value="+categoria.id+">"+categoria.nombre+"</option>")
    });
    $("#idPadre").empty();
    $("#idPadre").append("<option value=0>-----</option>");
    arreglo.map((categoria) => {
        categoria = JSON.parse(categoria);
        $("#idPadre").append("<option value="+categoria.id+">"+categoria.nombre+"</option>")
    });
}

function ponerMarcas(data){
    let arreglo = JSON.parse(data);
    $("#marcas").empty();
    arreglo.map((marca) => {
        marca = JSON.parse(marca);
        $("#marcas").append("<option value="+marca.id+">"+marca.nombre+"</option>")
    });
}

//Evento cuando se agrega marca
$("#agregar-marca").on("submit", (e) => {
    e.preventDefault();
    let marca = $("#nombreMarca").val().trim();
    let datos = {
        "nombre" : marca.trim()
    }
    $.ajax({
        beforeSend : informarEstadoMarca("Subiendo marca"),
        data: datos,
        datatype: "json",
        type: "post",
        url: "./php/agregarMarca.php",
        success: marcaAgregada,
        error: informarEstadoMarca
    });
})

function marcaAgregada(texto){
    $("#estado").html("Agregada la marca "+ texto);
    $("#nombreMarca").val("");
    buscarMarcas();
}

function informarEstadoMarca(texto){
    //Si llega una cadena vacía es porque la marca está repetida
    if(texto !== ""){
        $("#estado").html("Agregada la marca "+ texto);
    }else{
        $("#estado").html("La marca " + $("#nombreMarca").val() + " ya está registrada");
    }
}

//Evento cuando se agrega una categoría
$("#agregar-categoria").on("submit", (e) => {
    e.preventDefault();
    let categoria = $("#nombreCategoria").val().trim();
    let categoriaPadre = $("#idPadre option:selected").val();
    console.log(categoriaPadre);
    let datos = {
        "nombreCategoria" : categoria,
        "idPadre" : categoriaPadre
    }
    $.ajax({
        beforeSend : informarEstadoCategoria("Subiendo categoria"),
        data: datos,
        datatype: "json",
        type: "post",
        url: "./php/agregarCategoria.php",
        success: categoriaAgregada,
        error: informarEstadoCategoria
    });
})

function categoriaAgregada(texto){
    $("#estado").html("Agregada la categoria "+ texto);
    $("#nombreCategoria").val("");
    buscarCategorias();
}

function informarEstadoCategoria(texto){
    //Si llega una cadena vacía es porque la marca está repetida
    if(texto !== ""){
        $("#estado").html("Agregada la categoria "+ texto);
    }else{
        $("#estado").html("La marca " + $("#nombreMarca").val() + " ya está registrada");
    }
}

//Evento cuando se agrega un producto
$("#agregar-producto").on("submit", (e) => {
    e.preventDefault();
    //Se obtienen los datos necesarios para crear el producto
    let datos = {
        nombre : $("#titulo").val().trim(),
        categorias : $("#categorias option:selected").val(),
        precio : $("#precio").val(),
        marcas : $("#marcas option:selected").val(),
        cantidad : $("#cantidad").val(),
        fechaLanzamiento : $("#fechaLanzamiento").val() 
    }

    $.ajax({
        data : datos,
        datatype : "json",
        type : "post",
        url : "./php/agregarProducto.php",
        success : informar,
        error : () => {
            $("#estado").html("Ocurrió un error");
        }
    });
});

function informar(resultado){
    console.log(resultado);
    if(resultado == '1'){
        $("#titulo").val("");
        $("#precio").val("");
        $("#cantidad").val("");
        filtrarPorPadres(categoriaActual);
    }
}