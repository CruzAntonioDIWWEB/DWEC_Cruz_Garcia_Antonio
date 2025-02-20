//funcion para crear la lista de alumnos en la interfaz
function crearListaAlumnos() {
    let contenedor = document.getElementById("contenedor_listaAlumnos");
    let listaAlumnos = JSON.parse(localStorage.getItem("estudiantesMatriculados"));

    //título de la lista
    let titulo = document.createElement("h2");
    titulo.innerText = "Lista de Alumnos";
    contenedor.appendChild(titulo);

    //tabla principal
    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla_alumnos");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    //columnas de la tabla principal
    let th1 = document.createElement("th");
    th1.innerText = "ID";
    let th2 = document.createElement("th");
    th2.innerText = "Nombre";
    let th3 = document.createElement("th");
    th3.innerText = "Edad";
    let th4 = document.createElement("th");
    th4.innerText = "Dirección";
    let th5 = document.createElement("th");
    th5.innerText = "Calificaciones";
    let th6 = document.createElement("th");
    th6.innerText = "Eliminar";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    thead.appendChild(tr);
    tabla.appendChild(thead);

    let tbody = document.createElement("tbody");

    //se recorre la lista de alumnos y se muestran en la tabla
    listaAlumnos.forEach(alumno => {
        let alumnoObjeto = JSON.parse(alumno);
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerText = alumnoObjeto.id;
        let td2 = document.createElement("td");
        td2.innerText = alumnoObjeto.nombre;
        let td3 = document.createElement("td");
        td3.innerText = alumnoObjeto.edad;
        let td4 = document.createElement("td");
        td4.innerText = `${alumnoObjeto.direccion.calle}, ${alumnoObjeto.direccion.numero}, ${alumnoObjeto.direccion.ciudad}, ${alumnoObjeto.direccion.codigoPostal}`;

        let td5 = document.createElement("td");
        let subtabla = document.createElement("table");
        subtabla.setAttribute("border", "1");

        //se recorren las calificaciones del alumno y se muestran en la tabla
        for (let asignatura in alumnoObjeto.calificaciones) {
            let subtr = document.createElement("tr");
            let subtd1 = document.createElement("td");
            subtd1.innerText = asignatura;
            let subtd2 = document.createElement("td");
            subtd2.innerText = alumnoObjeto.calificaciones[asignatura] || "N/A"; //si no hay nota, se muestra un mensaje
            subtr.appendChild(subtd1);
            subtr.appendChild(subtd2);
            subtabla.appendChild(subtr);
        }

        let td6 = document.createElement("td");
        let botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarAlumno(alumnoObjeto.id));

        td5.appendChild(subtabla);
        td6.appendChild(botonEliminar);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);

    //botón para calcular el promedio de las calificaciones
    let botonCalcularPromedio = document.createElement("button");
    botonCalcularPromedio.innerText = "Calcular Promedio";
    botonCalcularPromedio.addEventListener("click", calcularPromedio);
    contenedor.appendChild(botonCalcularPromedio);
}

//función para eliminar un alumno de la lista
function eliminarAlumno(id) {
    let listaAlumnos = JSON.parse(localStorage.getItem("estudiantesMatriculados"));
    let nuevosEstudiantes = listaAlumnos.filter(alumno => {
        let alumnoObjeto = JSON.parse(alumno);
        return alumnoObjeto.id !== id;
    });

    localStorage.setItem("estudiantesMatriculados", JSON.stringify(nuevosEstudiantes));
    let contenedor = document.getElementById("contenedor_listaAlumnos");
    contenedor.innerHTML = "";
    crearListaAlumnos();
    
}

//función para calcular el promedio de las calificaciones
function calcularPromedio() {
    let listaAlumnos = JSON.parse(localStorage.getItem("estudiantesMatriculados"));
    let listaPromedios = [];
    let notaFinal = 0;
    listaAlumnos.forEach(alumno => {
        let objetoAlumno = JSON.parse(alumno);
        let promedio = 0;
        let contador = 0;
        for (let asignatura in objetoAlumno.calificaciones) {
            promedio += parseFloat(objetoAlumno.calificaciones[asignatura]);
            contador++;
        }
        promedio /= contador;
        listaPromedios.push(promedio);
    });

    listaPromedios.forEach(promedio => {
        notaFinal += promedio;
    });
    let subtitle = document.createElement("h3");
    subtitle.innerText = `El promedio total de las calificaciones es: ${notaFinal/listaPromedios.length}`;
    let contenedor = document.getElementById("contenedor_listaAlumnos");
    contenedor.appendChild(subtitle);
}

//se ejecuta la función para crear la lista de alumnos
crearListaAlumnos();