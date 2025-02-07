/*
16/01/2025
tipos de nodos, hay muchos pero nosotros vamos a ver estos 4

    1 -> elemento <p> 
    2 -> TIPO ATRIBUTO
    3 -> TIPO TEXTO
    8 -> comentarios
    9 -> documento
*/

/////////////////
//17/01/2025
//REPASO DE LO DE AYER
//formas de conseguir informacion de los nodos
let titulo1 = document.getElementById("titulo1");
console.log(titulo1.nodeType, titulo1.nodeName, titulo1.nodeValue);
console.log(document.body.nodeType, document.body.nodeName, document.nodeName.nodeValue);

//formas de modificar los nodos
//Interpretan las etiquetas html (peligro de inyeccion de codigo, hay que comprobar que todo está correcto)
//-innerHTML
//-outerHTML

//No las interpretan (no hay peligro de inyección de código)
//-innerText
//-outterText
//-textContent

//la manera de insertar texto
console.log(cabecera[0].textContent("Texto que inserto"))

/*
MANIPULAR ATRIBUTOS

dos tipos:
    -estandard
    -definidos por el usuario

*/
//comprobar si un nodo tiene un atirbuto
let imagen7 = document.querySelector("./media/spiderdroga.jpg");
console.log(imagen7.hasAttributes("src")); //le pregunto si tiene el atributo src

//darle valor a propiedad no estandar o crear propiedad no estandar si no existe
document.body.setAttribute("fecha", "17/01/2025");
imagen7.fecha="17/01/2025";

//darle valor a una propiedad estándar
imagen7.alt="Spiderman vendiendo fucking coca hermano quiere?";
imagen7.setAttribute("alt", "Spiderman vendiendo fucking coca hermano quiere?"); //tambien se puede hacer así

//leer valores no estandard y estandard
console.log(document.body.getAttribute("fecha"));

//acceder a los atributos de un nodo
imagen7.getAttributeNames().forEach(atributo => { //accede a los nombres
    console.log(atributo);
});

for(let atributo of imagen7.attributes){ //accede a los valores
    console.log(`nombre ${atributo.name} vlor ${atributo.value}`);
}

console.log(document.getElementsByTagName("p")[0].attributes); 
document.body.removeAttribute("id"); //borrar un atributo

/*
CLASES

//metodos básicos para obtener información de las clases
classList -> devuelve una lista (no es un array pero es una lista)
.length
.value
.name
.item()
.contains("algo")
*/

//Recorro la lista de clases
let listado = Array.from(document.getElementsByClassName("especial"));
listado.forEach(parrafo=>{
    console.log(parrafo.classList.length);
    console.log(parrafo.classList.value);
    console.log(parrafo.classList.contains("unaclasequenoexiste"));
    console.log(parrafo.classList.contains("especial"));
    parrafo.classList.forEach(clase => {
        console.log(clase);
    });
});

//Eliminar una clase
listado[0].classList.remove("especial");

//Añadir una clase
listado[0].classList.add("una_clase_nueva");

//Reemplaza una clase por la otra
listado[1].className="una_clase otra_clase"; //esta sobreescribe
listado[1].classList="otra_clase_mas"; //con esta no se elimina lo que hay se añade

listado[2].classList.replace("especial", "tuMadre"); //esta sobreescribe solo un elemento

//Alternar
listado[1].classList.toggle("verde");

//atributos logicos (booleanos)
/*
un booleano en html funciona de la siguiente manera: si existe/está es true sino es false
*/

let boton = document.getElementsByTagName("button");
console.log(boton[0]);
boton.setAttribute("disabled", "");
boton.toggleAttribute("disabled"); //si no existe lo crea, si existe lo borra
setTimeout(() => {
    boton[0].toggleAttribute("disabled");
}, 5000);


////////////////

document.getElementById("titulo1").nodeType; //1  y selecciona el h1
document.getElementsByTagName("body");
document.body.firstChild.nodeType;
document.body.firstChild.nodeValue; //esto es null porque no hay texto

document.body.getElementsByTagName("section")[0].firstChild.nodeType; //es una lista de todas las secciones, entre todas elijo la primera y dentro elijo primer elemento

//innerHTML, outerHTML
//la diferencia es que innerHTML devuelve el contenido del elemento, y outerHTML devuelve el elemento con todo su contenido
document.getElementById("titulo1").innerHTML="<strong>      esto es un texto originado por js</strong>"; //selecciona la etiqueta y cambia el contenido
document.getElementsByTagName("h2")[0].outerHTML="</strong>          esto es un titulo de nivel 2</strong>"; //selecciona la etiqueta h2 y la cambia completamente hasta la propia etiqueta

//voy a cambiar el contenido de los párrafos
//para ello primero tengo que convertir la coleccion en un array para despues recorrerlo

// Seleccionar todos los párrafos y convertirlos en un array
let lista = Array.from(document.getElementsByTagName("p"));

// Corregir el uso de forEach
lista.forEach((elemento) => {
    setTimeout(() => {
        elemento.innerHTML = "TEXTO GENERADO";
    }, 3000);
});

// Seleccionar todos los elementos h3
let lista2 = Array.from(document.getElementsByTagName("h3"));

// Actualizar el contenido con outerHTML correctamente
lista2.forEach((elemento) => {
    setTimeout(() => {
        elemento.outerHTML = "<h1>TEXTO GENERADO CON TEXTO MÁS GRANDE</h1>";
    }, 3000);
});

//innerText, outerText, textContent
//incluir etiquetas HTML, incluil espacios

lista = document.getElementsByTagName("p");
lista[0].innerText = "<p>hola </p>"; //esto no lo interpreta como HTML
lista[1].outerHTML = "<p>hola </p>"; //esto si lo interpreta como HTML
lista[2].textContent = "<p>hola </p>"; //esto no lo interpreta como HTML


//seleccionar una imagen
let imagen = document.getElementsByTagName("img");
imagen.alt="un precioso spiderman vendiendo cocaina en barra";
imagen.nombreimagen="spiderMEGADROGA";
//esto no le va al profe en la virgen en la virgen son ya las 14:36
imagen.setAttribute("mecagoenlamierda", "claroTio");
console.log(imagen.hasAttribute("mecagoenlamierda"));




