//////////////////////////////////
////creating and cloning nodes////
//////////////////////////////////
//Example 1: creates a new section with a comment and a paragraph on it
/*createElement -> creates a node
createTextNode -> creates a text element
createComment -> creates a comment*/
let seccion=document.createElement("section");
let comentario=document.createComment("Comentario creado con JS para insertarlo en el DOM dinámicamente");
let nodo=document.createElement("p");
let texto=document.createTextNode("Texto creado con JS para insertalo en el DOM dinámicamente");
//nodevalue==null when type 1 or 9
console.log(seccion.nodeType, seccion.nodeName, seccion.nodeValue);
console.log (comentario.nodeType, comentario.nodeName, comentario.nodeValue);
console.log (nodo.nodeType, nodo.nodeName, nodo.nodeValue);
console.log (texto.nodeType, texto.nodeName, texto.nodeValue);


//Example 2: cloning a node and checking if it is connected with cloneNode and isConnected
// You can't insert the same element twice into the DOM. If you try, the element is moved so, at the end, you have it only once. The solution is cloning it.
// node.cloneNode(cloneChildren) -> if cloneChildren=true, it also clones children. After cloning, connecting the node to the DOM is needed
// node.isConnected -> returns true if the node is connected to the DOM.
let seccion_clonada=seccion.cloneNode(true);
console.log (seccion_clonada.isConnected);  //false


//Example 3: create a temporary DOM with createDocumentFragment
//createDocumentFragment
//why? to avoid forcing web browser to renderize the DOM with each change, avoiding a loss of performance. You make all the changes at temporary DOM and then connect to the real one
let estructura_temporal=document.createDocumentFragment();
//create several nodes
//attach to estructura_temporal
//attach estructura_temporal to the DOM


///////////////////////
////Inserting nodes////
///////////////////////

////Node API (older, supported by older browsers. Look for Node API: <method_name> in caniuse.com). Two methods:
//  -appendChild
//  -insertBefore

//Example 1: Creating a node and inserting it with appendChild (continues Example 1 of creating and cloning nodes)
//reference_node.appendChild(new_node) -> inserts new_node as the last child of reference_node
seccion=document.createElement("section");
comentario=document.createComment("Comentario insertado con appendChild");
nodo=document.createElement("p");
nodo.classList.add("insertado");
texto=document.createTextNode("Texto insertado con appendChild");
seccion.appendChild(comentario);
seccion.appendChild(nodo);
nodo.appendChild(texto);
document.body.appendChild(seccion);


//Example 2: appending a cloned node to the DOM (continues Example 2 of creating and cloning nodes)
seccion_clonada=seccion.cloneNode(true);
console.log (seccion_clonada.isConnected);  //false
document.body.appendChild(seccion_clonada);
console.log (seccion_clonada.isConnected);  //true


//Example 3: Creating a new list in a temporary structure and inserting it before a reference point
//container_node.insertBefore(new_node, reference_node) -> inserts new_node in container_node before reference_node or after the last child if reference_node==null
estructura_temporal=document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
    const nuevoElemento = document.createElement("p");
    nuevoElemento.textContent = `Elemento ${i}`;
    estructura_temporal.appendChild(nuevoElemento); // Añade a la estructura temporal, no al DOM.
}
let padre = document.querySelector("section#insertar1");
let nodo_referencia = document.querySelector("section#insertar1 p:nth-of-type(3)");
padre.insertBefore(estructura_temporal, nodo_referencia); // Una sola inserción al DOM.


////Element API (newer, supported by browsers starting at 2016.  Look for Node API: <method_name> in caniuse.com). Several methods:
//  -before -> inserts a node before another one
//  -after -> inserts a node after another one
//  -append -> inserts a node as the last child of another one
//  -prepend -> inserts a node as the first child of another one
//  -insertAdjacentElement -> inserts a node of type Element in a specific position
//  -insertAdjacentHTML -> inserts an HTML code in a specific position
//  -insertAdjacentText -> inserts a node of type text in a specific position


//Example 4: before -> insert a node before another one
//reference_node.before(new_node|string) inserts new_node|string before reference_node as a brother
nuevo_comentario = document.createComment("Esto es un comentario insertado con before en section#insertar1 p:first-of-type");
document.querySelector("section#insertar1 p:first-of-type").before(nuevo_comentario);
document.querySelector("section#insertar1 p:last-of-type").before("<p>esto es un texto insertado como texto con before después de section#insertar1 p:last-of-type</p>")


//Example 5: before can insert several nodes at the same time and even text
let punto_insercion = document.body;
nodo1 = document.createElement('section');
nodo2 = document.createElement('p');
punto_insercion.before(nodo1, nodo2, '<p>Este texto se va a insertar antes del body</p>');


//Example 6: after -> insert a node after another one 
//reference_node.after(new_node|string) inserts new_node|string after reference_node as a brother
nuevo_nodo = document.createElement("p");
nuevo_nodo.textContent = "Texto insertado mediante after en section#insertar1 p:nth-of-type(2)";
nuevo_nodo.classList = "insertado";

document.querySelector("section#insertar1 p:nth-of-type(2)").after(nuevo_nodo);
document.querySelector("section#insertar1 p:nth-of-type(4)").after("<p>esto es un texto insertado como texto con after antes de section#insertar1 p:nth-of-type(4)</p>")


//Example 7: after can insert several nodes at the same time and even text
punto_insercion = document.body;
nodo1 = document.createElement('section');
nodo2 = document.createElement('p');
punto_insercion.after(nodo1, nodo2, '<p>Este texto se va a insertar después del body</p>');


//Example 8: append -> insert a node as the last child of another one
//container_node.append(new_node)-> adds a new node as the last child of the container
//At this example innerHTML (Unsecure when getting data from untrusted sources, but you have to write less code) will be used instead of createTextNode (more secure, but you have to write more code)
punto_insercion=document.querySelector("ul>ul:nth-of-type(1)");
let elemento=document.createElement("li");
elemento.classList.add("insertado");
elemento.innerHTML="agria (insertado con append en ul>ul:nth-of-type(1))"
punto_insercion.append(elemento);


//Example 9: append can insert several nodes at the same time and even text
punto_insercion = document.body;
nodo1 = document.createElement('section');
nodo2 = document.createElement('p');
punto_insercion.append(nodo1, nodo2, '<p>Este texto se va a insertar como último hijo del body</p>');


//Example 10: prepend -> insert a node as the first child of another one
//container_node.prepend(new_node)-> adds a new node as the first child of the container
//At this example createTextNode (more secure, but you have to write more code) will be used instead of innerHTML (Unsecure when getting data from untrusted sources, but you have to write less code) 
punto_insercion=document.querySelector("ul");
elemento=document.createElement("li");
elemento.classList.add("insertado");
let fruta=document.createTextNode("mango (insertado con prepend en ul)");
elemento.append(fruta);

punto_insercion.prepend(elemento);


//Example 11: insertAdjacentElement, insertAdjacentHTML, insertAdjacentText
// reference_node.insertAdjacentElement("where", inserted_node)-> inserts a created element
// reference_node.insertAdjacentHTML("where", inserted_node) -> inserts an HTML code into DOM. No need to create an element. Much faster than innerHTML
// reference_node.insertAdjacentText("where", inserted_node) -> inserts plain text. It treats HTML tags as text
// "Where" can be one of the following: beforebegin, afterbegin, beforeend, afterend
punto_insercion=document.querySelector("section:nth-of-type(3)");

nodo=document.createElement("p");
nodo.textContent="un texto insertado con insertAdjacentElement beforebegin en section:nth-of-type(3). Por tanto, se coloca antes del nodo section:nth-of-type(3)";
nodo.classList.add("insertado")
punto_insercion.insertAdjacentElement("beforebegin", nodo);

nodo=document.createElement("p");
nodo.textContent="un texto insertado con insertAdjacentElement afterbegin de section:nth-of-type(3). Por tanto, se coloca como primer hijo del nodo section:nth-of-type(3)";
nodo.classList.add("insertado")
punto_insercion.insertAdjacentElement("afterbegin", nodo);

punto_insercion.insertAdjacentHTML("beforeend", "<p class=\"insertado\">un texto insertado con insertAdjacentHTML beforeend en section:nth-of-type(3). Por tanto, se coloca antes del final (como último nodo) del nodo section:nth-of-type(3)</p>");

punto_insercion.insertAdjacentText("afterend", "<p class=\"insertado\">un texto insertado con insertAdjancentText afterend de section:nth-of-type(3). Por tanto, no se interpretan las etiquetas HTML y se coloca después de que se cierre el nodo section:nth-of-type(3)</p>");


// Example 12: Creating a form field with its label and inserting it before another one with after
const fragmento = document.createDocumentFragment();
const nuevoFieldset = document.createElement("fieldset");

const etiquetaDireccion = document.createElement("label");
etiquetaDireccion.setAttribute("for", "direccion");
etiquetaDireccion.textContent = "Dirección";

const inputDireccion = document.createElement("input");
inputDireccion.setAttribute("type", "text");
inputDireccion.setAttribute("id", "direccion");
inputDireccion.setAttribute("name", "direccion");
inputDireccion.setAttribute("placeholder", "Introduce tu dirección");

// Añadir los elementos al nuevo fieldset
nuevoFieldset.appendChild(etiquetaDireccion);
nuevoFieldset.appendChild(inputDireccion);

// Añadir el fieldset al fragmento
fragmento.appendChild(nuevoFieldset);

// Insertar el fragmento después del campo "Apellidos"
const formulario = document.getElementById("formulario-contacto");
const fieldsetApellidos = formulario.querySelectorAll("fieldset")[1]; // Segundo fieldset (Apellidos)
fieldsetApellidos.after(fragmento);


///////////////////////
////Replacing nodes////
///////////////////////
////Node API: replaceChild
// parentNode.replaceChild(newChild, oldChild) -> replaces oldChild, located at parentNode, with newChild

//Example 1: replaceChild
const nodoPadre = document.querySelector('#gato');
const nodoAntiguo = document.querySelector('#gato>img');
const nodoNuevo = document.createElement('img');
nodoNuevo.src="https://picsum.photos/300";
nodoNuevo.alt = 'Una imagen aleatoria';

nodoPadre.replaceChild(nodoNuevo, nodoAntiguo);


////Element API: 
//  replaceWith -> Replaces all children of an element INCLUDING the element itself
//  replaceChildren -> replaces all childdren of an element BUT NO the element itself
//  both of them accept several nodes at the same time as arguments

//Example 2: replaceWith -> replace a node and all its descendants (but not the node itself)
//  oldElement.replaceWith(newElements)-> Replaces all children of oldElement with newElements but NOT oldElement itself
objetivo=document.querySelector("#sustituir1");
parrafo=document.createElement("p");
parrafo.classList.add("insertado");
parrafo.textContent="el article que había aquí se ha sustituido por este párrafo. Como ha usado replaceWith, el article no desaparece";
//alternative to .textContent:
//  texto=document.createTextNode("nuevo texto");
//  parrafo.appendChild(texto);
objetivo.replaceWith(parrafo);  


//Example 3: replaceWith can replace several nodes at the same time, even text
objetivo=document.querySelector("#sustituir2");
parrafo=document.createElement("p");
parrafo.textContent="Párrafo que ha sustituido al que había aquí antes con replaceWith";
parrafo2=document.createElement("p");
parrafo2.textContent="Párrafo que ha sustituido al que había aquí antes con replaceWith";
objetivo.replaceWith(parrafo, parrafo2, "<p>Texto insertado con replaceWith</p>");


//Example 4: replaceChildren -> replace a node and all its descendants (including the node itself)
//  oldElement.replaceChildren(newElements)-> Replaces all children of oldElement with newElements INCLUDING oldElement itself
objetivo=document.querySelector("#sustituir3");
parrafo=document.createElement("p");
parrafo.textContent="Párrafo que ha sustituido al todo el bloque section que había aquí antes con replaceChildren";
parrafo.classList.add("insertado");
objetivo.replaceChildren(parrafo);


//Example 5: replaceWith can replace several nodes at the same time, even text
objetivo=document.querySelector("#sustituir4");
parrafo=document.createElement("p");
parrafo.textContent="Párrafo que ha sustituido al que había aquí antes con replaceWith";
parrafo2=document.createElement("p");
parrafo2.textContent="Párrafo que ha sustituido al que había aquí antes con replaceWith";
objetivo.replaceWith(parrafo, parrafo2, "<p>Texto insertado con replaceWith</p>");


//////////////////////
////Removing nodes////
//////////////////////
// Node API: removeChild

//Example 1: remmoveChild
//parentNode.removeChild(nodeToRemove) -> takes a reference to the parent node and the node being removed (the child). Returns a reference to the removed node so it can be connected to the DOM again
//removing does not erases the element. It just disconnects it from the DOM, but still exists (until web browser's garbage collector removes it from memory)
let borrar=document.querySelector("#lista_compra");
borrar.isConnected ? console.log ("El elemento está conectado al DOM") : console.log ("El elemento no está conectado al DOM");
let referencia=document.querySelector("#lista").removeChild(borrar);
borrar.isConnected ? console.log ("El elemento está conectado al DOM") : console.log ("El elemento no está conectado al DOM");
document.body.appendChild(referencia);  //the "removed" element is back!

// Element API: remove

//Example 2: remove
// node.remove() -> removes the node from the DOM. It does not return a reference to the removed node, so it's unrecoverable
borrar.remove(document.querySelector("#lista_compra > ul"));    //remove does not returns a reference to the recently removed element, so it's unrecoverable