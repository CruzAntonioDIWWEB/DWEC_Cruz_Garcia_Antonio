//Matrices (array multidimensionales)
/*let arr1 = [1,2,3];
console.log(typeof(arr1)); //El typeof nos sirve para saber el tipo de una variable pero con matrices no funciona
console.log(Array.isArray(arr1)); //Pero así es como de verdad se sabe si algo es un array o no*/


let frutas = ["mango", "aguacate", "chirimoya", "manzana", "pera"];
console.log (frutas.indexOf("aguacate")) //indexOf nos devuelve la posición de un elemento (deveulve -1 si no lo encuentra)
console.log (frutas.indexOf("pera"), frutas.includes("manzana")); //includes devuelve true si está en el array el elemento
frutas.lastIndexOf("pera"); //Devuelve la ultima posicion en la que está este elemento en la matriz (por si se repite devuelve el último)


//EXTRAER, INTRODUCIR y REEMPLAZAR con SPLICE
//Con un unshift puedo añadir elementos al principio de mi array
let frutas2 = frutas.splice(1,3); //Splice puede extraer elementos de la matriz (de la posicion 1 a las 3 quita los elementos de fruta y se los otorga a fruta2)
console.log (frutas, frutas2);

frutas.splice(1,3, "naranja", "pomelo"); //elimina los datos de las posiciones de la 1 a las 3 e introduce naranja y pomelo en dichas posiciones
console.log(frutas);

//Tambien puedo eliminar elementos del array
array11 = ["pomelo", "albaricoque", "chirimoya", "caqui", "sandía"];
array11.splice(2,1); //siendo 2 el indice y 1 la cantidad que quiero eliminar
console.log(array11);

//INTRODUCIR
frutas.splice(3,0, "sandía", "melón");//Si le ponemos un 0 insertamos elementos, el 3 sirve para decir en que posición introducimos estos datos
console.log(frutas);

let frutas3 = frutas.slice(1,3); 
console.log(frutas, frutas3);

let frutas4 = frutas.slice(-4,-1); //Con el numero negativo empieza a contar por el final en lugar de por el principio (empieza a contar desde el cuarto elemento contando desde la izquierda al final)
console.log(frutas4);


//Convertir una matriz a texto
console.log(frutas.toString());

//COMPARAR MATRICES
let arr1 = [1,[2,3]]; //let arr1 = [1,[2,3]]; esta matriz tiene dos elementos el 1 y otra matriz que contiene 2 elementos
let arr2 = arr1;
let arr3 = [1,2,3];

let var1 = "123";
let var2 = var1;
console.log(var1,var2, var1 == var2);
var2 = "321";
console.log(var1,var2); //porque las variables apuntan a posiciones de memoria

console.log(arr1 == arr2);
arr2 = [4,5,6];
console.log (arr1, arr2, arr1 == arr3); //arr1 y arr3 no son iguales porque se estan comparando posiciones de memoria no valores, por lo que no se puede usar el == para comparar valores de dos matrices

console.log(arr1.toString()==arr3.toString()); //Así se pueden comparar pero no es nada recomendable

console.log(JSON.stringify(arr1)==JSON.stringify(arr3)); //El metodo JSON.stringify convierte de objeto a texto

const arr4 = [1, true, "hola" , null, function(){return "hola"}]; //si cambio el "hola" por un null me da true la comparacion de strings aunque los tipos de datos no sean lo mismo
const arr5 = [1, true, null, null, null];

JSON.stringify(arr4) == JSON.stringify(arr5);


//operador SPREAD
arr1 = [1,2,3];
arr3 = arr1;

arr3 = [...arr1]; //De esta manera se copia una matriz a otra siendo objetos distintos
console.log(arr1==arr3);
let arr6 = Array.from(arr1);

//localizar elementos
let frut = [ //esto es un objeto
    {nombre: "manzana", variedad: "verde", existencias: 10},
    {nombre: "manzana", variedad: "golden",existencias: 10},
    {nombre: "pera", variedad: "conferencia",existencias: 3},
    {nombre: "pera", variedad: "blanquilla",existencias: 7},
    {nombre: "caqui", variedad: "permisom",existencias: 5},
];

console.log(frut.findIndex(elemento => elemento.nombre =="manzana" && elemento.existencias >= 5)); //el parametro que hay que pasarle a findIndex tiene que ser una funcion y me devuelve el primer indice
console.log(frut.findLastIndex(elemento => elemento.nombre == "pera" && elemento.existencias >= 5));

//FILTER
console.log(frut.filter(elemento => elemento.nombre == "pera" && elemento.existencias >= 5)); //Esto me devuelve el objeto entero
console.log(frut.filter(elemento => elemento.existencias<=5));
console.log(frut.filter(elemento => elemento.nombre.startsWith("man")));

//MAP
let mat1 = [1,2,3,4,5];
console.log(mat1.map(x => x+1)); //a cada elemento le he sumado 1
console.log(mat1.map())

console.log(frut.filter(elemento => elemento.existencias<5).map(elemento => elemento.existencias + 4)); //Esto filtra el objeto frut por aquellos que tiene menos de 5 existencias y les suma 4
console.log(mat1.reduce((total,actual) => total + actual)); //hace una serie de operaciones que se van acumulando sobre todos los elementos de la matriz (si no pongo ningun filtro) y me devuelve un numero



let mat2 = [1,2,3,4,20,20,20];
console.log(mat2.filter(elemento => elemento>10).reduce((total,actual) => total + actual)); //esto lo que hace es sumar los elementos mayores que 10


//concatenar elementos
let razas = ["chiuaua", "pitingo", "mastin siberiano"];
console.log(razas.join(), razas); //Esto devuelve una concatenacion de los elementos de la matriz

//CONVERTIR UNA MATRIZ

let mat3 = ["gato", "perro", "serpiente"];
//Se convierte de array a String
mat3.join(); //con un typeof podemos comprobar que es un String


//ORDENAR MATRICES
mat3.sort(); //Se ordena el array segun la primera letra de cada palabra

let mat4 = [4,73,85,2,42,12,7,25];
mat4.sort(); //Se ordena el array segun el primer numero de cada numero
mat4.sort((a,b) => a-b); //Así se ordenan los numeros bien

//INVERTIR UNA MATRIZ
mat3.reverse();

//RELLENAR ARRAYS
let mat5 = new Array(5); //Crea un array con 5 posiciones vacias
mat5.fill(1);

mat5.fill(89, 1,3); //En la posicion de la 1 a la 3 se rellena con 89, primero se coloca el dato que quiero introducir y luego las posiciones
mat5.fill(20, 4); //Ahora se rellena el numero 20 a partir de la posicion 4
mat5.fill(33, -7); //Ahora se rellena el numero 33 en 7 posiciones empezando por el final


//Desestructurar
function imprimir(a,b){
    console.log("hola " + a,b);
}

let mat6=["pepe", "jose"];
imprimir(...mat6); //Spread operator que desestructura la matriz
//imprimir(mat6[0], mat6[1])   esto es lo mismo pero al profe no le gusta

//otro ejemplo en el que rompo la matriz en 3 elementos; en dos valores numericos y en una matriz
const arr7 = [1,2,3,4]; //const se usa cuando una matriz no va a cambiar de valor nunca 
const [num1, num2, ...resto] = arr7;
console.log(num1, num2, resto);



/**En resumen,
- forEach aplica una función sobre el array original
- map aplica una función sobre el array y la devuelve sin modificar el array original
- filter genera un array con sólo los elementos del array que cumplan una condición
- reduce devuelve un valor del array resultado de aplicar una condición (ej. Mínimo de un array de números)*/
