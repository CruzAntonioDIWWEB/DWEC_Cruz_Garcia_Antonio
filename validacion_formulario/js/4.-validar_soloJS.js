/* 30/01/2025
VALIDACION: Exclusivamente JS. usando 'novalidate' -> no se aplica pero se evalúa la validación nativa -> 
podemos seguir usando pseudoclases y la propiedad validity
MENSAJES DE ERROR: JS -> insertando nodos en el DOM
MOMENTO DE VALIDACION: al enviar el formulario (submit)
ESTILOS: nativo -> para que se vea que la validacion nativa sigue funcionando (aunque se use novalidate)

https://github.com/avianarios/codigo_DWEC/blob/main/unidad%205/3.-form-validation/leeme.md

*/

document.querySelector("form").addEventListener("submit", (evento) => {
    evento.preventDefault(); //como tengo que hacer la comprobacion yo, primero evito que funcione hasta que compruebe que todo está bien

    const campos = document.querySelectorAll("input"); //lista de 
    let formValido = true;

    campos.forEach(campo => {
        let campoError = document.getElementById(`error${campo.name}`); //selecciono el parrafo donde mostraré el error, pero tengo que seleccionar el campo con el que estoy trabajando
        let error = "";
        
        //a comprobar las validaciones de un campo concreto
        if (!campo.validity.valid) { //este valid te dice si es valido o no pero no te dice el porque
            if (campo.validity.valueMissing) {
                error = `El campo ${campo.name} es obligatorio`; //este texto se mostrará en el <p> bajo el nombre
            } else if (campo.validity.tooShort) {
                error = `el campo ${campo.name} es demasiado corto`;
            } else if (campo.validity.patternMismatch) {
                error = `el campo ${campo.name} no cumple con el patron`;
            } else if (campo.validity.rangeOverflow) {
                error = `el campo ${campo.name} se ha pasado del rango`
            } else if (campo.validity.rangeUnderflow) {
                error = `el campo ${campo.name} se ha quedador corto del rango`
            } else if (campo.id == "password" && campo.value != document.getElementById("confirm-password").value) {
                error = "las contraseñas no coinciden";
            }
        }

        //cuando todo esté bien
        if (error) {
            campoError.textContent = error;
            campoError.classList.remove("oculto");
            formValido = false;
        }else{
            error = "";
        }
    });
    //Se envía despues de comprobarlo todo
    if (formValido) {
        evento.target.submit();
    }

})