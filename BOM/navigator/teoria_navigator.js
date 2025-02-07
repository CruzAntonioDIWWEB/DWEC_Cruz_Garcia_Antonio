//04/02/2025
//OBJETO NAVIGATOR
//Proporciona información sobre el navegador
//Propiedades
console.log(navigator.userAgent); //está casi obsoleto
console.log(navigator.userAgentData.brands); //Es el nuevo
console.log(navigator.userAgentData.platform);

console.log(navigator.language);
console.log(navigator.onLine);
console.log("Tiene las cookies habilitadas? " + navigator.cookieEnabled);

//PODEMOS OBTENER LA LOCALIZACIÓN
console.log(navigator.geolocation);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (posicion) => {
            console.log("latitud: " + posicion.coords.latitude); //conocemos la latitud 
            console.log("longitud: " + posicion.coords.longitude); //conocemos la longitud
        }, { enableHighAccuracy: true}
    );
} else {
    console.log("error, el navegador no soporta esto");
}

//ejemplos de mapas en el github del profe en el BOM 
