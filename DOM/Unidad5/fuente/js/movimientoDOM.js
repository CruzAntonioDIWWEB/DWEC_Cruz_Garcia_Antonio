//23/01/2025
//MOVERNOS POR LOS HIJOS//
let nodoOrigen = document.body;

console.log(nodoOrigen.children, nodoOrigen.firstElementChild); //Devuelven el primer hijo y el primer hijo de tipo elemento
console.log(nodoOrigen.lastElementChild.classList("rojo")); //devuelve el ultimo hijo de tipo elemento

for(let nodos of nodoOrigen.children){ //.children devuelve una coleccion de los hijos
    console.log(nodo.nodeType());
}

//Otra forma de recorrer la coleccion de hijos
Array.from(nodoOrigen.children).forEach((nodo) =>{
    console.log(nodo);
});

console.log(nodoOrigen.childNodes); //devuelve todos los hijos sean del tipo que sean
console.log(nodoOrigen.firstChild); //devuelve el primer hijo del nodo sea del tipo que sea
console.log(nodoOrigen.lastChild); //devuelve el ultimo hijo del nodo sea del tipo que sea


//MOVERNOS POR LOS HERMANOS//
//Tenemos 4 metodos
nodoOrigen = document.querySelector("#lista");

console.log(nodoOrigen.previousElementSibling); //devuelve el hermano previo del nodoOrigen que sea de tipo elemento
console.log(nodoOrigen.nextElementSibling); //devuelve el siguiente hermano de tipo elemento
console.log(nodoOrigen.previousSibling); //devuelve el hermano anterior sea del elemento que sea
console.log(nodoOrigen.nextSibling); //devuelve el siguiente hermano sea del elemento que sea


//MOVERNOS POR EL PADRE//
console.log(nodoOrigen.parentElement, nodoOrigen.parentNode); //me va a devolver el padre de la sección de tipo elemento y de cualquier tipo


//ENCADENAR MOVIMIENTOS//
document.querySelector("main").children[1].nextElementSibling.classList.add("fondo-rojo"); //el main del html tiene 3 hijos de tipo elemento, las 2 secciones y el botón (hasta el momento)
document.querySelector("main").children[1].nextElementSibling.setAttribute("fecha_nacimiento", "1/1/2025"); //ESTO QUE HACE


//METODOS ADICIONALES//
//closest
let nodo = document.querySelector("[href*='ecosia']");
console.log(nodo.closest("section")); //me devuelve el padre de tipo section mas cercano a ese nodo

//contains
nodoOrigen = document.querySelector("#lista");
nodoBuscado = document.querySelector("ul");
console.log(nodoOrigen.contains(nodoBuscado)); //esto devuelve true o false si el nodoOrigen contiene el nodoBuscado
