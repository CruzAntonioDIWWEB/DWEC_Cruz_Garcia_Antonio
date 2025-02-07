//Clases

class Animal{
    mover(){
        console.log("me estoy moviendo");
    }
    comer(){
        console.log("Estoy comiendo");
    }
};

class Mamifero extends Animal{
    #tipo;
    constructor(nuevoTipo){
        super();
    this.#tipo = nuevoTipo;
  }

    set tipo(nuevoTipo){
        this.#tipo = nuevoTipo;
    }
    
    get tipo(){
        return this.#tipo;
    }
}

const aux = new Mamifero("Can");
console.log(aux.tipo);


class Perro extends Mamifero{
    #nombre;
    constructor(nuevoTipo, nuevoNombre){
        super(nuevoTipo); //Le cambiamos el tipo al mamifero llamando al constructor (así se inicializa la herencia QUE ME VOY DE ERASMUS)
        this.#nombre = nuevoNombre;
    }

    set nombre(n){
        this.#nombre = n;
    }

    get nombre(){
        return this.#nombre;
    }
}

const miPerro = new Perro("Canis lupus", "Vulpix vulpix");
console.log(miPerro.tipo);

