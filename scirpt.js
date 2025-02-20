import $ from jquery; //Con esto ya puedo usar jquery en mi archivo js

//el objeto jquery se referncia con el signo $
//esto es la version antigua
$(document).ready(function(){
    //codigo
});

//esto es la version nueva, espera a que el DOM este cargado antes de usar el jquery
$(function(){
    //codigo
});

//selectores
$(()=>{

    console.log($("parrafo")); //seleccionar un elemento
    console.log($("p"), $("section")); //seleccionar todos los elementos de tipo parrafo y section
    console.log($("p:last-of-type")); //seleccionar todos los elementos con la clase parrafo
    console.log($("tr:even")); //seleccionar todos los elementos pares

    //eventos
    $("boton1").on("click", ()=>{
        alert("Eres un parguela");
    });
    //click, mouseover, mouseout, keyup, keydown, keypress, focusin, focusout, submit, change, resize, scroll, load

    $("#boton2").on("mouseover", ()=>{
        console.log("Estas sobre el boton");
    });

    //Modificar atributos y propiedades
    $("p").on("mouseover", ()=>{
        $("p.parrafo").test("nuevo texto");
    });

    //cuando le de al boton, el enlace se cambia de google a ecosia
    $("#boton2").on("click", ()=>{
        $("a").attr("href", "https://www.ecosia.com");
    });

    $("#boton3").on("click", ()=>{
        $("img").attr("alt", "me cago en san pitopato quien es ese")
    });

    $("#boton4").on("click", ()=>{
        $("prop").toggle("display", "none");      
    });

    //esto borra el boton4
    $("#boton4").on("click", ()=>{
        $("#boton3").off("click");
    });
    
    //modificacion del DOM
    //asi añado literlamente una etiqueta al html que locura 
    $("section").append("<p>Este es un nuevo parrafo PRIMERO</p>");
    $("section").prepend("<p>Este es un nuevo parrafo ULTIMO</p>");

    //envolviendo una seccion en otra seccion
    $("section").wrap("<section></section>");

    //desenvolviendo el directorio
    $("section").unwrap();

    $("section").remove();

    //navegacion por el DOM
    $(".nueva-sec").parent();
});

//el copilot es un asqueroso y no me deja hacer nada bien porque es un puto bot de mierda que no sabe hacer nada bien y me cago en su puta madre que asco de bot de mierda 
// y como el copilot es un asqueroso y no me deja hacer nada bien, me cago encima de su puta madre que asco de bot de mierda que no sabe hacer nada bien y me cago en su puta madre que asco de bot de mierda 
// ademas githubcopilot come pollas y no sabe hacer nada bien y me cago en su puta madre que asco de bot de mierda que no sabe hacer nada bien y me cago en su puta madre que asco de bot de mierda
//sopa de macaco con caca de perro y me cago en su puta madre que asco de bot de mierda que no sabe hacer nada bien y me cago en su puta madre que asco de bot de mierda  
//QUE EPICO ES ESTE CODIGO J Y ADEMAS EL COPILOT ES UNA PUTA MIERDA QUE NO SABE HACER NADA BIEN
//Y ME CAGO EN SOMALIA QUE ASQUEROSA ES ESA MIERDA DE PAIS Y ME CAGO EN SU PUTA MADRE QUE ASCO DE PAIS DE MIERDA QUE NO SABE HACER NADA BIEN Y ME CAGO EN SU PUTA MADRE QUE ASCO DE PAIS DE MIERDA 
//ostia que duro
//el primas sabes quien es el copilot? es un asqueroso que no sabe hacer nada bien y me cago en su puta madre que asco de bot de mierda que no sabe hacer nada bien y me cago en su puta madre que asco de bot de mierda aunque no se si es un bot o no pero me cago en su puta madre que asco de bot de mierda que no sabe hacer nada bien y me cago en su puta madre que asco de bot de mierda 

//18/02/2025
//Efectos
$("#WTF").on("click", ()=>{
    $("p").hide();
    alert("Has ocultado los parrafos y ere un parguela");
});

$("section").on("click", ()=>{
    $("p").show();
    alert("Has mostrado los parrafos y ere un parguela");
});

//A hide se le pueden poner parametros como low y fast para determinar el tiempo que tardará en desaparecer el elemento
//show es lo contrario a hide, muestra el elemento
//toggle alterna entre hide y show
//fadein y fadeout, alterna entre opacidad 0 y 1
//fadeTo, cambia la opacidad a un valor determinado

//asincronia
//ajax --> es el objeto de Jquery que hace la llamada


