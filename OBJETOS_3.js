//TEORÍA OBJETOS 3 21/11/2024

//isNaN devuelve true si el valor es NaN (variable global objeto)
console.log(Number.isNaN(5));

//Conversion toString
let obj1 = new Number(5);
let obj2 = new Number(5.5);

console.log(obj1.toString(), 
    new Number(8).toString,
    new Number(null).toString());

//Autoboxing
console.log(Infinity.toString(), //console.log(String(Infinity)); tambien se puede poner así
    NaN.toString(),
    (5).toString(),
    undefined.toString()
);

//Convertir string a numeros
console.log(Number('hola'), Number('12.5'), Number(5), Number(true));

console.log(parseInt('250px'), parseInt('4rem'), parseInt(null), parseFloat('12.5'));

//OBJETO MATH
//Está orientado a hacer operaciones matemáticas con números
//Propiedades más importantes de MATH 
console.log(Math.PI, Math.E, Math.LN2, Math.LN10, Math.SQRT2, Math.LOG2E, Math.LOG10E);

const float1 = 2.371;
const float2 = 8.999;

//floor, ceil, round, trunc
console.log(Math.floor(float1)); //Siempre redondea hacia abajo
console.log(Math.ceil(float2)); //Siempre redondea hacia arriba
console.log(Math.round(float1), Math.round(float2)); //Redondea al número que esté más cerca
console.log(Math.trunc(float1), Math.trunc(float2));//trunc descarta la parte decimal

//Operaciones matemáticas básicas
const n1 = 5;
const n2 = -9;
console.log(Math.abs(n2)); //Convierte lo negativo en positivo
console.log(Math.abs(new Number(-4).valueOf()));

console.log(Math.sqrt(n1), Math.sqrt(new Number(5))); //raiz cuadrada

console.log(Math.pow(n1, new Number(2))) //Es la potencia (5 elevado a 2)

console.log(Math.min(4,1,6,8,3,6)); //Proporciona el mínimo de todos los numeros
let mat1 = [5,2,7,90,6];
let mat2 = [9,20,4,1,5];
Math.min(...mat1,...mat2); //con esto se coge la matriz y se vuelve numeros

console.log(Math.max(2,4,7,2,5));

//random
console.log(Math.random()*10); //entre 0 y 10 sin incluirlos
console.log((Math.random()*7)+3); //numeros aleatorios entre 3 y 10
let min = 3;
let max = 10;
console.log(Math.random()*(max-min)+min);
//(max-min) --> escalar el numero de numeros aleatorios pasando de 0-1 a de 0-7
//+min --> mueve el rango de 3 a 10

//TRIGONOMÉTRICAS
//sin, cos, tan, asin, acos, atan, hypot
console.log(Math.sin(Math.PI/4)); //seno de un ángulo de 45º
console.log(Math.cos(Math.PI)); //coseno de 180º
console.log(Math.tan(Math.PI/2));//tangente de 90º
console.log(Math.hypot(4,9));//tangente de dos catetos

//MÁS TEORIA DE OBJETOS WOOOOOOOOO
//22/11/2024

//Number
//Este objeto es inmutable
let objNum1 = new Number(5);
objNum1.valueOf = 4; //Aqui intento cambiarlo pero no se puede
console.log(objNum1.valueOf());

let objNum2 = objNum1;
objNum2 = new Number (objNum1.valueOf()+1);
console.log(objNUm2, typeof objNum2);

//EXPRESIONES REGULARES (se usa texto para buscar cosas)
//Tiene su propio objeto llamado RegExp

//expresion regular literal
const exp1 = /gato/;
//expresion regular como objeto
const exp2 = new RegExp("gato");

const palabra = prompt("Kebab con queso y salsa");
const exp3 = new RegExp(palabra);

//pruebas de expresiones regulares sensuales
const texto = "esto es un texto gato y tu eres un gato imbécil";
console.log(exp1.test(texto)); //esto devuelve true porque encuentra la expresión regular /gato/ en el texto
console.log(exp1.exec(texto)); //devuelve una matriz con los elementos que ha encontrado

//modificador --> i
const exp4 = /GATO/i;
console.log(exp4.test(texto)); //como estoy buscando el gato en mayusculas no lo encuentra, es gracias a la i que le dan igual las mayusculas
console.log(exp4.test(texto));

//modificador --> g  (gloabal search, te busca todo)
let exp5 = /GATO/g;
console.log(exp5.exec(texto));

//los modificadores se pueden combinar
let exp6 = /GATO/gi; //ahora busca un gato sin importar las mayusculas y todos los gatos
console.log(exp6.exec(texto)); //pero esto solo devuelve un gato porque exec solo devuelve todos los resultados con un bucle
console.log(exp6.lastIndex, exp6.exec(texto), exp6.lastIndex, exp6.exec(texto), exp6.lastIndex, exp6.exec(texto), exp6.lastIndex);

let resultado;
while(resultado(exp6.exec(texto))!==null){
    console.log(resultado[0]);
}
//Esto es otra mierda parecida a la de arriba (ni puta idea de lo que hace)
while((resultado = exp6.exec(texto))!== null){
    console.log(exp6.lastIndex, resultado[0]);
}

//modificador --> y (sticky)
//se parece al g pero es más estricto, con puntos y comas se para
let cadena = "gato gato.gato";
const expG = /gato/gi;
const expY = /gato/y; //sticky

let resultado2;
while((resultado2 = expG.exec(cadena))!== null){
    console.log(expG.lastIndex, resultado2[0]);
}

let resultado3;
while((resultado3 = expY.exec(cadena)) !== null){
    console.log(expY.lastIndex, resultado[0])
}

//modificador --> m (multiline) si tenemos un texto dividido en lineas hay que usarla
texto = `hola
somat
oro
gel`;

const expSinM = /^mundo/; //el ^ significa comienzo, necesario cuando se va a usar la m
console.log(expSinM.test(cadena)); //false
const expConM = /^mundo/;
console.log(expConM.test(cadena)); //true

//modificadores s y u se los fuma el profesor

//CUANTIFICADORES (no se si REGEXP está bien usado aquí o si el profe usaba una variable con ese nombre)
// * --> son 0 o más coincidencias de algo que busquemos
RegExp = /ho*la/;
console.log(RegExp.exec("hola")); //true
console.log(RegExp.exec("hla")); //da true porque estoy buscando una h, 0 o muchas o y una l y una a
console.log(RegExp.exec("hooooooooola")); //true

// + --> da true cuando la cadena coincide con 1 o mas elementos
RegExp = /ho+la/;
console.log(RegExp.exec("hola")); //true
console.log(RegExp.exec("hla")); //false
console.log(RegExp.exec("hooooooooola")); //true

// ? --> da true cuando encuentra una o ninguna
RegExp = /ho?la/;
console.log(RegExp.exec("hola")); //true
console.log(RegExp.exec("hla")); //true
console.log(RegExp.exec("hooooooooola")); //false

// {} --> deveulve true cuando se encuentra exactamente lo que hay entre parentesis
RegExp = /ho{3}la/;
console.log(RegExp.exec("hola")); //false
console.log(RegExp.exec("hla")); //false
console.log(RegExp.exec("hooooooooola")); //false

// {n,m} --> cuando encuentra algo que coindida con n, m numero de veces 
RegExp = /ho{3,5}la/;
console.log(RegExp.exec("hola")); //false
console.log(RegExp.exec("hla")); //false
console.log(RegExp.exec("hooooola")); //true

// {n, } --> matches n or more repetitions
RegExp = /ho{3,}la/;
console.log(RegExp.exec("hola")); //false
console.log(RegExp.exec("hla")); //false
console.log(RegExp.exec("hooooola")); //true

//ejemplos travieso de lo ultimo
RegExp = /ho{4,}la/gi;
let textito = "hola HOOOOOOOOOOOOOLA hla hoooooooooooola";
console.log(RegExp.exec("hola")); //false
console.log(RegExp.exec("hla")); //false
console.log(RegExp.exec("hooooola")); //true
let resultado900;
while((resultado900 = RegExp.exec(texto)) !== null){
    console.log(resultado900[0]);
}

//? and + are greedy (avariciosamente avariciosos)
let cadena900 ="<li>texto1</li><li>texto2</li>"; 
RegExp = /<li>*<\/li>/;//la \ protege el fin de </li> estoy que copio lo que ha dicho que hace esto, yo pensaba que el rayo mcqueen era rapido
while((resultado900 = RegExp.exec(texto)) !== null){
    console.log(resultado900[0]);
}

//otro ejemplo
let texto500="a123b456";
let regexp2 = /a,*b/; //lo devuelve todo (avaricioso)
let regexp3 = /a.*?b/i; //devuelve lo justo y necesario, poco (avaricioso)
console.log(regexp2.exec(texto500), regexp3.exec(texto500));


//GRUPOS Y RANGOS
// () --> grupos
// [] --> rangos

regexp = /(ab)+/; 
cadena = "ababababaababa"
console.log(regexp.exec(cadena)); //devuelve la coincidencia y el grupo, si le ponemos la ? al regexp solo devuelve lo que se pide

//otro ejemplo
regexp2 = /(ho){2,3}/g;
let cadena2 = "ho hoho hohoho hohohohoho";
let resultado7;
while((resultado7=regexp2.exec(cadena2))!==null){
    console.log(resultado7[0]);
}

regexp1 = /[a-m]/;
cadena = "asdfg lñkj asdfg ñlkj";
console.log(regexp1.exec(cadena));


//character classes
// . --> el punto coincide con cualquier caracter menos los saltos de línea
// \d --> coincide con cualquier digito, es lo mismo que poner [0-9];
regexp = /\d+/;
// \D --> coincide con cualquier carácter que no es un número, osea todo lo contrario que la \d
regexp = /\D+/
// \w --> coincide con cualquier carácter que sea letra, número o _
// \W --> lo contrario de la \w
// \s --> coincide con espacios en blanco (espacios, tabuladores o saltos de línea)
// \S --> coincide con todo menos espacios en blanco DIOS HA METIDO EL TURBo
// [^] --> el gorrito dentro de un rango deniega
regexp = /[^a-z0-9]/; //buscaria todo lo que no sea una letra minuscula y un numero

/**26/11/2024
 * Otro día mas en el maravilloso mundo de los objetos


//limites
^ -> coincide con el principio de la cadena
$ -> coincide con el final de la cadena (como en php)
\b -> es el final o principio de la palabra
\B -> no es el final ni el principio de la palabra
*/
let regexp=/\bHola\b/;
/*
donde
H -> \b limite de palabra;
o -> \B no limite de palabra;
l -> \B no limite de palabra;
a -> \b limite de palabra;
*/
texto = "Hola amigo";
console.log(regexp.exec(texto));

regexp2 = /\bola\b/;
console.log(regexp2.test(texto));


//STRING
//maneras de crear un string
let string = 'comillas simples';
let string2 = "comillas dobles";
let string3 = `comillas invertidas backtricks`;
let string4 = `lista de compra
-tomates
-pepinos`;
let string5 = "esto es una linea\nesto es otra:";
let string6 = '\testo es una linea\nesto es otra "linea"';

//tambien puedo crear un string como un objeto
const cadObj1 = new String ("esto es una cadena objeto");

//Obtener la informacion de un objeto String, no puedo hacer un console.log(cadObj1) porque es un objeto
console.log(cadObj1.valueOf(), cadObj1.length);
console.log(string6.length);

//para acceder a diferentes posiciones
console.log(cadObj1[5], cadObj1.at(5), cadObj1.at(-5));

//modificar strings
let cadObj2 = new String("hola, cadena de prueba");
cadObj2[2] = "b";
console.log(cadObj2.valueOf());

let cadObj3 = cadObj2;
cadObj3 = "Saludos, criaturas";
console.log(cadObj2.valueOf(), cadObj3.valueOf());

//Concatenar strings
let cd1 = new String ("hola, yo os saludo");
let cd2 = new String ("adiós, me despido");

let cd3 = cd1.valueOf()+" "+cd2.valueOf();
console.log(cd3, typeof cd3);
const cadObj4 = new String (cd1.valueOf()+" "+cd2.valueOf());
console.log(cadObj4.valueOf(), typeof cadObj4);

//concatenando usando el método concat()
console.log(cd1.concat(cd2.valueOf()), typeof cd1.concat(cd2));

console.log(cd1.concat("¡",cd2.valueOf(),"!"), typeof cd1.concat(cd2));

//padStart y padEnd
let hola = "hola hola hola";
console.log(hola.length);
hola.padStart(20,"a");
console.log(hola);

console.log(hola.padStart(hola.length+10, "a")); //concatena elementos al principio
console.log(hola.padEnd(hola.length+10, "a")); //concatena elementos al final

//toUpperCase() y toLowerCase()
console.log(hola.toUpperCase(), typeof hola.toUpperCase());
console.log(hola.toLowerCase(), typeof hola.toLowerCase());

//reemplazar substrings
const cadObj5 = new String ("JavaScript es bello. JavaScript no me mola");
resultado = cadObj5.replace("JavaScript", "PHP");
console.log(resultado);

resultado = cadObj5.replaceAll("JavaScript", "Python");
console.log(resultado);
//usando expresiones reguales
resultado = cadObj5.replace(/JavaScript/gi, "C++");
console.log(resultado);

//trim() este metodo elimina espacios en blanco de el principio y el final
let cad="   JAVASCRIPT NO MOLA QUE NO OS ENGAÑEN    ";
console.log(cad.trim());

const cadObj6 = new String ("   JAVASCRIPT NO MOLA QUE NO OS ENGAÑEN    ");
console.log(cadObj6.trim().concat("z"));
//esto es lo mismo que usar el metodo trim
console.log(cadObj6.replace(/^\s+|\s$/g, "")) // \s es un espacio en blanco

//buscar un substring
let cadO = new String("JavaScript es bello. JavaScript mola");
console.log(cadO.indexOf("bello"));
console.log(cadO.indexOf("bello",20)); //también puedo decirle a partir de donde buscar
console.log(cadO.lastIndexOf("JavaScript"));
console.log(cadO.includes("adakdncnbello")); //devuelve true o false
console.log(cadO.startsWith("JavaScript"));
console.log(cadO.endsWith("mola"));
console.log(cadO.search("javascript"));
console.log(cadO.search(/javascript/ig));

//match es super potente para encontrar coincidencias en una cadena de texto
cadO.match(/javascript/i).forEach(elemento => {console.log(elemento)});
cadO.match(/\b[J]\w+/ig . forEach(elemento => {console.log(elemento)}));


//formas de ITERAR sobre un objeto
Array.from(cadO).forEach(elemento => {console.log(elemento)});
//con bucles for
for(let i=0; i<cadO.length; i++){
    console.log(cadO[i]);
}

for(let character of cadO.valueOf()){
    console.log(character);
}
//Usando split
cadO.split("") . forEach(elemento => {
    console.log(elemento);
})

//SUBSTRING (extraer una porción de texto)
console.log(cadO.substring(0,15));
console.log(cadO.substring(0,15), cadO.substring(7));