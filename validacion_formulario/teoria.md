validacion de formularios en el cliente

No es recomendable validar solo en el cliente, porque los usuarios que entienden js pueden saltarsela. (primera capa de seguridad)

Hay varios parámetros en cuanto a la validación:
    - Metodo -> nativa (HTML), JavaScript, mixto

    - Cuando se valida??
        + nativa -> al enviar el formulario (en el codigo html poner validaciones)
        + si es JS o mixto -> cuando yo quiera (eventos de input, cuando el usuario interactua con algo) 'input' 'focusout' 'submit'

    - Estilo de los campos son validos y no validos: nativa o JS

    - Mensajes de error: nativos o personalizados
        + nativos -> DEBE HACER REGLAS DE VALIDACION ACTIVAS. Se mandan los mensajes al ENVIAR EL FORMULARIO, no mientras se rellenan los campos
        + JS ->     
            ++ Modificando el DOM
            ++ Aprovechar los mensajes nativos
                +++ campo.setCustomValidity("mensaje") -> establecer un mensaje de error para un campo, se manda cuando se envía el formulario o si se le pone la etiqueta de abajo, instantáneamente.
                +++ campo.reportValidity() -> manda el mensaje inmediatamente


VALIDACION CON JS
    - reglas -> las que yo quiera
    - cuando?? -> cuando quiera (nativo = enviar)

Mixta
