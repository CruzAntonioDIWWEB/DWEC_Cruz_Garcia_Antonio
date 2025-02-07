//HILO SECUNDARIO
//trabajador web que hace una tarea pesada
//lo primero que hacemos es escuchar los eventos (mensajes)

//cuando se recibe un mensaje se ejecuta el código
self.onmessage = (evento) => {
    if(evento.data =="A trabajar tio asqueroso"){
        let resultado = 0;
    for(let i=0; i<1e4; i++){
        resultado += i;
        console.log(`el resultado va por el ${resultado}`);
    }
}else{
        console.log("Muriendo...");
        self.close();
    }
}