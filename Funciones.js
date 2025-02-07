let mensaje1 = "mensaje1 fuera";
function muestra_mensaje(){
    let mensaje1 = "mensaje1 dentro"; //Esta variable solo existe en la función
    console.log(mensaje1);
    if(1){
        let mensaje1 = "mensaje dentro del if"; //Estos son los 3 niveles de anidamiento
        console.log(mensaje1);
    }
}
console.log(mensaje1);
muestra_mensaje();

//

let texto = "hola";
function saluda(saludo){
    console.log(saludo);
    saludo = "adios";
}

saluda(texto);
console.log(texto);

//

function tratamiento(){
    return "señor";
}



function saludar(momento, aux=tratamiento()){
    switch (momento){
    case "tarde":
        console.log("buenas tardes " + aux);
        break;
    case "mañana":
        console.log("buenos dias " + aux);
        break;
    }
}

function tratamiento(){
    return "señor";
}

saludar("mañana");

//

let nombre = "Pitingos"
let acceso = "operario"
let nombre2 = "Mariano"
let acceso2 = "fontanero"
function comprueba_acceso(usuario){ //Comprobar el acceso de nombre
    if(usuario == nombre){
        imprime_mensaje("acceso");
    }else{
        imprime_mensaje("acceso2");
    }
}

function imprime_mensaje(nivel){
    if(nivel == "acceso"){
        console.log("El usuario tiene acceso de " + acceso);
    }else{
        console.log("El usuario tiene acceso de " + acceso2);
    }
}

comprueba_acceso("Mariano");

//

let edad = 17;
function mayoria_edad(edad = 15){ //edad = 15 es la edad por defecto
    if(edad <17){
        return false;
    }else{
        return true;
    }
}

mayoria_edad(20);


//Se pueden asignar funciones con o sin nombre a variables 
let saluda= function(){
    return ("hola");
}
//Dos maneras de llamar a la misma función
let hola = saluda;
hola();
saluda();

//

let operacion_suma = function(a,b){
    return(a+b);
}

operacion_suma(4+5);
let suma1=operacion_suma(3,3);
let suma2=operacion_suma(4,4);
console.log(suma1, suma2);


//
//Una funcion puede llamarse a si misma siempre que tenga nombre
function saludacion(quien){
    if(quien){
        console.log (`hola ${quien}`); //estas comillas son raras
//       console.log ("hola" + quien); //Es lo mismo que lo de arriba
    }else{
        saludacion("Invitado");
    }
}
saludacion();


//
saludame("Oblicuo");
function saludame(nombre){
    console.log ("hola" + nombre);
}
despedida("manolo")
let despedida = function (nombre){
    console.log("adios " + nombre);
}


//Esta funcion se puede llamar fuera del if
if(1){ //como siempre es true siempre realiza esto
    function saludame(nombre){
        console.log ("hola" + nombre);
    }
}else{
    function despidete(nombre){
        console.log ("adios " + nombre);
    }
}

saludame("Wachupino");
despidete("Wachinanga");

//Esta no, para que funcionase debo instanciar antes del if un let saluda;
if(1){
    let saluda = function(nombre){
        console.log ("hola" + nombre)
    }
}
saluda("warabanchin");


//ESTOS SON 3 TIPOS DE INSTANCIAR UNA FUNCIÓN
function sumar_con_Nombre(a,b){
    return (a+b);
}

let sumar_sin_nombre = function(a,b){
    return (a+b);
}

//arrow functions
let sumar_flecha = (a,b) => (a+b); //La flecha se pueda usar como RETURN
sumar_flecha(3,2);
//Una funcion que imprime la misma cadena
let despideme = () => console.log("adios");
despideme();


//Este no funciona, se arreglará
let edad_nueva;
let carcel = (edad_nueva >= 18) ? () => console.log ("Vas preso") : () => console.log("no vas preso");
carcel(19);


//Otros 3 timpos de declarar funciones
let resta = (a,b) =>{
    console.log ("restando");
return (a+b);
}

function resta (a,b){
    console.log ("restando");
    return (a+b);
}

let resta = function(a,b){
    console.log ("restando");
    return (a+b);
}
resta(5,2);

let resta2 = (a,b) => (a+b); //Aquí se usa la flecha como return
resta2(5,2);


let resta3 = (a,b) =>{
    let aux;
    (1) ? aux=(a-b) : aux=(b-a);
    return aux;
}


//Callback functions, esto te salta una ventanita que te pregunta 
function preguntar (pregunta, si, no){
    if(confirm(pregunta)){
        si();
    }else{
        no();
    }

    //confirm(pregunta) ? si() : no();  es lo mismo que lo de arriba
}

function afirmativo(){
    console.log("Aceptaste");
}

function negativo(){
    console.log("Cagaste");
}

preguntar("¿Aceptas las condiciones?", afirmativo, negativo);


//Calculadora
function calculadora(a,b,operacion){
    console.log(operacion(a,b));
}

let suma3 = (a,b) => (a+b);
let resta4 = (a,b) => (a-b);

calculadora(2,3, suma3); //El parametro suma se arriba se llama operación, es lo que se utiliza para sumar o restar