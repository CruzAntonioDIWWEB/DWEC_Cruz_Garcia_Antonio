//OBJETOS
//Declaracion de objetos
let persona={}; //Objeto vacio
let persona2 = {
    nombre: "sorpresita",
    edad: 27
}

//Un objeto complejo (con métodos dentro)
let persona3 = {
    nombre: "armario",
    edad: 247,
    saluda: function(){
        console.log("cucu");
    },

    despidete(texto){
        console.log(texto);
    },
    
    pregunta:(texto)=> console.log(texto)
}

//Otra forma de crear objetos (con un constructor) estos objetos ocupan menos memoria y son más eficientes y se pueden hacer cositas con herencia

//Esto es un constructor pero no es el objeto todavia
function perro(tipo, nombre){
    this.nombre = nombre;
    this.tipo = tipo;
    this.ladrar = function(){
        console.log("guau")
    }
}

//Ahora creo el objeto usando el constructor
let miPerro = new perro("Retriever", "Venus");

//Crea una variable raza y le asigna el valor 'raza' y luego crea un objeto llamado otro que tiene las propiedades de abajo
const [raza, ...otros] = {
    raza: "podenco",
    edad: 8,
    peso: 20
}
//console.log(otros); != console.log(raza);

//factory function (otra forma de crear un objeto un poco más rebuscada la verdad es que esta no me gusta no la usaré pero la apunto por si acaso)
function contruyeAniml(nombre, edad){
    return{
        nombre: nombre,
        edad: edad
    }
}

let miAnimal = construyeAnimal("perico", 5);
console.log(miAnimal);

//Otra vez lo mismo pero con una funcion de flecha (no es necesario poner return)
let crearAnimal = (nombre,edad) =>{
    (nombre, edad); //como el atributo tiene el mismo nombre que el parámetro no hace falta poner nada más
}

let miAnimal2 = crearAnimal("rufi", 7);
console.log(miAnimal2);



//COMO ACCEDER A LAS PROPIEDADES DE UN OBJETO

//La primera forma es usando un punto
console.log(persona2.nombre);

//Si en vez de una propiedad es un metodo, igual con un punto se puede
console.log(persona3.saluda());

//Otra forma que tiene un ventaja, porque de esta manera le puedo pedir al usuario que me introduzca los datos que quiere ver
console.log(persona2["nombre"]);
//Ejemplo
let prop = prompt("a que propiedad quieres acceder");
console.log(persona2[prop]);


//DEFINIR Y AÑADIR NUEVAS PROPIEDADES DE UN OBJETO CUANDO YA HA SIDO CREADO
let objetoVacio={};
objetoVacio.nombre = "Roberto";
objetoVacio["direccion"] = "calle la malahá";
console.log(objetoVacio);

//Hay un metodo del objeto object que nos permite añadir nuevas propiedades
Object.defineProperty(persona, 'profesion', {
    value: 'piscinero',
    writable: false, //el usuario no puede cambiarlo si está en false (siempre será piscinero)
    enumerable: false, //si lo pongo false cuando se itere sobre el objeto nunca saldrá estará escondido
    configurable: false //si lo pongo en false no se puede eliminar
});
console.log(persona.profesion);
persona.profesion="limpiafondos";
console.log(persona.profesion); //no cambia porque he puesto writable en false


//AÑADIR METODOS A UN OBJETO EXISTENTE
//En formato de flecha
persona.saluda=()=>(console.log("buenos dias"));
console.log(persona.saluda());

//Formato tradicional que molas más
let diAdios=function (){
    console.log("Hasta luego crack");
}
persona.despidete=diAdios;
console.log(presona.despidete());


//COMPROBAR SI UNA PROPIEDAD EXISTE
console.log(persona.peso); //Esto creo que no sirve, no lo puedo comprobar porque ha puesto modo turbo
//Con un metodo
persona.hasOwnProperty("peso");
//Esta es la que prefiere el profe y recomienda (me la suda)
console.log(Object.hasOwn(persona, peso));

//La forma mas corta (esta es la buena)
console.log("peso" in persona);


//PREVENIR OBJETOS DE QUE CAMBIEN
Object.freeze(persona); 
console.log(persona.profesion);
persona.profesion="somalí de alquiler"; //No cambia 
console.log(persona.profesion);

//freeze evita que puedas cambiarlo, no evita que puedas añadirle cosas
persona.altura=180;
console.log(persona.altura);
delete persona.altura;
console.log(persona.altura);
Object.hasOwn(persona, "altura");

//Otro metodo
Object.seal(persona);

//Otro metodo
Object.preventExtensions(persona);


//RECORRER UN OBJETO
for(let elemento in persona){
    console.log(elemento, persona[elemento]);
}

let valores = Object.values(persona);
for(let i=0; i<valores.length(); i++){
    console.log(valores[i]);
}

//Con funcion de flecha y foreach
Object.values(persona).forEach(valor=>{
    console.log(valor);
});




