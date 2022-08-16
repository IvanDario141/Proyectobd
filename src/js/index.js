//Evento cuando se carga la pagina
let categoriaActual = 0;
let formaOrden = "ASC";
let ordenPor = "lanzamiento";
let marcaActual = 0;
let maxActual = 0;
let precioMin = 0;
let precioMax = 5000000;
let productoActual = 0;
$(document).ready(() => {
    buscarMarcas();
    buscarCategorias();
    ponerCategoriasPadre();
    filtrar();
});

$("#comprar-producto").on("submit", (e)=>{
    e.preventDefault();
    let cantCompra = $("#cantCompra").val();
    if(cantCompra < maxActual) return
    let datos = {
        id: productoActual,
        cantidadComprar: cantCompra
    };
    $.ajax({
        data : datos,
        datatype : "json",
        type : "post",
        url : "./php/comprarProducto.php",
        success : ()=>{
            filtrar();
        }
    });
});
$("#filtro-marca").on("change", ()=>{
    marcaActual = $("#filtro-marca option:selected").val();
    filtrar();
});
$("#precioMax").on("change", ()=>{
    precioMax = $("#precioMax").val();
    if(precioMax=="") precioMax=7000000;
    filtrar();
});
$("#precioMin").on("change", ()=>{
    precioMin = $("#precioMin").val();
    if(precioMin=="") precioMin=0;
    filtrar();
});
$("#orden").on("change", ()=>{
    formaOrden = $("#orden option:selected").val();
    filtrar();
});
$("#ordenarPor").on("change", ()=>{
    ordenPor = $("#ordenarPor option:selected").val();
    filtrar();
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
        $("#filtro-padres").append("<button onclick='setCategoria("+categoria.id+")' class='filtrar'>"+categoria.nombre+"</button>");
    })
}
function setCategoria(id){
    categoriaActual = id;
    marcaActual = 0;
    filtrar();
    $("#filtro-marca").val(0);
}
function filtrar(){
    let filtros = {
        categoria: categoriaActual, 
        marca: marcaActual,
        precioMin: precioMin,
        precioMax: precioMax,
        formaOrden: formaOrden, 
        ordenPor: ordenPor
    }
    buscarProductos(filtros);
}
function buscarProductos(filtros){
    $.ajax({
        data: filtros,
        type: "post",
        datatype: "json",
        url: "./php/buscarProductos.php",
        success: (texto) => {
            //console.log(texto);
            let productos = JSON.parse(texto);
            let tabla = $("#busqueda");

            tabla.empty().append("<tr> <th>Nombre</th> <th>Marca</th> <th>Precio</th> <th>En inventario</th> <th>Vendidos</th> <th>Fecha lanzamiento</th><th></th></tr>");
            productos.map((producto) => {
                producto = JSON.parse(producto);
                tabla.append(`<tr> <td>${producto.nombre}</td> <td>${producto.marca}</td> <td> $${producto.precio}</td> <td>${producto.cantidad}</td> <td>${producto.vendidos}</td> <td>${producto.lanzamiento}</td> <td><button onClick='setProductoComprar(${producto.id})'>Comprar</button></td> </tr>`);
            }); 
        }
    });
}
function setProductoComprar(id){
    productoActual = id;
    actualizarComprar()
}
function actualizarComprar(){
    let datos = {id: productoActual};
    $.ajax({
        data: datos,
        datatype: "json",
        type: "post",
        url: "./php/buscarProductoId.php",
        success: (producto) =>{
            producto = JSON.parse(producto);
            $("#titulo-comprar").html(producto.nombre);
            $("#cant-comprar").html(producto.cantidad);
            maxActual = producto.cantidad;
            $("#cant-comprar").attr({
                "max": producto.cantidad
            });
            console.log($("#cant-comprar").attr("max"));
        }
    })
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
    $("#filtro-marca").empty().append("<option value=0>-----</option>");
    arreglo.map((marca) => {
        marca = JSON.parse(marca);
        $("#filtro-marca").append("<option value="+marca.id+">"+marca.nombre+"</option>")
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
    if(resultado == '1'){
        $("#titulo").val("");
        $("#precio").val("");
        $("#cantidad").val("");
        filtrar();
    }
}