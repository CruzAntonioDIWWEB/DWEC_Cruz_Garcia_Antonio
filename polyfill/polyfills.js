
/**POLYFILLS
 * Son trozos de codigo que traducen/expresan código nuevo en función del antiguo, así los navegadores con motores antiguos pueden funcionar con eso
 * NO MODIFICA LA SINTAXIS
 * Implementa funcionalidad que no existía en navegadores antiguos
 * Por ejemplo array.include no existía en navegadores antiguos, pues polyfill usando lo que había en su tiempo, trata de usar la misma funcion de array.include pero no modifica la sintaxis antigua, usa lo que ya tenía
 * 
 * Opcion 1: escribir yo mis propios polyfills (QUE NO SE HACE)
*/
if (!Array.prototype.includes){
    //el navegador no soporta el método includes y hay que hacer un polyfill
    Array.prototype.includes=function(elemento){
        //codigo que simula el comportamiento de Array.includes()
        for(let i=0; i<2; i++){
            this[i] == element;
            return true;
        }
    }
}
/**
 * Opción 2: usar bibliotecas externas: corejs, regenerator-runtime
 *      + node.js -> junto con empaquetadores (bundlers) webpack babel (parcel) [+1 en la nota final si hacemos algo con parcel]
 *      - CDN -> (Content Delivery Networks) se introducen en la ruta bibliotecas externas
 *
 * Opción 3: usar servicios web polyfill.io
 *      
*/

//Transpilación
/**
 * Traducción sintáctica, traduce los pequeños cambios de sintaxis para que los puedan entender los navegadores antiguos
 * NO AÑADE FUNCIONALIDAD
 * ej:
 * const suma = (a,b) => a+b                 Esto no lo reconocen navegadores antiguos
 * var suma = function(a,b){ return a+b; }   Pero esto si
 * 
*/

//Configurar babel
/**
 *  -babel.config.js o babel.config.json
 *  -.browserlistrc
 *  -información bajo un apartado browserslist en package.json
 *  -un fichero webpack.json
 */

/**Configurar webpack, tres ficheros (empaquetador)
 *   -webpack.common.js -> conf comunes a las dos versiones
 *   -webpack.antiguo.js -> conf para navegadores antiguos
 *   -webpack.moderno.js -> conf para navegadores modernos
 *   
*/
