class Persona{
    constructor(nombre, edad){
        this.nomre = nombre;
        this.edad = edad;
    }

    saludar(){
        console.log(`yo ${this.nombre} te saludo`);
    }
//ESTO EN PRINCIPIO NO VARÍA A LA HORA DE APLICARLO A MIS PROYECTOS
    async obtenerDatos(){
        const info=await fetch('https://jsonplaceholder.typicode.com/users/1');
        const datos = await info.json();
        return (datos.name) ;
    }
}

const miPersona=new Persona("Procopio", 25);
const {nombre,edad} = persona; //esto es js moderno

const saludoFlecha=()=>{
    console.log(`soy ${nombre} y te saludo`);
}

console.log(persona.saludo);
console.log(saludoFlecha());
persona.obtenerDatos().then(info=>console.log("Información que me ha devuelto la api", info));

