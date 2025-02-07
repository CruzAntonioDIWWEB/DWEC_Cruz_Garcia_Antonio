// /*
// 30/01/2025
// */

// //04/02/2025
// //TEORÍA DE LOCATION

// console.log(location.href); //muestra la url
// //location.href = "https://www.ecosia.org"; //redirige a la url que le pongamos

// console.log (location.protocol,
//     location.host,  //muestra el host
//     location.hostname, //muestra el nombre del host
//     location.port, //muestra el puerto
//     location.pathname, //muestra la ruta
//     location.search, //muestra la query
//     location.hash //devuelve lo que viene detrás del # en una URL
// );

// //location.replace() //redirige y sustituye el historial de navegación
// //location.assign() //redirige pero no sustituye el historial


// //TEORÍA DE HISTORY
// history.back(); //vuelve a la página anterior

// //History también permite almacenar algo de información 
// let numero = 1;
// document.getElementById("anyadir").addEventListener("click", () => {
//     const informacion = { pagina: numero, titulo: `Pagina ${numero}` };  //esta es la información que vamos a añadir al historial
//     history.pushState(informacion, `Pagina ${numero}`, `?pagina=${numero}`); //añadimos la información al historial
//     console.log(`se ha añadido al historial la info ${numero}`);
//     numero++;
// });

// document.getElementById("anterior").addEventListener("click", () => {
//     history.back();
// });

// document.getElementById("siguiente").addEventListener("click", () => {
//     history.forward();
// });

// window.addEventListener("popstate", (evento) => { //popstate se lanza cada vez que se cambia el historial
//     console.log(history.state.titulo);  //history.state es la información que hemos añadido al historial
// });


//OBJETO LOCALSTORAGE (history, localStorage, sessionStorage y las cookies son los 4 tipos de almacenamiento)
//Esto habrá que usarlo en la tarea 5
/*
1.- Vida útil -> No tiene fecha de caducidad, hasta que no se borren los datos permanecen ahí
2.- Alcance -> Solo las webs del mismmo dominio pueden acceder a los datos
3.- Capacidad -> Depende del navegador y lo normal son 5MB
4.- Tipos de datos -> Se almacenan cadenas (String) si quiero almacenar un objeto tengo que convertirlo con JSON.stringify
5.- Disponibilidad -> Cualquier pestaña o navegador siempre que sea del mismo dominio
*/

localStorage.setItem("nombre", "Atanasio"); //se puede comprobar en aplication -> storage -> local storage
localStorage.setItem("edad", "25");
localStorage.setItem("profesion", "limpiaPiscinas");
console.log(localStorage.getItem("nombre")); //Ahora Atanasio se nos muestra por consola el tio buenagente
localStorage.removeItem("nombre"); //para eliminar el item
localStorage.clear(); //para eliminar todo
console.log(localStorage.length); //para saber cuantos elementos hay en el localStorage

//funciona solo cuando se modifica el almacenamiento en otra pestaña dle mmismo dominio (raro de cojones)
window.addEventListener("storage", (evento) => {
    console.log("esto en el evento");
    console.log(`Algo se ha introducido en el localStorage ${evento.key} ${evento.newValue}`);
});

//añadir un objeto al localStorage
const primoLucas = {
    nombre: "Lucas",
    edad: 13,
    profesion: "limpiador de Chotos"
}

localStorage.setItem("primoLucas", JSON.stringify(primoLucas));
console.log(primoLucas); //es un objeto


//SESSIONSTORAGE
/*
1.- Vida útil -> Hasta que se cierra la pestaña
2.- Alcance -> Solo las webs del mismmo dominio pueden acceder a los datos
3.- Capacidad -> Depende del navegador y lo normal son 5MB
4.- Tipos de datos -> Se almacenan cadenas (String) si quiero almacenar un objeto tengo que convertirlo con JSON.stringify
5.- Disponibilidad -> Solo la pestaña actual
*/
sessionStorage.setItem("nombre", "Antonomasia");
sessionStorage.setItem("edad", "49");
sessionStorage.setItem("profesion", "friegaTechos");
console.log(sessionStorage.getItem("nombre"));
console.log("La sessionStorage tiene " + sessionStorage.length + " elementos");


//COOKIES (pertenecen al DOM pero podemos acceder a ellas usando window)
/*
Son trocitos de datos que se me envian a mi navegador y se almacenan en el disco duro
HTTP es un protocolo sin estado, no guarda información de las peticiones anteriores
Hay dos tipos:
    - De origen -> origen (first-party) -> dominio actual (cookies de sesión)
    - De terceros -> terceros (third-party) -> dominio distinto (cookies de publicidad)

1.- Vida útil -> Se especifica la fecha de finalización
2.- Alcance -> Solo las webs del mismmo dominio pueden acceder a los datos
3.- Capacidad -> 4KB por cookie
4.- Tipos de datos -> Se almacenan cadenas (String) si quiero almacenar un objeto tengo que convertirlo con JSON.stringify
5.- Disponibilidad -> Solo la pestaña actual

PROPIEDADES
+ expires -> fecha en formato UTF: Thu, 6 Feb 2025 20:00:00 UTC -> esto por defecto es la sesión del navegador
+ max-age -> validez en segundos de la cookie
+ path -> es la ruta para la que es válida la cookie -> esto por defecto es el directorio en el que estamos
+ domain -> dominio para el que es válida la cookie
+ secure -> solo se manda la cookie si el protocolo es HTTPS -> por defecto es false
+ samesite -> controla las solicitudes entre sitios -> por defecto es LAX
    - strict -> solo se envía la cookie si la solicitud es del mismo sitio
    - lax -> se manda si viene del mismo dom Y DE DOMINIOS DISTINTOS CUANDO EL USUARIO pincha en un enclace. NO CUANDO SE HACE AUTOMÁTICO
    - none -> se envía la cookie en todas las solicitudes (secure tiene que estar habilitado)

Las cookies almacenan -> clave, valor, validez, path, domain, secure, samesite (pero yo solo tengo que poner clave y valor)
*/

//me creo una cookie por defecto (no me sale y no se porque)
document.cookie = "nombre=Somalia";
document.cookie = "nombre = Chistorra ; max-age = 3600 ;"