//21/01/2025
//! MODIFICAR EL DOM
//? Creación de nodos
let elemento = document.createElement('p');
document.createComment('Comentario que irá en el HTML');
document.createTextNode('Texto que irá en el HTML');

// Clonar nodos
let elementoClonado = elemento.cloneNode(true); // true: clona el nodo y todo su contenido
console.log(elementoClonado.isConnected); // false (no está conectado al DOM)

// Crear una estructura temporal para añadirla al DOM más tarde
let fragmento = document.createDocumentFragment();

//? Insertar nodos
// NodeAPI (Antigua)
elemento.appendChild(document.createTextNode('Texto')); // Añade un nodo al final del elemento
elemento.insertBefore(document.createTextNode('Texto'), elemento.firstChild); // Añade un nodo al principio del elemento
elemento.insertBefore()

// ElementAPI (Actual)
// Before
let comentario = document.createComment('Comentario');
document.querySelector('p').before(comentario);

// After
document.querySelector('p').after(comentario2);

// Append
document.querySelector('p').append(comentario); //a la derecha

// Prepend
document.querySelector('p').prepend(comentario); //a la izquierda

// InsertAdjacentElement
document.querySelector('p').insertAdjacentElement('beforebegin', comentario); // Antes del elemento
document.querySelector('p').insertAdjacentElement('afterbegin', comentario); // Dentro del elemento, al principio
document.querySelector('p').insertAdjacentElement('beforeend', comentario); // Dentro del elemento, al final
document.querySelector('p').insertAdjacentElement('afterend', comentario); // Después del elemento

// ReplaceChild (Solo un elemento)
document.querySelector('p').replaceChild(comentario, document.querySelector('p').firstChild);

// ReplaceWith (Todos los elementos)
document.querySelector('p').replaceWith(comentario);

// ReplaceChild


///////////
//APUNTES JUAN//
///////////
//creando nodos
//Element,Comment, Text

let seccion = document.createElement("section");
comentario = document.createComment("Esto es un comentario que irá en el HTML");
let texto = document.createTextNode("Esto es un texto creado en JS");

console.log(seccion.nodeType, seccion.nodeName, seccion.nodeValue);
console.log(comentario.nodeType, comentario.nodeName, comentario.nodeValue);
console.log(texto.nodeType, texto.nodeName, texto.nodeValue);

//clonar nodos
let elemetnoClonado = seccion.cloneNode(true);
console.log(seccion.isConnected);

//Crear una estructura temporal
let estructuraTemporal = document.createDocumentFragment();

///Insertar nodos//

//Node API -> antigua()
//nodoReferencia.appendChild(new_node) - inserta como el último hijo del nodoReferencia
//insertarBefore
seccion.appendChild(comentario);
seccion.appendChild(texto);

let puntoInsercion = document.getElementsByTagName("section");
puntoInsercion[0].appendChild(seccion);



let parrafo = document.createElement("p");
texto = document.createTextNode("esto es un texto");
parrafo.appendChild(texto);
estructuraTemporal.appendChild(parrafo);
document.body.appendChild(estructuraTemporal);

let lista = document.createElement("ul");
let elemento1 = document.createElement("li");
texto = document.createTextNode("Esto es un texto");
elemento1.appendChild(texto);

let elemento2 = document.createElement("li");
texto = document.createTextNode("Esto es un texto");
elemento2.appendChild(texto);

lista.appendChild(elemento2);
lista.appendChild(elemento1);
estructuraTemporal.appendChild(lista)
document.body.appendChild(estructuraTemporal);
//insertar estructura temporal con ul li*5{hola}

let texto2;
let inicioLista = document.createElement("ul");
let nodo;
for (let i = 0; i < 5; i++) {
    nodo = document.createElement("li");
    console.log(nodo);
    texto2 = document.createTextNode("hola");
    console.log(texto);
    nodo.appendChild(texto2);
    inicioLista.appendChild(nodo);
}
estructuraTemporal.appendChild(inicioLista);
document.body.appendChild(estructuraTemporal);


//contenedorDeReferencia.insertBefore(nodoNuevo,nodoDeReferencia)
elemento = document.createElement("p");
texto = document.createTextNode("este es el texto del párrafo");
elemento.appendChild(texto);
//.outerText
//.TextContent
contenedorReferencia = document.querySelector("section");
nodoReferencia = document.querySelector("section > ul");

contenedorReferencia.insertBefore(elemento, nodoReferencia);

//Element API
//before
//after
//append
//prepend
//insertAdjacentHTML
//insertAdjacentText
//insertAdjacentElement

//ejemplo de before
let comentario2 = document.createComment("Esto es un comentario aleatorio");
document.querySelector("section").before(comentario2);

//ejemplo de after
let elemento3 = document.createElement("p")
elemento3.textContent = "este es el texto del parrafo";
//createText("este alsdkjafada");
//appendChild
document.querySelector("section").after(elemento3);


//append
//contenedor.append(nuevoNodo) -> ultimo hijo
let insercion = document.querySelector("section");
let nuevaLista = document.createElement("ul");
let el1 = document.createElement("li");
el1.textContent = "elemento1";

let el2 = document.createElement("li");
el2.textContent = "elemento2";

nuevaLista.appendChild(el1);
nuevaLista.appendChild(el2);
insercion.append(nuevaLista)

//contenedor.prepend(nuevoNodo) -> primer hijo
let listaClonada = nuevaLista.cloneNode(true);
insercion.prepend(nuevaLista);


/*
//nodoReferencia=insertAdjacentElement("where",newNode)
//insertAdjacentText
//insertAdjacentHTML
//where -> beforebegin,afterbegin,beforeend,afterend
let puntoInsercion2 = document.querySelector("section");
let nodo2 = document.createElement("p");
nodo2.textContent = "<strong>insertAdjacentText</strong>"
nodo2.classList.add("fondoRojo");
puntoInsercion2.insertAdjacentElement("afterend", nodo2);

puntoInsercion2.insertAdjacentText("afterend","<p>Este parrafo se va a quedar en un simple texto</p>");
puntoInsercion2.insertAdjacentText("afterend","<p>Este parrafo si que es un párrafo de verdad</p>");

//XSS (cross site scripting)
cadena="<script>alert(\"eres un pringao\")</script>"
puntoInsercion2.insertAdjacentHTML("afterend",cadena);

//limpiar las cadena que leamos de fuentes desconocidas //docs/3- modifying.MD markdown
*/

//reemplazamos
// NODE API:
// nodoReferencia.replaceChild(newNode, oldNode);
let nodoReferencia = document.querySelector("ul");
let nodoViejo = document.querySelector("ul>li:nth-of-type(3)>ul");
const nodoNuevo = document.createComment("comentario dentro de una lista");
const elementoNuevo = document.createComment("esto es un texto");
//nodoReferencia.replaceChild(nodoNuevo,nodoViejo);antiguo


//Element API (se recomienda usar más que el node api):
// oldNode.replaceWith(newNode)
// replaceChildren
//Revisar
nodoViejo.replaceWith(nodoNuevo);



//eliminarlos


//Elemento API
//23/01/2025
// oldNode.replaceWith(newNode) ==> todos los hijos del nodo Y EL PROPIO NODO
// replaceChild ==> todos los hijos del nodo pero no el propio nodo
nodoReferencia.replaceWith(nodoNuevo);
nodoReferencia.replaceChildren(nodoNuevo, elementoNuevo, "<p>TEXTO TEXTO TEXTO</p>"); //se sustituye por todo lo del paréntesis


//eliminar elementos
//Node API: removeChild -> nodoPadre.removeChild(nodoAEliminar);
let padre = document.querySelector("#lista>ul"); 
document.querySelector("#lista").removeChild(document.querySelector("#lista<ul"));
//padre.removeChild(padre.firstChild); este no funciona
let elementoQuitado = padre.removeChild(padre.querySelector("li:nth-of-type(1)"));
console.log(elementoQuitado.isConnected); //esto me va a dar false porque se ha desconectado del DOM, pero el elemento eliminado todavia existe
document.body.appendChild(elementoQuitado); //pero puedo volver a conectarlo, porque no ha dejado de existir



//element API: remove -> nodoAEliminar.remove();
//si yo elimino elimino, volver a conectar un elemento eliminado no se puede hacer
padre.remove(); 

