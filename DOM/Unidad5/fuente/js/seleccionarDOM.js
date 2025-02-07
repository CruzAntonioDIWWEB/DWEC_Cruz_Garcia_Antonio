/*
El profe usa firefox para ver esto, y en la consola de firefox, si pones document, te sale el DOM, tengo que activar la consola web
Hay un objeto global que se llama window, que tiene una propiedad llamada document, que es el DOM.
El document es nuestro punto de acceso a la pagina



*/

console.log(document.head);
console.log(document.body);

//Empezamos a seleccionar elementos
let elemento = document.getElementById("unico"); //lorem
console.log(elemento);

//colección
let lista = document.getElementsByTagName("p"); //devuelve una coleccion con todos los elementos p
console.log(lista); //el profe comenta el console log de arriba para ver este
console.log(lista[0], lista[1]);

let aux = document.getElementsByClassName("especial"); //devuelve otro array

aux = document.getElementsByName("nombre"); //devuelve otro array
console.log(aux);

document.querySelector("p") //devuelve EL PRIMER elemento que coincida con el selector
document.querySelectorAll("p") //devuelve TODOS los elementos que coincidan con el selector
//selecciono el ultimo elemento de la ultima seccion
aux = document.querySelector('section:last-of-type ul>li:last-of-type');
console.log(aux);

