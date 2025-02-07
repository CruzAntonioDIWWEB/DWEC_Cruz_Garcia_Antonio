//3/12/2024
//OTRO DIA MÁS EN EL ""MARAVILLOSO"" MUNDO DE LOS OBJETOS EN JAVASCRIPT

//DATE
/**Como referenciamos el tiempo: 
 *      -UTC (universal coordinated time) --> el que usa JS
 *      -GMT (Greenwich mean time)
 * 
 * ¿Cómo lo almacena? --> Javascript almacena el tiempo en milisegundos desde 1/1/1970 UTC   [NO ALMACENA EN HORA LOCAL SI NO SE LO PEDIMOS]
 * 
 * ¿Cómo representa el tiempo?:
 *      -representación de texto: corto(short), largo(long), extendido (extended) --> la forma de indicar la fecha
 *      -time representation: UTC o local time --> la forma en la que se puede representar
*/

//formas de creación [LOS MESES EMPIEZAN EN 0 A ENUMERARSE SI NO ESTÁN EN UNA CADENA DE TEXTO]
const ahora = new Date();
const fecha1 = new Date(0); //1/1/1970 0:0:0

const skynetTomaConciencia = new Date(2024, 7, 29, 2, 14, 0, 0); //terminator 2 --> 29/8/24 2:14:0  los ultimos dos 0 son los milisegundos y agosto es 7 no 8 porque los meses se empiezan a contar desde 0
const finGuerraCivil = new Date(1939, 3, 1); //1/4/1939
const caidaMuroBerlin = new Date("1989-11-9"); //9/11/1989 en este caso el 11 si referencia a noviembre
const españaCampeona = new Date.UTC(2010,6,11,20,30); //11/7/2010 20:30

//MOSTRAR EL TIEMPO
console.log(skynetTomaConciencia); //no se recomienda para nada
//los siguiente muestra la fecha en ISO 8601 format
console.log(skynetTomaConciencia.toISOString());
//muestra la fecha en formato RFC 7321 / HTTP
console.log(finGuerraCivil.toUTCString());
//milisegundos que han pasado desde el 1970
console.log(skynetTomaConciencia.getTime());

//mostrar el tiempo de manera local
console.log(skynetTomaConciencia.toString()); //Thu Aug 29 2024 02:14:00 GMT+0200 (hora de verano de Europa central)
console.log(`${skynetTomaConciencia}`); //dan los dos lo mismo
//Hazle caso a estas
console.log(skynetTomaConciencia.toLocaleString()); //ESPAÑOL DE ESPAÑA 29/8/2024, 2:14:00
console.log(skynetTomaConciencia.toDateString()); //Thu Aug 29 2024
console.log(skynetTomaConciencia.toLocaleDateString('es-ES')); //29/8/2024
console.log(skynetTomaConciencia.toLocaleTimeString('es-ES')); //2:14:00

//PARA DAR UN BUEN FORMATO A UNA FECHA
const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};
console.log(skynetTomaConciencia.toLocaleTimeString('es-ES', opciones));

//si hay que aplicarle el mismo formato a muchas fechas esta opción es óptima, dándole uso al objeto Intl
//Intl
const formatoFecha = new Intl.DateTimeFormat('es-ES', opciones); 
console.log(formatoFecha.format(skynetTomaConciencia));

//getting information
console.log(skynetTomaConciencia.getFullYear());
console.log(skynetTomaConciencia.getMonth());
console.log(skynetTomaConciencia.getDay());
console.log(skynetTomaConciencia.getHours());
console.log(skynetTomaConciencia.getMinutes());
console.log(skynetTomaConciencia.getSeconds());
console.log(skynetTomaConciencia.getTime());
console.log(skynetTomaConciencia.getDate());

//deifinir una fecha
skynetTomaConciencia.setFullYear(2078); //le cambio la fecha porque me da la gana que pasa
skynetTomaConciencia.setMonth(skynetTomaConciencia.getMonth() - 3); //le cambio el mes porque me da la gana que passssa
skynetTomaConciencia.setDate(-10); //le está quitando 10 días al mes anterior (10 dias antes de que acabe el mes anterior)
console.log(formatoFecha.format(skynetTomaConciencia));

//comparar fechas
//saquenme de aqui puta madreeee
console.log(skynetTomaConciencia < finGuerraCivil);
console.log(skynetTomaConciencia.getDate() < finGuerraCivil.getDate());
console.log(skynetTomaConciencia > finGuerraCivil);
console.log(skynetTomaConciencia == finGuerraCivil); //ESTO NUNCA FUNCIONARÁ
console.log(skynetTomaConciencia.getDate() == finGuerraCivil.getDate()); //esto creo que sí

//================================
//JSON
//================================
//primero
//Tiene dos metodos, uno que convierte de objeto a cadena y otro vicebersa
const persona = {
    nombre: 'antonio manuel de la huerta',
    edad: 89,
    direccion: {
        calle: "somat oro gel 14",
        numero: 3
    }
};
console.log(typeof persona);
const cadena = JSON.stringify(persona);
console.log(cadena, typeof cadena);

//segundo
//replacer function (evita que se pasen distintos parametros a texto)
const texto = JSON.stringify(persona, (nombreCampo, valor) => { //esto tiene un funcion sin nombre
    if(nombreCampo == "direccion"){
        return undefined;
    }else{
        return valor;
    }
});

console.log(texto);

const texto2 = JSON.stringify(persona, ["nombre", "edad"]);
console.log(texto2);

//tercero
//espaciador
const texto3 = JSON.stringify(persona, null, "\t"); //null se puede cambiar por , ["nombre"] / "\t" se puede cambiar por cualquier numero
console.log(texto3);


//parse
//convertir de string a objeto
console.log(JSON.parse(texto2)); //AHORA ESTO ES UN OBJETO
console.log(typeof texto2);

//
console.log(JSON.parse(texto2, (clave, valor) => {
    if(clave =="edad" && (valor > 20)){
        return undefined;
    }else{
        return valor;
    }
})); 
