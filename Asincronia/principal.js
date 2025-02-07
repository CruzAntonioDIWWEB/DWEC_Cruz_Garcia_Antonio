//HILO PRINCIPAL
const trabajador = new Worker('worker.js');
trabajador.postMessage('A trabajar tio asqueroso');
trabajador.postMessage('Ya no te necesito mas');
//escuchamos los mensajes del trabajador
trabajador.addEventListener('message', () => {
    console.log(evento.data);
});
