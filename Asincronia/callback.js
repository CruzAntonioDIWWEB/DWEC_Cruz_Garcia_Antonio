//función para cargar un script
function cargarScript(origen, callback){
    let script = document.createElement('script');
    script.src = origen;
    script.type = 'text/javascript';
    script.addEventListener('load', callback); //lo mismo se hace con //script.onload = callback;
    document.head.append(script);
};

//CARGAR JQUERY
document.querySelector('button').addEventListener('click', () => {
    cargarScript('https://code.jquery.com/jquery-3.7.1.min.js', () => {
        //todo esto es el callback
        console.log('jQuery cargado con ABSOLUTO EXITO');
        $('body').css('background-color', 'lightgreen');
    });
});