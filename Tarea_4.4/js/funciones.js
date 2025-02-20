//Imports necesarios para la ejecución de las funciones
import readline from 'readline';/**Módulo para manejar entrada/salida en la consola */
import { numeroOpcion } from './script_modularidad.js';
import { Estudiante, Asignaturas, Lista, ListaAsignaturas, ListaEstudiantes } from './clases.js'; 

//Exports
 const estudiantesLista = new ListaEstudiantes(); /**Lista global de estudiantes */
 const asignaturasLista = new ListaAsignaturas(); /**Lista global de asignaturas */

/**
 * Configuración de la interfaz de readline para entrada y salida estándar
 * (rl) será utilizado para leer las respuestas del usuario
 */
export const rl = readline.createInterface({
    input: process.stdin, /**Especifica que la entrada proviene del teclado */
    output: process.stdout, /**Define que la salida se redirige a la terminal */
});

/**
 * Toma un mensaje como parámetro, lo muestra en la terminal y luego espera una respuesta del usuario
 * @param {string} mensaje --- Mensaje que se mostrará al usuario
 * @returns {Promise} Respuesta del usuario
 */
function preguntar(mensaje) {
    return new Promise((resolve) => rl.question(mensaje, resolve));
}

/**
 * Muestra el menú principal en la consola y permite al usuario seleccionar una opción
 * Dependiendo de la opción seleccionada, se ejecutará la función correspondiente
 */
export async function mostrarMenuPrincipal() {
    console.log(`
=== SISTEMA DE GESTIÓN ACADÉMICA ===
1. Agregar Estudiante
2. Eliminar Estudiante
3. Matricular Estudiante
4. Desmatricular Estudiante
5. Calificar Estudiante
6. Buscar Asignatura
7. Lista Completa de Estudiantes
8. Calcular Promedio General
9. Asignaturas de Cada Estudiante
0. Salir
    `);

    /** Lee la opción seleccionada por el usuario y la procesa */
    const opcion = await preguntar("Seleccione una opción: ");
    numeroOpcion(parseInt(opcion));
}

// ================================
// FUNCIONES AUXILIARES
// ================================

/**
 * Solicita al usuario los datos de un nuevo estudiante y lo agrega a la lista global
 */
export async function agregarEstudiante() {
    const nombre = await preguntar("Ingrese el nombre del estudiante: ");
    const edad = parseInt(await preguntar("Ingrese la edad del estudiante: "));
    const direccion = {
        calle: await preguntar("Ingrese la calle: "),
        numero: parseInt(await preguntar("Ingrese el número: ")),
        piso: (await preguntar("Ingrese el piso: ")) || "S/N",
        codigoPostal: await preguntar("Ingrese el código postal: "),
        provincia: await preguntar("Ingrese la provincia: "),
        localidad: await preguntar("Ingrese la localidad: "),
    };

    try {
        if (isNaN(edad) && edad <= 0) {
            throw new Error("La edad no puede ser menor que 0");
        }
        if (!direccion.calle || !direccion.numero || !direccion.piso || !direccion.codigoPostal || !direccion.provincia || !direccion.localidad) {
            throw new Error("La dirección debe completarse en su totalidad")
        }
        if (!nombre) {
            throw new Error("El nombre es necesario");
        }
        const estudiante = new Estudiante(nombre, edad, direccion);
        estudiantesLista.agregar(estudiante);
        console.log(`Estudiante agregado exitosamente con ID: ${estudiante.id}`);
    } catch (error) {
        console.error("Ha ocurrido un error a la hora de agregar un estudiante:  " + error.message);
    }
}

/**
 * Solicita al usuario el ID de un estudiante y lo elimina de la lista global
 */
export async function eliminarEstudiante() {
    const id = await preguntar("Ingrese el ID del estudiante a eliminar: ");
    const estudiante = estudiantesLista.listaCompleta().find(estd => estd.id === id);

    try {
        if (!estudiante) {
            throw new Error("No se ha encontrado el estudiante");
        }
        estudiantesLista.eliminar(estudiante);
        console.log(`Estudiante con ID ${id} eliminado correctamente.`);
    } catch (error) {
        console.error("Error al eliminar estudiante: " + error.message);
    }
}

/**
 * Permite matricular a un estudiante en una asignatura
 */
export async function matricularEstudiante() {
    const id = await preguntar("Ingrese el ID del estudiante: ");
    const asignatura = await preguntar("Ingrese el nombre de la asignatura: ");
    const estudiante = estudiantesLista.listaCompleta().find(est => est.id === id);

    try {
        if (!estudiante) {
            throw new Error("No se ha encontrado al estudiante");
        }

        estudiante.matricular(asignatura);

        if (!asignaturasLista.listaCompleta().some(asig => asig.nombre === asignatura)) {
            asignaturasLista.agregar(new Asignaturas(asignatura));
        }
        console.log(`Estudiante matriculado en ${asignatura}.`);
    } catch (error) {
        console.error("Error al matricular estudiante:", error.message);
    }
}

/**
 * Permite al usuario desmatricular a un estudiante de una asignatura
 */
export async function desmatricularEstudiante() {
    const id = await preguntar("Ingrese el ID del estudiante: ");
    const asignatura = await preguntar("Ingrese el nombre de la asignatura: ");
    const estudiante = estudiantesLista.listaCompleta().find(est => est.id === id);

    if (!estudiante) {
        throw new Error("No se ha encontrado al estudiante");
    }
    try {
        estudiante.desmatricular(asignatura);
        console.log(`Estudiante desmatriculado de ${asignatura}.`);
    } catch (error) {
        console.error("Error al desmatricular estudiante:", error.message);
    }
}


/**
 * Permite al usuario calificar a un estudiante en una asignatura
 */
export async function calificarEstudiante() {
    const id = await preguntar("Ingrese el ID del estudiante: ");
    const asignatura = await preguntar("Ingrese el nombre de la asignatura: ");
    const calificacion = parseFloat(await preguntar("Ingrese la calificación (0-10): "));
    const estudiante = estudiantesLista.listaCompleta().find(est => est.id === id);

    try {
        if (!estudiante) {
            throw new Error("No se ha podido encontrar un estudiante");
        }
        if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar comprendida entre 0-10.")
        }

        estudiante.calificar(asignatura, calificacion);
        console.log(`Calificación registrada para ${estudiante.nombre} en ${asignatura}: ${calificacion}`);
    } catch (error) {
        console.error("Error al calificar estudiante:", error.message);
    }

}

/**
 * Permite al usuario buscar asignaturas por nombre
 */
export async function buscarAsignatura() {
    const patron = await preguntar("Ingrese el patrón de búsqueda: ");
    const resultados = asignaturasLista.buscarPorNombre(patron);
    try {
        if (resultados.length > 0) {
            console.log("Asignaturas encontradas:");
            resultados.forEach(asig => console.log(`- ${asig.nombre}`));
        } else {
            console.log("No se encontraron asignaturas con ese patrón.");
        }
    } catch (error) {
        console.log("Error al buscar la asignatura:", error.message);
    }
}

/**
 * Genera un reporte detallado de los estudiantes
 */
export function generarReporte() {
    try {
        console.log("Reporte de Estudiantes:");
        estudiantesLista.generarReporte();
    } catch (error) {
        console.log("Error al generar el reporte: ", error.message);
    }
}

/**
 * Muestra la lista completa de estudiantes
 */
export function listaCompletaEstudiantes() {
    const estudiantes = estudiantesLista.listaCompleta();

    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados.");
        return;
    }

    console.log("Lista Completa de Estudiantes:");
    estudiantes.forEach(estd => {
        try {
            console.log("================================");
            console.log(`Nombre: ${estd.nombre}`);
            console.log(`ID: ${estd.id}`);
            console.log(`Edad: ${estd.edad}`);
            console.log("Dirección:");
            const direccion = estd.direccion;
            console.log(`  - Calle: ${direccion.calle}`);
            console.log(`  - Número: ${direccion.numero}`);
            console.log(`  - Piso: ${direccion.piso || "S/N"}`);
            console.log(`  - Código Postal: ${direccion.codigoPostal}`);
            console.log(`  - Provincia: ${direccion.provincia}`);
            console.log(`  - Localidad: ${direccion.localidad}`);

            console.log("Asignaturas matriculadas:");
            if (estd.asignaturas.length > 0) {
                estd.asignaturas.forEach(materia => console.log(`  - ${materia}`));
            } else {
                console.log("Ninguna asignatura matriculada.");
            }

            console.log("Registro de matrícula:");
            const registro = estd.obtenerRegistro();
            if (registro.length > 0) {
                registro.forEach(elemento => console.log(`  - ${elemento}`));
            } else {
                console.log("No hay actividades registradas.");
            }

            console.log("Calificaciones:");
            const asignaturas = estd.asignaturas;
            if (asignaturas.length > 0) {
                asignaturas.forEach(asig => {
                    const calificaciones = estd.calificaciones[asig] || [];
                    console.log(`  - ${asig}: ${calificaciones.length > 0 ? calificaciones.join(", ") : "Sin calificaciones"}`);
                });
            } else {
                console.log("No hay calificaciones registradas.");
            }

            console.log("================================");
        } catch (error) {
            console.error("Error al procesar datos del estudiante:", error.message);
        }
    });
}


/**
 * Calcula y muestra el promedio general de los estudiantes
 */
export function promedioGeneral() {
    try {
        console.log("Promedio General de los estudiantes:", estudiantesLista.promedioGeneral());
    } catch (error) {
        console.log("No se ha podido calcular el promedio general:", error.message);
    }
}

/**
 * Muestra las asignaturas de cada estudiante
 */
export function asignaturasEstudiantes() {
    const estudiantes = estudiantesLista.listaCompleta();

    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados.");
        return;
    }

    estudiantes.forEach(est => {
        try {
            console.log(`Estudiante: ${est.nombre} (${est.id})`);
            console.log("Asignaturas:", est.asignaturas.join(", ") || "Ninguna asignatura matriculada.");
        } catch (error) {
            console.log("No han podido mostrar las asignaturas del estudiante: ", error.message);
        }
    });
}