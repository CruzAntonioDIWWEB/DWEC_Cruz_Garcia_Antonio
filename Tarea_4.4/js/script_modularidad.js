/**
 * Proyecto de Sistema de Gestión Académica de Estudiantes y Asignaturas (SGAEA)
 * Antonio Cruz García
 * 2º DAW
 * 
 * NOTA: Este codigo ha sido probado por medio de la herramienta (Node.js)[https://nodejs.org/en] en una terminal cmd de windows
 * NOTA: el codigo ejecuta por defecto el menú de selección, si se desean mostrar las pruebas del código se debe comentar la línea 635 y descomentar la línea 684
 */

//Import de las clases
import { Estudiante, Asignaturas, Lista, ListaAsignaturas, ListaEstudiantes } from './clases.js'; 


// ================================
// PROGRAMA PRINCIPAL
// ================================

//Import de la la variable readline
import {rl} from './funciones.js'; /**Interfaz readline para leer las entradas por teclado*/

// ================================
// FUNCIONES AUXILIARES
// ================================

import {mostrarMenuPrincipal} from './funciones.js';

/**
 * Maneja la selección del usuario en el menú principal
 * @param {number} opcion --- Opción seleccionada por el usuario
 */
export async function numeroOpcion(opcion) {
    try {
        switch (opcion) {
            case 1:
                await agregarEstudiante();
                break;
            case 2:
                await eliminarEstudiante();
                break;
            case 3:
                await matricularEstudiante();
                break;
            case 4:
                await desmatricularEstudiante();
                break;
            case 5:
                await calificarEstudiante();
                break;
            case 6:
                await buscarAsignatura();
                break;
            case 7:
                listaCompletaEstudiantes();
                break;
            case 8:
                promedioGeneral();
                break;
            case 9:
                asignaturasEstudiantes();
                break;
            case 0:
                console.log("Saliendo del sistema...");
                rl.close(); /** Cierra la interfaz de readline */
                return;
            default:
                console.log("Opción no válida. Intente nuevamente.");
        }
    } catch (error) {
        console.error("Ha ocurrido un error: ", error.message);
    }
    mostrarMenuPrincipal(); /** Regresa al menú principal */
}


// ================================
// FUNCIONES PRINCIPALES
// ================================

//Import de las funciones
import {agregarEstudiante, eliminarEstudiante, matricularEstudiante, desmatricularEstudiante, calificarEstudiante, buscarAsignatura, 
        generarReporte, listaCompletaEstudiantes, promedioGeneral, asignaturasEstudiantes} from './funciones.js';


/** Muestra el manú con las opciones a elegir */
mostrarMenuPrincipal();



// ================================
// PRUEBAS DE FUNCIONAMIENTO
// ================================
//Import de las pruebas
import {pruebas} from './pruebas.js';

// Llama a las pruebas
//pruebas();

