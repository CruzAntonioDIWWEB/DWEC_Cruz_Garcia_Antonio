// ================================
// PRUEBAS DE FUNCIONAMIENTO
// ================================

export function pruebas() {
    console.log("=== INICIO DE PRUEBAS ===");

    //1. Prueba: Creación de un estudiante válido
    const direccion = {
        calle: "Calle Soplete",
        numero: 25,
        piso: "2",
        codigoPostal: "18003",
        provincia: "Granada",
        localidad: "Granada",
    };
    const estudiante = new Estudiante("Antonio Cruz", 21, direccion);
    console.log("Prueba 1: Creación de estudiante válida - OK");

    //2. Prueba: Matricular al estudiante en una asignatura
    estudiante.matricular("Lengua");
    console.log("Prueba 2: Matrícula en asignatura -", estudiante.asignaturas.includes("Lengua") ? "OK" : "FALLO");

    //3. Prueba: Calificar al estudiante en la asignatura
    estudiante.calificar("Lengua", 9);
    console.log("Prueba 3: Calificación en asignatura -", estudiante.obtenerMedia() === "9.00" ? "OK" : "FALLO");

    //4. Prueba: Crear y manejar una asignatura
    const asignatura = new Asignaturas("Historia");
    asignatura.agregarCalificacion(8);
    console.log("Prueba 4: Agregar calificación -", asignatura.mediaAsignatura() === "8.00" ? "OK" : "FALLO");

    //5. Prueba: Generar un reporte simple de estudiantes
    const listaEstudiantes = new ListaEstudiantes();
    estudiantesLista.agregar(estudiante);
    console.log("Prueba 5: Generar reporte de estudiantes:");
    generarReporte();

    console.log("=== FIN DE PRUEBAS ===");

    // Cierra readline para finalizar la ejecución del programa
    rl.close();
}