//solo he usado la clase Estudiante
import { Estudiante } from "./clases.js";

//función asíncrona para generar el formulario de matriculación
async function generarMatriculacion(contenedor, estudiante) {
    //limpio el contenedor de cualquier contenido previo
    contenedor.innerHTML = "";

    //titulo de la sección con la ID y nombre del estudiante
    contenedor.appendChild(document.createElement("h2")).innerText = "Matriculación del estudiante " + estudiante.id + " " + estudiante.nombre;
    
    //creación del formulario
    let form = document.createElement("form");
    form.setAttribute("id", "matriculacion-form");

    //obtengo las asignaturas del localStorage
    let asignaturasGuardadas = JSON.parse(localStorage.getItem("AsignaturasTroncales"));

    //si hay asignaturas guardadas, se crean los checkboxes
    if (asignaturasGuardadas && asignaturasGuardadas.length > 0) {
        asignaturasGuardadas.forEach(asignatura => {
            let div = document.createElement("div");

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "asignaturas");
            checkbox.setAttribute("value", asignatura.nombre);
            checkbox.setAttribute("id", asignatura.nombre);

            let label = document.createElement("label");
            label.setAttribute("for", asignatura.nombre);
            label.textContent = asignatura.nombre;

            div.appendChild(label);
            div.appendChild(checkbox);

            form.appendChild(div);
        });
    } else {
        //si no hay asignaturas guardadas, se muestra un mensaje
        let mensaje = document.createElement("p");
        mensaje.textContent = "No hay asignaturas disponibles";
        form.appendChild(mensaje);
    }

    //creación del botón de matriculación
    let submitbutton = document.createElement("input");
    submitbutton.setAttribute("type", "submit");
    submitbutton.setAttribute("value", "Matricular");
    form.appendChild(submitbutton);

    contenedor.appendChild(form);

    //espero a que se guarden las asignaturas seleccionadas
    await guardarAsignaturas(estudiante);
}

//función para guardar las asignaturas seleccionadas en el localStorage
function guardarAsignaturas(estudiante) {
    return new Promise((resolve) => {
        let form = document.getElementById("matriculacion-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            //obtengo los checkboxes seleccionados
            let checkboxes = form.querySelectorAll('input[name="asignaturas"]:checked');
            let asignaturasSeleccionadas = [];

            //y los guardo en un array
            checkboxes.forEach(checkbox => {
                asignaturasSeleccionadas.push(checkbox.value);
            });

            //para ahora guardar el array en el localStorage
            localStorage.setItem("matricula" + estudiante.id, JSON.stringify(asignaturasSeleccionadas));

            resolve();
        });
    });
}

//función para ejecutar la matriculación del estudiante
function ejecutarMatriculacion(estudiante) {
    //recupero las asignaturas del localStorage
    let asignaturas = JSON.parse(localStorage.getItem("matricula" + estudiante.id));
    if (asignaturas) {
        //si hay asignaturas, las matriculo
        asignaturas.forEach(asignatura => {
            estudiante.matricular(asignatura);
        });
    }

    //y guardo el estudiante en el localStorage con formato JSON
    let json = JSON.stringify(estudiante);
    estudiantesMatriculados.push(json);

    localStorage.setItem("estudiantesMatriculados", JSON.stringify(estudiantesMatriculados));


}

//función para generar el formulario original de registro de nuevos estudiantes
function FormularioOriginal(contenedor) {
    //limpio el contenedor de cualquier contenido previo
    contenedor.innerHTML = "";

    //creación del formulario
    const h2 = document.createElement("h2");
    h2.textContent = "Registro de Estudiantes";
    contenedor.appendChild(h2);

    const form = document.createElement("form");
    form.id = "registro-form";

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    inputNombre.required = true;
    inputNombre.placeholder = "Nombre";
    form.appendChild(inputNombre);

    const inputEdad = document.createElement("input");
    inputEdad.type = "number";
    inputEdad.id = "edad";
    inputEdad.min = 1;
    inputEdad.required = true;
    inputEdad.placeholder = "Edad";
    form.appendChild(inputEdad);

    const fieldset = document.createElement("fieldset");

    const legend = document.createElement("legend");
    legend.textContent = "Dirección";
    fieldset.appendChild(legend);

    const inputCalle = document.createElement("input");
    inputCalle.type = "text";
    inputCalle.id = "calle";
    inputCalle.required = true;
    inputCalle.placeholder = "Calle";
    fieldset.appendChild(inputCalle);

    const inputPiso = document.createElement("input");
    inputPiso.type = "text";
    inputPiso.id = "piso";
    inputPiso.placeholder = "Piso";
    fieldset.appendChild(inputPiso);

    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(document.createElement("br"));

    const inputCP = document.createElement("input");
    inputCP.type = "number";
    inputCP.id = "cp";
    inputCP.required = true;
    inputCP.placeholder = "Codigo Postal";
    fieldset.appendChild(inputCP);

    const inputCiudad = document.createElement("input");
    inputCiudad.type = "text";
    inputCiudad.id = "ciudad";
    inputCiudad.required = true;
    inputCiudad.placeholder = "Ciudad";
    fieldset.appendChild(inputCiudad);

    const inputLocalidad = document.createElement("input");
    inputLocalidad.type = "text";
    inputLocalidad.id = "localidad";
    inputLocalidad.required = true;
    inputLocalidad.placeholder = "localidad";
    fieldset.appendChild(inputLocalidad);

    form.appendChild(fieldset);

    const inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.value = "Registrar";
    form.appendChild(inputSubmit);

    contenedor.appendChild(form);

    logicaBase();
}

//función que maneja la lógica del formulario de registro
function logicaBase() {
    let form = document.getElementById("registro-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        let contenedor_formulario = document.getElementById("contenedor_formulario");
    
        let nombre = document.getElementById("nombre").value;
        let edad = parseInt(document.getElementById("edad").value);
        let direccion = {
            calle: document.getElementById("calle").value,
            numero: document.getElementById("piso").value,
            ciudad: document.getElementById("ciudad").value,
            localidad: document.getElementById("localidad").value,
            codigoPostal: document.getElementById("cp").value
        };
    
        let nuevoEstudiante = new Estudiante(nombre, edad, direccion);
    
        await generarMatriculacion(contenedor_formulario, nuevoEstudiante);
        ejecutarMatriculacion(nuevoEstudiante);
        FormularioOriginal(contenedor_formulario);
    });
}

//función para generar las asignaturas troncales en el localStorage
function seederAsignaturas() {
    

    let asignaturasTroncales = [
        { nombre: "Matematicas" },
        { nombre: "Lengua" },
        { nombre: "Ingles" },
        { nombre: "Fisica" },
        { nombre: "Quimica" },
        { nombre: "Historia" },
        { nombre: "Geografia" },
        { nombre: "Filosofia" },
        { nombre: "Educacion Fisica" },
        { nombre: "Tecnologia" },
        { nombre: "Musica" },
        { nombre: "Plastica" },
        { nombre: "Religion" }
    ];

    localStorage.setItem("AsignaturasTroncales", JSON.stringify(asignaturasTroncales));
}

//inicializo las variables y los formularios en la interfaz
let estudiantesMatriculados = new Array();
let contenedor_formulario = document.getElementById("contenedor_formulario");

seederAsignaturas();
FormularioOriginal(contenedor_formulario);