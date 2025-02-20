
/** Clase Estudiante: Representa a un estudiante con atributos y métodos asociados */
export class Estudiante {

    /** Atributos privados */
    #id;             // ID único del estudiante
    #nombre;         // Nombre del estudiante
    #direccion;      // Dirección del estudiante
    #edad;           // Edad del estudiante
    #asignaturas;    // Lista de asignaturas matriculadas
    #registro;       // Historial de matrículas y desmatrículas
    #calificaciones; // Objeto que almacena las calificaciones por asignatura

    /** Atributo estático para controlar las IDs ocupadas */
    static #numerosOcupados = [];

    /**
     * Constructor para inicializar un estudiante
     * @param {string} nombre - Nombre del estudiante
     * @param {number} edad - Edad del estudiante
     * @param {object} direccion - Objeto con información de la dirección
     */
    constructor(nombre, edad, direccion) {
        /** Generación de una ID única para el estudiante */
        let numeroId = 1;
        while (Estudiante.#numerosOcupados.includes(numeroId)) {
            numeroId++;
        }
        Estudiante.#numerosOcupados.push(numeroId);
        this.#id = "C" + numeroId;

        /** Asignación de valores con validaciones */
        this.#nombre = this.#validarNombre(nombre);
        this.#edad = this.#validarEdad(edad);
        this.#direccion = { ...direccion }; // Clonación de dirección para evitar referencias directas

        /** Inicialización de listas y objetos */
        this.#registro = [];
        this.#asignaturas = [];
        this.#calificaciones = {};
    }

    /** Getters para acceder a los atributos privados */
    get id() { return this.#id; }

    get nombre() { return this.#nombre; }

    get edad() { return this.#edad; }

    get direccion() { return { ...this.#direccion }; }

    get asignaturas() { return [...this.#asignaturas]; }

    get calificaciones() { return { ...this.#calificaciones }; }

    /** Métodos privados para validaciones */
    #validarNombre(nombre) {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$/.test(nombre)) {
            return nombre;
        } else {
            throw new Error("El nombre debe contener solo letras y espacios.");
        }
    }

    #validarEdad(edad) {
        if (/^\d{1,2}$/.test(edad) && Number(edad) > 0) {
            return Number(edad);
        } else {
            throw new Error("La edad debe ser un número válido mayor que cero.");
        }
    }

    /**
     * Matricula al estudiante en una asignatura
     * @param {string} asignatura - Nombre de la asignatura
     */
    matricular(asignatura) {
        if (!this.#asignaturas.includes(asignatura)) {
            this.#asignaturas.push(asignatura);
            this.#registro.push({ asignatura, tipo: "Matriculación", fecha: new Date() });
        }
    }

    /**
     * Desmatricula al estudiante de una asignatura
     * @param {string} asignatura - Nombre de la asignatura
     */
    desmatricular(asignatura) {
        const index = this.#asignaturas.indexOf(asignatura);
        if (index > -1) {
            this.#asignaturas.splice(index, 1);
            this.#registro.push({ asignatura, tipo: "Desmatriculación", fecha: new Date() });
        }
    }

    /**
     * Califica al estudiante en una asignatura
     * @param {string} asignatura - Nombre de la asignatura
     * @param {number} calificacion - Nota entre 0 y 10
     */
    calificar(asignatura, calificacion) {
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        if (this.#asignaturas.includes(asignatura)) {
            if (!this.#calificaciones[asignatura]) {
                this.#calificaciones[asignatura] = [];
            }
            this.#calificaciones[asignatura].push(calificacion);
        } else {
            throw new Error(`El estudiante no está matriculado en la asignatura ${asignatura}.`);
        }
    }

    /**
     * Calcula la media de las calificaciones del estudiante
     * @returns {string|number} Media de calificaciones o "Sin evaluar"
     */
    obtenerMedia() {
        const calificaciones = Object.values(this.#calificaciones).flat();
        if (calificaciones.length === 0) {
            return "Sin evaluar";
        }
        const suma = calificaciones.reduce((acc, val) => acc + val, 0);
        return (suma / calificaciones.length).toFixed(2);
    }

    /**
     * Devuelve el historial de actividades del estudiante
     * @returns {string[]} Lista de registros
     */
    obtenerRegistro() {
        return this.#registro.map(reg => {
            const fecha = reg.fecha.toLocaleDateString("es-ES");
            const hora = reg.fecha.toLocaleTimeString("es-ES");
            return `${reg.tipo} de ${reg.asignatura} el ${fecha} a las ${hora}`;
        });
    }

    /**
     * Representación textual del estudiante
     * @returns {string} Información del estudiante
     */
    toString() {
        return `${this.#nombre} (${this.#id}) tiene ${this.#edad} años.`;
    }
}

/** Clase Asignaturas: Representa una asignatura y gestiona sus calificaciones */
export class Asignaturas {

    /** Atributos privados */
    #nombre;          /** Nombre de la asignatura */
    #calificaciones;  /** Lista de calificaciones asignadas */

    /**
     * Constructor para inicializar una asignatura
     * @param {string} nombre - Nombre de la asignatura
     */
    constructor(nombre) {
        this.#nombre = this.#validarNombre(nombre);
        this.#calificaciones = []; /** Lista inicial de calificaciones */
    }

    /** Getter para obtener el nombre de la asignatura */
    get nombre() { return this.#nombre; }

    /**
     * Valida que el nombre solo contenga letras y números romanos
     * @param {string} nombre - Nombre a validar
     * @returns {string} Nombre validado
     * @throws {Error} Si el nombre no cumple con el formato válido
     */
    #validarNombre(nombre) {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\sIVXLCDM]+$/.test(nombre)) {
            return nombre;
        } else {
            throw new Error("El nombre de la asignatura debe contener solo letras y números romanos.");
        }
    }

    /**
     * Calcula el promedio de las calificaciones asignadas
     * @returns {string|number} Media de calificaciones o mensaje si no hay calificaciones
     */
    mediaAsignatura() {
        if (this.#calificaciones.length === 0) {
            return "No se ha calificado al estudiante";
        } else {
            const suma = this.#calificaciones.reduce((sum, cal) => sum + cal, 0);
            return (suma / this.#calificaciones.length).toFixed(2);
        }
    }

    /**
     * Agrega una nueva calificación a la asignatura
     * @param {number} calificacion - Nota entre 0 y 10
     * @throws {Error} Si la calificación no está en el rango permitido
     */
    agregarCalificacion(calificacion) {
        if (calificacion >= 0 && calificacion <= 10) {
            this.#calificaciones.push(calificacion);
        } else {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
    }

    /**
     * Elimina una calificación existente en la asignatura
     * @param {number} calificacion - Calificación a eliminar
     * @throws {Error} Si la calificación no está registrada
     */
    eliminarCalificaciones(calificacion) {
        const index = this.#calificaciones.indexOf(calificacion);
        if (index !== -1) {
            this.#calificaciones.splice(index, 1);
        } else {
            throw new Error("Esa calificación no se encuentra registrada.");
        }
    }
}

/** Clase Lista: Clase base para gestionar listas genéricas */
export class Lista {

    #elementos; /** Lista de elementos almacenados */

    /**
     * Constructor para inicializar la lista
     */
    constructor() {
        this.#elementos = [];
    }

    /**
     * Agrega un nuevo elemento a la lista si no existe
     * @param {object} elemento - Elemento a agregar
     * @returns {boolean} Verdadero si el elemento fue agregado
     * @throws {Error} Si el elemento ya existe en la lista
     */
    agregar(elemento) {
        if (!this.#elementos.includes(elemento)) {
            this.#elementos.push(elemento);
            return true;
        } else {
            throw new Error("El elemento ya existe en la lista.");
        }
    }

    /**
     * Elimina un elemento existente de la lista
     * @param {object} elemento - Elemento a eliminar
     * @returns {boolean} Verdadero si el elemento fue eliminado
     * @throws {Error} Si el elemento no existe en la lista
     */
    eliminar(elemento) {
        const index = this.#elementos.indexOf(elemento);
        if (index !== -1) {
            this.#elementos.splice(index, 1);
            return true;
        } else {
            throw new Error("El elemento no existe en la lista.");
        }
    }

    /**
     * Busca elementos cuyo nombre coincida parcialmente con un patrón
     * @param {string} patron - Patrón de búsqueda
     * @returns {Array} Elementos que coinciden con el patrón
     */
    buscarPorNombre(patron) {
        return this.#elementos.filter(elem =>
            elem.nombre.toLowerCase().includes(patron.toLowerCase())
        );
    }

    /**
     * Devuelve una copia completa de la lista de elementos
     * @returns {Array} Copia de la lista de elementos
     */
    listaCompleta() {
        return [...this.#elementos];
    }
}

/* Clase ListaEstudiantes: Especialización de Lista para manejar estudiantes */
export class ListaEstudiantes extends Lista {

    /**
     * Calcula el promedio general de todos los estudiantes
     * @returns {string|number} Promedio general o mensaje si no hay promedios
     */
    promedioGeneral() {
        const estudiantes = this.listaCompleta();
        const promedios = estudiantes.map(est =>
            parseFloat(est.obtenerMedia())
        ).filter(prom => !isNaN(prom));

        if (promedios.length === 0) {
            return "Sin evaluar";
        } else {
            const suma = promedios.reduce((sum, prom) => sum + prom, 0);
            return (suma / promedios.length).toFixed(2);
        }
    }

    /**
     * Genera un reporte detallado de los estudiantes
     */
    generarReporte() {
        const estudiantes = this.listaCompleta();

        estudiantes.forEach(est => {
            console.log(`Estudiante: ${est.nombre} (${est.id})`);
            console.log(`Promedio General: ${est.obtenerMedia()}`);
            console.log("Asignaturas:");
            est.asignaturas.forEach(asig => console.log(`   - ${asig}`));
        });
    }
}

/** Clase ListaAsignaturas: Especialización de Lista para manejar asignaturas */
export class ListaAsignaturas extends Lista {

    /**
     * Calcula el promedio de una asignatura específica
     * @param {string} nombreAsignatura --- Nombre de la asignatura
     * @returns {string|number} --- Promedio de la asignatura o mensaje si no existe
     * @throws {Error} --- Si la asignatura no se encuentra
     */
    calculoPromedioPorAsignatura(nombreAsignatura) {
        const asignatura = this.buscarPorNombre(nombreAsignatura)[0];
        if (!asignatura) {
            throw new Error("Asignatura no encontrada.");
        } else {
            return asignatura.mediaAsignatura();
        }
    }
}