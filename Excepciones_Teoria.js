/*
07/1/2025

UNIDAD 4
=======================

Hay dos tipos de errores: 
    - predecibles
    - impredecibles

Formas de manejar errores:
    -if
    -try - catch

con if:
    - Con errores predecibles
    - elijo si quiero interrumpir el flujo o no

con try - catch:
    - Con errores impredecibles
    - quiero que la ejecución del codigo se interrumpa para tratar el error

*/

//ejemplo con if
function dividir(num1, num2) {
    if (num2 != 0) {
        let resultado = num1 / num2;
        return resultado;
    } else {
        console.log("No se puede dividir por 0");
    }
}


//ejemplo con try - catch
try {
    functionQueNoExiste();
} catch (error) {
    console.log(error.num, error.message, error.stack);
} finally {
    console.log("Esto se ejecuta siempre");
}

//otro ejemplo
function procesarJSON(datos) {
    try {
        let obj = JSON.parse(datos);
    } catch (error) {
        console.log("Error en el JSON");
    }
}

procesarJSON('{"nombre": "Procopio"}');


//RELANZAR ERRORES
//revisar los distintos tipos de excepciones en esta funcion
function conectarServidor() {
    try {
        const servidorEncendido = false;
        if (!servidorEncendido) {
            throw new Error("servidor apagado");
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

function iniciarConexion() {
    try {
        conectarServidor();
    } catch (error) {
        console.log(`estoy en iniciarConexion: ${error.message}`);
    }
}

iniciarConexion();


//DONDE GESTIONAR LOS ERRORES CON TRY-CATCH (impredecibles)
/*
    1.- Dentro de cada función donde se produce el error
    2.- A la funcion uno le añado el codigo donde se llama al codigo que puede producir el error [la recomendada]
    3.- Solo en el codigo que llama a el codigo donde se pueden producir errores (para codigo muy relacionado entre sí) (quitar todos los try-catch menos el de procesarDatos)
    4.- Meter gran parte del codigo en un try-catch grandisimo
*/

function obtenerPropiedad(objeto, propiedad) {
    try { //1
        return objeto.propiedad;
    } catch (error) {
        console.log(error.message);
        throw error; //2
    }
}

function procesarNombre(nombre) {
    try { //1
        return nombre.length;
    } catch (error) {
        console.log(error.message);
        throw error; //2
    }
}

function procesarDatos(datos) {
    try { //2
        let usuario = obtenerPropiedad(objeto, nombre);
        let nombre = procesarDatos(usuario);
    } catch (error) {
        console.log(error.message);
    }
}

let usuario = { nombre: "Ximpnestreto" };
procesarDatos(usuario);


//LANZAR ERRORES PERSONALIZADOS
//JS normalmente detecta un error y lo lanza
//throw no solamente lanza errores, pero como todo lo que lance se borra, no es recomendarlo usarlo fuera de los errores

/**TIPOS
 * 
 *      -syntaxError --> error de sintaxis
 *      -ReferenceError --> error de referencia
 *      -typeError --> let a=z let b=2 console.log(a*b);
 * 
 */

//error extándar
function dividir(num1, num2) {
    if (num2 === 0) {
        throw new Error("No se puede dividir por 0");
    } else {
        return num1 / num2;
    }
}

//error sintáxico
function procesar (datos){
    try{
        let usuario = JSON.parse(datos);
        if(!usuario.direccion)
            throw new SyntaxError("La dirección no existe");
    }catch(error){
        console.log("Error");
    }
}

//
function manejarErrores(){
    console.log(error.message);

    try{
        functionQueNoExiste();
    }catch(error){
        throw new manejarErrores(error);
    }
}

////
class validarError extends Error{
    constructor(mensaje){
        super(mensaje);
        this.name = "validarError";
    }

}

function validarUsuario (usuario){
    if(!usuario){
        throw new validarError("El usuario no existe");
    }
    return `Bienvenido ${usuario.nombre}`;
}

//debugging
//DEPURACIÓN DE CODIGO

/**
 * La forma más basica de depurar es usando un console.log() e ir mirando valores
 */

function suma (a,b){
    return a+b;
}

function factorial (n){
    if(n = 0) return 1;
    return n*factorial (n-1); 
}

console.log("estoy sumando", suma(5,4));
console.log(factorial(4));
