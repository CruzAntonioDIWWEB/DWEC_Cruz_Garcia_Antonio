//6/2/2025
/*

ciclo de eventos -> como se ejecutan las tareas en js

1.- sincronía
    - tareas secuenciales que hasta que no termina una no comienza la otra
    - pila de ejecución -> se almacenan las instrucciones síncronas 

LIMBO -cola de micro tareas -> 

2.- asincronía
    - cola de tareas -> se almacenan las instrucciones asíncronas
    - eventos 
MECANISMOS
    - funciones globales: setTimeout, setInterval, fetch, XMLHttpRequest, etc.
    - callback (funciones de retorno joder)
    - promesas (async/await)


/////////////////////PROMESAS/////////////////////

Una promesa es un objeto que representa el estado de una operación asíncrona.
    - pendiente (pending)
    - cumplida (fulfilled)
    - rechazada (rejected)

    METODOS
        - promise.then() -> se ejecuta si la promesa se cumple
        - promise.catch() -> se ejecuta si la promesa es rechazada
        - promise.finally() -> se ejecuta siempre
        - promise.all() -> espero a todas las promesas y devuelvo si todas resuelven
        - promise.any() -> espero a todas las promesas y devuelvo solo la primera que se resuelve
        - promise.race() -> 
        - promise.allSettled()
    
    promesa.then(
    codigo que lee los datos
    ).catch( codigo de error )

vamos a usar la API fetch
    + request -> solicitud HTTP
    + response -> respuesta HTTP (respuesta del servidor)
        - status -> 200, 203, 403, 404
        - ok
        - headers
        - url
        - type
        - json()
        - blob (imagen, pdf)
        - text
    + headers -> cabeceras de la solicitud
    + fetch( url ) -> hace la solicitud
    + formData()

COMO SE TRABAJA CON ESTO
    - solicitud HTTP (fetch(url)) -> return Promise
    - usar metodos para interactuar con la promesa
        - .then si se resuelve
        - .catch si se rechaza
    - la promesa devuelve un objeto response, el siguiente paso es comprobar ese objeto response
        - si ok, trato los datos
        - si no, lanzo un error

*/

//frase de chuck norris
document.querySelector('button').addEventListener('click', () => {

fetch("https://api.chucknorris.io/jokes/random")
    .then(response => {
        console.log(response);
        if(response.ok){    //si la respuesta es correcta
            return response.json();
        }else{
            throw new Error("No se pudo cargar el script");
        }
    })
    .then(datos => {
        const parrafo = document.createElement('p');
        parrafo.innerText = datos.value;
        document.body.append(parrafo);
    })
    .catch(error => {
        console.error(error);
    });
});


////// quiero descargar estas 3 imagenes y mostrarlas 
const imagen1 = "https://placehold.co/400";
const imagen2 = "https://placehold.co/400";
const imagen3 = "https://placehold.co/400";

let promesa1 = cargarImagen(imagen1);
let promesa2 = cargarImagen(imagen2);
let promesa3 = cargarImagen(imagen3);

function cargarImagen(url){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Error al cargar la imágen"));
    });
}

Promise.all([promesa1, promesa2, promesa3])
    .then(imagenes => {
        imagenes.forEach(element => {
            document.body.append(element);
        });
    })
    .catch(error => {
        console.log(error)
    });

    
/*
SINTAXIS NUEVA 
desaparecen then y catch
ES8 -> await / async
    - await -> espera a que la promesa se resuelva
    - async -> antepone la función para que se resuelva y devuelve una promesa
*/

//Ejemplo
async function conexion(){
    let respuesta = await fetch("https://api.chucknorris.io/jokes/random");
    if(respuesta.ok){
        let datos = await respuesta.json();
        console.log(datos.nombre, datos.apellido);
    }else{
        throw new Error("No se pudo cargar el script");
    }
}

//frase de chuck norris con asycn/await
//esto es una funcion bastatne común
document.querySelector('#boton').addEventListener('click', async () => {
        let respuesta = await fetch("https://api.chucknorris.io/jokes/random"); //se cambia esto
        if (respuesta.ok) {
            let datos = await respuesta.json();
            const parrafo = document.createElement('p');
            parrafo.innerText = datos.value;  //y esto alomejor
            document.body.append(parrafo);
        } else {
            throw new Error("No se pudo cargar el script");
        }
});

//un ejemlo con otra API
document.querySelector('#boton2').addEventListener('click', async () => {
    const apiKey = '1rS1eF82YClpLWDNDBuaWg==GvtFdCy9vpKIVi2z'; //mi api key que se genera automaticamente en API ninjas
    let respuesta = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET", //nos lo indican las instrucciones de la API
        headers: {
            'X-Api-Key': apiKey
        }
    }); //se cambia esto
    if (respuesta.ok) {
        let datos = await respuesta.json();
        const parrafo = document.createElement('p');
        parrafo.innerText = datos[0].quote;  //y esto alomejor
        document.body.append(parrafo);
    } else {
        throw new Error("No se pudo cargar el script");
    }
});

//esto funciona cunado le de 3 veces al boton, no se por qué
async function cargarGatitos() {
    const imagen1 = `https://cataas.com/cat${Math.random()}`; //aqui en la url se pueden poner expresiones regulares
    const imagen2 = `https://cataas.com/cat${Math.random()}`;
    const imagen3 = "https://cataas.com/cat";

    try {
        const img1 = await cargarImagen(imagen1);
        const img2 = await cargarImagen(imagen2);
        const img3 = await cargarImagen(imagen3);

        document.getElementById('boton3').addEventListener('click', async () => {
            document.body.append(img1, img2, img3);
        });
    } catch (error) {
        console.error(error);
    }
}

function cargarImagen(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Error al cargar la imágen"));
    });
}

document.getElementById('boton3').addEventListener('click', cargarGatitos);

/*
TRABAJADORES WEB
Hilo de ejecución
====================

SE EJECUTAN EN EL HILO PRINCIPAL
hilo principal -> se ejecuta por defecto todo el código JS y el renderizado del DOM
código sincrono -> pila de ejecución
código asíncrono -> cola de microtareas -> (más prioridad) NO SE PUEDE INTERRUMPIR
código asíncrono -> cola de tareas -> llamadas asíncronas -> eventos (menos prioridad) SE PUEDE INTERRUMPIR

los trabajadores web mandan código síncrono a un hilo secundario


//MÉTODOS DE TRABAJADORES WEB (en el github está mejor ordenado)
trabajador.postMessage("mensaje") //enviar mensajes al trabajador (hilo principal)
self.postMessage("mensaje") //mensaje del trabajador al hilo principal



const traba = new Worker();
traba.terminate();

//EVENTOS

-message
    trabajador.addEventListener('message', (e) => {
        console.log("He recibido " + e.mensaje);
    })

-messageerror
    trabajador.onerror = () => {
        console.log("Error en el trabajador");
    }
*/