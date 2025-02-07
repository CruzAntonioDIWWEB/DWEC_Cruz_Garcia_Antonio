//23/01/2025
//ADJUNTAR EVENTOS
//esto se supone que tiene que cambiar de color el primer boton al hacerle click, PERO NO LO HACE
 let nodo = document.querySelector("#botones>button:nth-of-type(1)"); //esto se le añade al primer boton
 //let nodo = document.querySelector("#botones");
// const cambiar=()=>{
//     nodo.classList.toggle("rojo");
// }
// document.body.addEventListener("click", cambiar); //cambiar es el nombre de la funcion

// //dos eventlistener al mismo elemento pero con funciones distintas
// nodo.addEventListener("click", ()=>{console.log("manejador1")});
// nodo.addEventListener("click", ()=>{console.log("manejador2")});

// //definirlo como clase
// class manejadorEventos{
//     constructor(element){
//         if(!element){
//             throw new Error("el elemento no existe");
//         }else{
//             element.addEventListener("click", ()=>{this.mostrarInformacion()})
//         }
//     }
//     mostrarInformacion(){
//         alert("What are ou doing ma boy, you woke me up it better be important, if not just piss off");
//     }
// }

// nodo = document.querySelector('#botones').firstElementChild; //AHORA CUANDO LE DE AL PRIMER BOTON ME SALE UN MENSAJE EN UN PROMPT
// try{
//     const boton = new manejadorEventos(nodo);
// }catch(error){
//     console.log(error.message);
// }


//PROPIEDADES//
/*
type --> tipo del evento
target --> nodo que disparó el elemento
currentTarget --> nodo al que se le asignó el manejador de eventos
isTrusted --> si el usuario pincha en el boton devuelve true
timeStamp --> el tiempo que ha pasado desde que se cargó la pagina y el usuario le dio al boton
clientX
clientY
altKey
ctrlKey
shitKey
dataset.
*/

// nodo = document.querySelector('#botones').firstElementChild;
// nodo.addEventListener("click", (evento) => {
//     console.log(evento.type,
//                 evento.target,
//                 evento.currentTarget,
//                 evento.isTrusted,
//                 evento.timeStamp,
//                 evento.clientX,
//                 evento.clientY,
//                 evento.altKey,
//                 evento.ctrlKey,
//                 evento.shiftKey,
//                 evento.target.dataset.nombre,
//                 evento.target.dataset.fecha
//     );

//     if(evento.target.dataset.mostrar){

//     }

// });


// //evitar el comportamiento por defecto de un evento
// //por ejemplo, que el boton derecho del raton no funcione o que no puedas salir de la pagina
// //esto no nos va a dejar que usemos el enlace que hay en el index
// document.querySelector("a").addEventListener("click", evento => {
//     evento.preventDefault(); //evita que las cosas se comporten como deberían
//     alert("DE AQUI NO SALES CARAPANNN");
// });

// //bloquear el boton derecho en el documento completo
// document.addEventListener("contextmenu", evento=>{          //"contextmenu" es el click derecho
//     evento.preventDefault(); 
//     alert("NO PUEDES COPIAR EL TEXTO DE ESTA PAGINA GITANO")
// });

// //se lo voy a aplicar a una seccion
// document.querySelector("#botones").addEventListener("contextmenu", evento=>{
//     evento.preventDefault();
//     alert("HAHA GITANO NO PUEDES GITANEAR");
// });


// //eliminar manejadores de eventos
// document.querySelector("#mouseover").addEventListener("mouseover", ()=>{
//     document.querySelector("p.informacion").innerText += "has pasado el raton por encima del boton";
// });

// //24/01/2025
// //No voy a copiar, copia el codigo del profe en github
// //Si queremos eliminar con eventListener hay que usar una funcion con nombre 
// // document.querySelector("#mouseover").removeEventListener("mouseover", nombreFuncion);

// let botonOver = document.querySelector("#mouseover");
// function responderOverMouse(){
//     document.querySelector("p.informacion").innerText += "has pasado el raton por encima del boton";
// }

// function eliminarManejador(){
//     botonOver.removeEventListener("mouseover", responderOverMouse);
//     caja_texto.innerText = "Ya no se escuchan mas putos eventos colega espabila"
// }

// botonOver.addEventListener("mouseover", responderOverMouse);
// botonOver.addEventListener("mouseover", responderOverMouse);

//PROPAGACIÓN DE EVENTOS
// fase 1 --> captura de eventos (capturing)
// fase 2 --> objetivo (target)
// fase 3 --> burbujeo de eventos (bubbling) se usa por defecto

//FASE 1: window -> document -> html -> body -> section -> article -> p     NO ES LA FASE POR DEFECTO
//FASE 3: p -> article -> section -> body -> html -> document -> window 

// document.querySelector("article").addEventListener("mouseover", ()=>{
//     alert("estoy gestionando este evento");
// })

// document.querySelector("p").addEventListener("click", ()=>{
//     alert("estoy haciendo click en el p");
// }) 

//

// document.querySelector("section").addEventListener("click", (evento)=>{
//     alert("Fase de bubling: el evento ha llegado a " + evento.currentTarget.tagName + " pero lo ha lanzado " + evento.target.tagName);
// });

// document.querySelector("article").addEventListener("click", (evento)=>{
//     alert("Fase de bubling: el evento ha llegado a " + evento.currentTarget.tagName + " pero lo ha lanzado " + evento.target.tagName);
// });

// //El navegador le da prioridad a la fase 1 aunque se no sea la de por defecto
// document.querySelector("section").addEventListener("click", (evento)=>{
//     alert("Fase de captura: el evento ha llegado a " + evento.currentTarget.tagName + " pero lo ha lanzado " + evento.target.tagName);
// }, {capture: true}); //se necesita esto para que sea fase 1

// document.querySelector("article").addEventListener("click", (evento)=>{
//     alert("Fase de captura: el evento ha llegado a " + evento.currentTarget.tagName + " pero lo ha lanzado " + evento.target.tagName);
// }, {capture: true});


// //PARAR LA PROPAGACIÓN DE EVENTOS
// document.querySelector("article").addEventListener("click", (evento)=>{
//     alert("Fase de bubling: el evento ha llegado a " + evento.currentTarget.tagName + " pero lo ha lanzado " + evento.target.tagName);
//     evento.stopPropagation(); //esto para la propagación del evento
// });

document.querySelector("button:nth-of-type(1)").addEventListener("click", (evento)=>{
    alert("Has hecho click en el primer boton");
    evento.stopPropagation(); //esto para la propagación del evento
});

document.querySelector("button:nth-of-type(2)").addEventListener("click", (evento)=>{
    alert("Has hecho click en el segundo boton");
    evento.stopPropagation(); //esto para la propagación del evento
});

document.querySelector("button:nth-of-type(3)").addEventListener("click", (evento)=>{
    alert("Has hecho click en el tercer boton");
    evento.stopPropagation(); //esto para la propagación del evento
});

document.querySelector("button:nth-of-type(4)").addEventListener("click", (evento)=>{
    alert("Has hecho click en el cuarto boton");
    evento.stopPropagation(); //esto para la propagación del evento
});


//ALGUNOS EVENTOS COMUNES
//lcick, mouseover (en el github del profe están en el README)
//con esto estamos seleccionando el primer input que hay
document.querySelector("input").addEventListener("keydown", (evento)=>{
    console.log("El evento que ha ocurrido es " + evento.type + " y has pulsado la tecla " + evento.code);
    document.querySelector("input").classList.add("rojo");
});

//eventos de formulario
// submit => un formulario es enviado
// change => el valor de un campo de entrada cambia
// input => similar a change pero ocurre mientras el usuario escribe
// focus => un campo de entrada recibe el foco
// blur => un campo de entrada pierde el foco
// somalia => un campo de entrada es somalí

document.body.addEventListener("load", ()=>{
    alert ("has cargado el documento");
});

window.addEventListener("resize", ()=>{
    alert("Has redimensionado el navegador");
})

window.addEventListener("scroll", ()=>{
    alert("puedes bajar infinito");
})

document.querySelector("input").addEventListener("copy", ()=>{
    console.log("has copiado tio guarro");
    evento.preventDefault();
})


//Eventos de documento
// DOMContentLoaded : Cuando el DOM está completamente cargado
// load : todos los recursos (imagenes, script, etc) están completamente cargados
// resize : la ventana del navegador se redimensiona
// scroll : el usuario desplaza la página

//al pulsar en boton1 se carga un script en la web que no esté cargado de antes

//carga dinámica
let boton = document.querySelector("button");
boton.addEventListener("click", () => {
    const script = document.createElement("script");
    script.src = "js/scriptTonto.js";
    script.type = "text/javascript";
    document.head.append(script);
})

//FIN DE LA HISTORIA DEL DOM//