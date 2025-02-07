/*
30/01/2025

OBJETO WINDOW
es el objeto global del que derivan todos

Propiedades / Métodos*/
console.log("Alturas y anchuras " + window.innerHeight, window.innerWidth, window.outerHeight, window.outerWidth);

//metodos
window.setTimeout(() => {
    console.log("SALGO A LOS DOS SEGUNDOS")
}, 2000);

//cada 3 segundo muestra 
window.setInterval(() => {
    console.log("YO SALGO CADA 3");
}, 3000);


let contador = 0;
let incremento = 1000;
let intervalo = window.setInterval(() => {
    num++;
    console.log(`han pasado ${num} segundos`);
}, 1000)
//Quiero que lo de arriba se pare a los 10 segundos
window.setTimeout(() => {
    clearInterval(intervalo)
}, 5000);

window.confirm("Aceptas?") //es como un alert
let valor = window.prompt("dame un jodido valor");

//window.open("https://github.com/avianarios/codigo_DWEC/blob/main/unidad%205/3.-form-validation/leeme.md");   abre una nueva ventanaÇ

let URL = "https://www.ilovepdf.com/es/word_a_pdf";
let destino = "blank";
let carac = "heigh=400, width=500 resizable";
let ventana = window.open(URL, destino, carac);        //otra manera de abrir una ventana

//cambia a las dimensiones que le aportemos
ventana.resizeTo(1000, 800);

//añadir al tamaño original lo que yo le ponga
ventana.resizeBy(200, 200);

//movemos la ventana emergente a las coordenadas
ventana.moveTo(900,500);

//Objeto screen (no tiene métodos solo tiene propiedades)
console.log(
    screen.width,
    screen.height,
    screen.availWidth,
    screen.availHeight,
    screen.colorDepth,
    screen.orientation,
    screen.somalia
)