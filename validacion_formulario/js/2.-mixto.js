/*
validacion: nativa
mensajes: js
momento de validacion: input y submit
estilos: nativos
**/

const validarCampo = campo => {
    campo.setCustomValidity(""); //Esto sobreescribe los mensajes de error nativos
    //si le doy un valor, el validador considera al campo no valido, eso lo omitimos con el .setCustomValidity

    //aqui comprobamos y ponemos un mensaje personalizado
    if(campo.name == "nombre"){
        if(campo.required){ 
            campo.setCustomValidity("Este campo es obligatorio y no puede estar en blanco"); //Con esto se sobreescribe el mensaje nativo por el nuestro
        }
    }

    // if(campo.name == 'tlf'){
    //     if(campo.pattern){
    //         campo.setCustomValidity("Tiene que tener el siguiente formato XXX XXX XXX y si no lo pones así eres bobo")
    //     }
    // }

    if(!campo.name.validity.valid){ //comprueba que el campo es valido segun las reglas de validación nativas (definidas en el html)
        campo.setCustomValidity("Este campo es obligatorio y no puede estar en blanco, lila");
    }
    campo.reportValidity(); //Muestra inmediatamente el mensaje personalizado, no se espera a que se envie el formulario
}

const formulario = document.getElementsByTagName("form")[0];
const campos = document.querySelectorAll("input");

//EEventlistener de un campo concreto
campos.forEach(campo => {
    campo.addEventListener('input', () => {validarCampo(campo)}); //la validación se hará cada vez que se introduzca un valor en el formulario
});

//Otra forma de hacer el eventListener sobre el formulario completo
// formulario.addEventListener('input', elemento => {
//     if(elemento.target.tagName == 'input'){
//         validarCampo(elemento.target);
//     }
// })

//Eventlistener del formulario completo
formulario.addEventListener('submit', function(evento){
    campos.forEach(campo => validarCampo(campo));
    //Aqui voy a validar cada campo
    //formulario.checkValidity(); //devuelve true si todo es valido según las reglas nativas
    if(!formulario.checkValidity()){
        evento.preventDefault();
        alert("hay un campo mal, revisalo capullo");
    }else{
        formulario.submit(); //Mando el formulario si todo está bien
        alert("formulario enviado crack")
    }
})