/**
 * VENTAJAS DE ORGANIZAR EL CÓDIGO EN MODULOS
 * 
 * utilizacion de codigo
 * organización
 * encapsulación
 * puedo cargar los modulos conforme los necesite
 * vamos a usar aplicaciones llamadas bundlers (empaquetadores) que gestionan bien los módulos
 * 
 */
/*
    CRITERIOS PARA DIVIDIR EN MÓDULOS

    - principio de responsabilidad individual --> cada módulo debe de tener un trabajo bien definido [un módulo se dedica a hacer una cosa]
    - cohesión alta
    - acoplamiento débil --> los módulos deben ser los más independientes entre ellos posibles. así si hago un cambio en un módulo no afectan a los demás
    - reusabilidad 
    - si hay interacción con una API de otras partes 
    - adaptación a la lógica de negocio --> producto, proveedores, consumidor
    - tamaño y complejidad --> se trata de mantener el módulo en un tamaño ni demasiado grande ni demasiado pequeño


    HAY DOS FORMAS DE HACERLO
        - Common JS (antigua) --> node.js y en algunos empaquetadores (bundlres)
        - ES6 (moderna) --> (no dicce nada)

*/

//esta es la forma nueva usando export en las funciones que quiero exportar y usando import
import {sumar, restar} from './funciones1.js';
console.log(sumar(1,2));

//puedo hacerlo de esta manera
import {sumar as adicion, restar as sustraccion} from './funciones1.js';
console.log(adicion(1,2), sustraccion(1,2));

//y de esta otra también
import * as operaciones from './funciones1.js';
console.log(operaciones.sumar(1,2), operaciones.restar(1,2));

//importa solo una vez
import unaCosa from './funciones1.js';

//importo una constante
console.log(operaciones.sumar(1,2), operaciones.restar(1,PI));

//mas ejemplos de importación
import * as operaciones2 from './funciones2.js';
console.log(operaciones2.pot(2,3));
console.log(operaciones2.mod(1,2));

console.log(sumar(2,3), restar(3,4), PI, pot(2,3));

