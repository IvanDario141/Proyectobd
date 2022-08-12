//Evento cuando se carga la pagina
$(document).ready(() => {
    buscarMarcas();
    buscarCategorias();
    ponerCategoriasPadre();
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
    console.log(id);
}

$("#filtro-padres .filtrarPadres").on("click", () => {
    console.log("clic");
    console.log("Click en " + this.val());
});

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