//formulario de búsqueda de asignaturas 
function construirBusqueda(contenedor) {
    //titulo de la sección
    let titulo = document.createElement("h2");
    titulo.innerText = "Buscar Asignaturas del Alumno";
    contenedor.appendChild(titulo);

    //creación del formulario
    let form = document.createElement("form");
    form.setAttribute("id", "form_busqueda");

    //creación del input de búsqueda
    let busquedaAlumno = document.createElement("input");
    busquedaAlumno.setAttribute("type", "text");
    busquedaAlumno.setAttribute("placeholder", "Introduzca la ID del alumno");
    busquedaAlumno.setAttribute("id", "busqueda_alumno");
    form.appendChild(busquedaAlumno);

    //creación del botón de búsqueda
    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Buscar");
    form.appendChild(submit);

    contenedor.appendChild(form);
    realizarBusqueda();
}

//función para realizar la búsqueda del alumno en el localStorage por la ID
function realizarBusqueda() {
    let form = document.getElementById("form_busqueda");
    //evento de submit del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        //se obtiene el valor del input de búsqueda
        let busqueda = document.getElementById("busqueda_alumno").value;
        let estudiantesMatriculados = JSON.parse(localStorage.getItem("estudiantesMatriculados"));
        
        //se busca el estudiante en el localStorage
        let estudiante = estudiantesMatriculados.find(estudiante => {
            let objetoEstudiante = JSON.parse(estudiante);
            return objetoEstudiante.id === busqueda;
        });

        //si no se encuentra el estudiante, se muestra un alert
        if (estudiante === undefined) {
            alert("No se encontró el estudiante");
        } else {
            mostrarAsignaturas(JSON.parse(estudiante));
        }
        
    });
}

//función para mostrar las asignaturas del estudiante, calificarlas y desmatricularlas
function mostrarAsignaturas(estudiante) {
    let contenedor = document.getElementById("contenedor_calificar");
    contenedor.innerHTML = "";

    //titulo con la información del estudiante
    let titulo = document.createElement("h2");
    titulo.innerText = "Asignaturas del alumno " + estudiante.id + " " + estudiante.nombre;
    contenedor.appendChild(titulo);
    
    console.log(estudiante);

    //creación de la tabla de asignaturas
    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla_asignaturas");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerText = "Nombre de la asignatura";
    let th2 = document.createElement("th");
    th2.innerText = "Calificar Asignatura";
    let th3 = document.createElement("th");
    th3.innerText = "Desmatricular";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    tabla.appendChild(thead);

    let tbody = document.createElement("tbody");

    //se recorren las asignaturas del estudiante y se muestran en la tabla
    estudiante.asignaturas.forEach(asignatura => {
        let tr = document.createElement("tr");

        //muestra el nombre de la asignatura
        let td1 = document.createElement("td");
        td1.innerText = asignatura;

        //input para calificar la asignatura
        let td2 = document.createElement("td");
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "0");
        input.setAttribute("max", "10");
        input.setAttribute("id", asignatura);
        td2.appendChild(input);

        //botón para desmatricular la asignatura
        let td3 = document.createElement("td");
        let botonDesmatricular = document.createElement("button");
        botonDesmatricular.innerText = "Desmatricular";
        botonDesmatricular.setAttribute("id", asignatura);
        
        //agregar evento al botón de desmatricular
        botonDesmatricular.addEventListener("click", function() {

            //se elimina la asignatura de la lista de asignaturas del estudiante
            estudiante.asignaturas = estudiante.asignaturas.filter(a => a !== asignatura);
            
            //actualizo los cambios
            actualizarLocalStorage(estudiante);
            
            //se vuelven a mostrar las asignaturas
            mostrarAsignaturas(estudiante);
        });
        
        td3.appendChild(botonDesmatricular);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
    
    //botón para calificar las asignaturas
    let botonCalificar = document.createElement("button");
    botonCalificar.innerText = "Calificar";
    botonCalificar.setAttribute("id", "calificar");
    contenedor.appendChild(botonCalificar);

    //botón para realizar una nueva busqueda de estudiante
    let bontonBuscar = document.createElement("button");
    bontonBuscar.innerText = "Buscar otro alumno";
    bontonBuscar.addEventListener("click", function() {
        let contenedor = document.getElementById("contenedor_calificar");
        contenedor.innerHTML = "";
        construirBusqueda(contenedor);
    });

    contenedor.appendChild(bontonBuscar);
    calificarAsignaturas(estudiante);
}

//función para actualizar el localStorage con los cambios realizados en las asignaturas del estudiante
function actualizarLocalStorage(estudiante) {
    let estudiantesMatriculados = JSON.parse(localStorage.getItem("estudiantesMatriculados")) || [];

    //se actualiza la lista de estudiantes matriculados
    let nuevosEstudiantesMatriculados = estudiantesMatriculados.map(est => {
        let estObj = JSON.parse(est);
        if (estObj.id === estudiante.id) {
            return JSON.stringify(estudiante); 
        }
        return est; 
    });
    localStorage.setItem("estudiantesMatriculados", JSON.stringify(nuevosEstudiantesMatriculados));
}

//califica las asignaturas del estudiante y guarda las calificaciones en el localStorage
function calificarAsignaturas(estudiante) {
    let boton = document.getElementById("calificar");
    boton.addEventListener("click", function() {
        let tabla = document.getElementById("tabla_asignaturas");
        let filas = tabla.querySelectorAll("tbody tr");
        let calificaciones = {};
        
        //guarda las calificaciones en un objeto
        filas.forEach(fila => {
            let asignatura = fila.querySelector("td").innerText;
            let calificacion = fila.querySelector("input").value;
            calificaciones[asignatura] = calificacion;
        });
        
        console.log(calificaciones);
    
        estudiante.calificaciones = calificaciones;
        actualizarLocalStorage(estudiante);

        //mensaje de éxito
        if(calificaciones !== undefined) {
            alert("Calificaciones guardadas con éxito");
        }
    });
}

//inicializa la interfaz de búsqueda de asignaturas
let contenedor = document.getElementById("contenedor_calificar");
construirBusqueda(contenedor);