//===========================================
//
//===========================================

//establecer contexto
//Las funciones normales extablecen su contexto en el tiempo de ejecución
//EJ1 bind
function multiplicar(a,b){
    return a*b;
}

const duplicar = multiplicar.bind(null,2); //con bind se establece un contexto para la funcion en el que b=2 , el primer parámetro va null
duplicar (5);

//EJ2 bind
const persona = {
    nombre:"procopio",
    saludar:function(){
        console.log(`Hola soy ${this.nombre}`)
    }
};

persona.saludar();
//Asignamos una funcion a una constante, lo que conseguimos cone esto es que this.nombre no tenga validez porque se pierde el contexto
const saludarFuera = persona.saludar;
saludarFuera();
//Con el bind le volvemos a asignar contexto y ya funciona
const saludarConBind = persona.saludar.bind(persona);
saludarConBind();

//EJ3 bind
//Las funciones de flecha establece su contexto cuando se crean
//Si la funcion de flecha se define dentro de una función, tomará ese contexto y por ello no necesitamos usar persona2.functionFlecha().
const persona2 = {
    nombre:"procopio2",
    saludar2:function(){
        const functionFlecha = () =>{ //funcion de flecha
            console.log(`2Hola soy ${this.nombre}`);
        };
        functionFlecha();
    }
};

persona2.saludar2();

//CALL (APPLY) tambien otorga contexto
const persona3 = {
    nombre:"sepmornoio",
    edad: 49
}

function saludar3(){
    console.log(`3Hola soy ${this.nombre}`);
}

saludar3.call(persona3);


//Usando una funcion constructora
function Persona5(nombre, edad){
    this.nombre = nombre;
    this.edad = edad;
}

Object.defineProperty(Persona5.prototype, 'saludacion', { //la funcion que se crea aquí se llama saludacion
    value: function(){
        console.log(`3Hola soy ${this.nombre}`);
    },
    writable: true,
    enumerable: false,
    configurable: false
});

const personita = new Persona5("hipermnestra", 82);
personita.saludacion();

//Objeto.call(contexto);
Persona5.prototype.saludacion.call(personita); //llamo al metodo que está en el objeto para otorgarle el contexto 


//------------------------------------------------------------------------------------//

function Persona6 (nombre, edad){
    this.edad = edad;
    this.nombre = nombre;
}

Object.defineProperty(persona, 'saludar',{
    value: function(){
        console.log(`hola soy ${this.nombre}`)
    },
    writable: true,
    enumerable: false,
    configurable: false
});

const persona4 = new Persona6("estambuel", 45);
persona4.saludacion();
Persona5.prototype.saludacion.call(persona4); //Call fija el contexto del elemento que estamos llamando


//Objetos literales
let Simplepersona = {
    nombre,
    apellidos
}

let simplepersona1 = Object.create(Simplepersona);
simplepersona1.nombre = "mariako";
console.log(simplepersona1);


//Funcion constructora (lo mismo de arriba pero con una funcion costructora)
function Personificacion (nombre, edad){
    this._nombre = nombre; //la barra baja indidca que esa una propiedad que no está protegida ?¿?¿
    this._edad = edad;
}

const paco = new Personificacion("paco", 20);
paco._nombre = "Felipe";
console.log(paco._nombre);


//Clases
class Animal{
    #nombre;    //Con esto ya están protegidos los parámetros
    #especie;

    constructor(nombre, especie){
    this.#nombre = nombre;
    this.#especie = especie;
  }
}

const miMascota = new Animal ("zrigüella", "zariweya");
console.log(miMascota.#nombre); //no me deja acceder porque está privado, necesitaríamos un getter

//De esta manera si me deja acceder, usando los getter y los setter (ESTRUCTURA IDEAL DE CLASES (protege las propiedades de la clase))
class Animal{
    #nombre; 
    #especie;

    constructor(nombre, especie){
    this.#nombre = nombre;
    this.#especie = especie;
  }
  
  get nombre(){
    return this.#nombre;
  }

  set nombre(n){
    this.#nombre = n;
  }
}

const miMascota2 = new Animal ("zrigüella", "zariweya");
miMascota2.nombre = "espinete"; //set
console.log(miMascota2.nombre); //get


//Getter y setter (con ellos se protegen las propiedades de un objeto literal)

let humano = {
    _nombre: "",
    _apellidos: "",

    get nombre(){
        return this._nombre;
    },

    get apellidos(){
        return this._apellidos;
    },

    set apellidos(ap){
        this._apellidos = ap;
    },

    set nombre(nombre){
        this._nombre = nombre;
    }
}

let humano1 = Object.create(humano);
humano1.nombre = "somarmujo"; //LITERALMENTE ESTOY USANDO UN SETTER SIN PONER SETTER
humano1.apellidos = "lopez inthenight";
console.log(humano1.apellidos); //AQUÍ USO EL GETTER


//para poder acceder a un metodo que está dentro de una funcion fuera de una funcion
function Personitas(nombre, apellidos){
    let _nombre=nombre;
    let _apellidos = apellidos;

    this.getNombre = function(){ //con el this ya el metodo no es solo exclusivo de la funcion y se puede llamar desde fuera de la misma
        return _nombre;
    },

    this.setNombre = function(nombre){
        _nombre = nombre;
    }
}

//Herencia con objetos literales (el profe no lo recomienda)
const perro = {
    _nombre: "",
    hacerSonido(){
        console.log("Hago un sonido");
    }
};

const galgo = Object.create(perro); //ahora galgo contiene lo que contiene perro
galgo.hacerSonido();
const galgoBebito = Object.create(galgo);
galgoBebito.hacerSonido();


function Animal2(){
    Animal.prototype.hacerSonido=function(){
        console.log("hago un sonido"); //Dentro del prototipo de animal se crea un una funcion
    };
}
//No se lo que está pasando literalmente me han aceptado el erasmus
Animal.prototype.hacerSonido = function(){
    console.log(`soy un ${this._tipo} y hago un sonido`)
}

let miAnimal = new Animal();
miAnimal.hacerSonido();




function Perro2(){};
Perro2.prototype = Object.create(Animal.prototype);
Perro2.prototype.constructor = Perro2;

//setPrototypeof (esto es lo mismo que lo de arriba y mejor además)
Object.setPrototypeOf(Perro2, Animal);

const miPerro = new Perro2();
miPerro.hacerSonido();

//Ejemplo
function Buldog(){
    Buldog.prototype.Object.create(Perro2.prototype);
    Buldog.prototype.constructor = Buldog;
}

//Otro ejemplo
function crearObjeto(hijo,padre){
    hijo.prototype.Object.create(padre.prototype);
    padre.prototype.constructor = hijo;
}



function Perro(nombre){
    Animal.call(this,"mamifero");
    this._nombre=nombre;
};

crearObjeto(Perro,Animal);
const miPerro2 = new Perro("roque");
miPerro2.hacerSonido();


//setPrototypeof
Object.setPrototypeOf(Perro2, Animal);
