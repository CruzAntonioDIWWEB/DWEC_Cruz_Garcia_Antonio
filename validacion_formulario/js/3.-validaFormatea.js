/*
validacion: MIXTA (JS/HMTL)
mensajes de error: MIXTO (JS/HTML)
momento de validacion: input y submit
estilos: JS
*/
//ESTO ESTÁ ALGO CONFUSO ---COMPRUEBA EL GITHUB
function compararValor(campoModificado){
    let claves = document.querySelectorAll("[type = password]");

    //Si el campo modificado es "password" solo validamos el campo de confirmacion

    if(claves[0].value != claves[1].value){
        console.log("no son iguales");
        if(campoModificado.id == "password" && claves[1].value!=""){
            claves[1].setCustomValidity("las claves no coinciden carapan");
        }else{
            claves[0].setCustomValidity("las claves no coinciden caramierda");
        }
        //estilos
        claves[1].classList.add('no-valido');
        claves[1].classList.remove('valido');
    }else{
        claves[1].setCustomValidity(""); //si todo va bien el mensaje se tiene que dejar en blanco
        claves[0].setCustomValidity(""); //si todo va bien el mensaje se tiene que dejar en blanco
        claves[1].classList.add('valido');
        claves[1].classList.remove('no-valido');
    }

    if(campoModificado.id ){

    }
    claves[1].reportValidity();
}

//30/01/2025
//funcion para aplicar estilos
function estilarCampo(campo){
    if(!campo.validity.valid){
        campo.classList.add('no-valido');
        campo.classList.remove('no-valido');
    }else{
        campo.classList.add('valido');
        campo.classList.remove('no-valido');
    }
}

//OBjetivo es que las dos contraseñas del formulario sean iguales
let formulario = document.querySelector("form");

formulario.addEventListener("input", evento => {
    if(evento.target.id == "password" || evento.target.id == "confirm-password"){ //el campo en el ocurre es en "password" o en "confirm-password"
        compararValor(evento.target); //LLamamos con el campo que se está modificando
    }else{
        estilarCampo(evento.target);
    }
});

