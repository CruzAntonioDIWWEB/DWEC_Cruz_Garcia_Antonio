import { Estudiante, ListaEstudiantes } from './clases.js';

const estudiantesLista = new ListaEstudiantes();
const form = document.getElementById("registro-form");
const listaEstudiantes = document.getElementById("estudiantes-list");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const edad = parseInt(document.getElementById("edad").value);
    const direccion = {
        calle: document.getElementById("calle").value,
        numero: parseInt(document.getElementById("numero").value),
        piso: document.getElementById("piso").value || "S/N",
    };
    
    const nuevoEstudiante = new Estudiante(nombre, edad, direccion);
    estudiantesLista.agregar(nuevoEstudiante);
    actualizarListaEstudiantes();
    form.reset();
});

function actualizarListaEstudiantes() {
    listaEstudiantes.innerHTML = "";
    estudiantesLista.listaCompleta().forEach(est => {
        const li = document.createElement("li");
        li.textContent = `${est.nombre} - ID: ${est.id}`;
        listaEstudiantes.appendChild(li);
    });
}
