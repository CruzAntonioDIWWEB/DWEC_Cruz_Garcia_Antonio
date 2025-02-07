import { relative } from "path";

//otra manera de exportar cosas PERO NO SE VA A UTILIZAR EN CLASE
function producto(a,b){
    return a*b;
}

function potencia(a,b){
    return Math.pow(a,b);
}

function modulo(a,b){
    return a%b;
}

const numero = 3;


export {
    producto as mult,
    potencia as pot,
    modulo as mod,
    numero
}