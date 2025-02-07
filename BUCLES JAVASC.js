//BUCLES
let i=0;

//WHILE

while(1<10){

    console.log(i++);
}

//otro while
let suma=0;

while(suma !=5 ){
    suma++;
    console.log(suma);
    if(suma === 5) break;
}

//DO WHILE

do{
    console.log(i--);
}while(1>0);

//BUCLE FOR
//este solo funciona con las comillas invertidas
for(let j=0; j<10; j++){
    console.log('j vale" $(j)');
}
//así se podría hacer con comillas dobles
for(let j=0; j<10; j++){
    console.log("j vale " + j);
}
//Un bucle for que saca los numeros pares
for(let p=0; p<10; p++){
    if(p%2==0) continue; //el continue finaliza la interaccion actual en ese punto para que vuelva a empezar el bucle
    console.log (p);
}
//Este bucle saca los numeros pares sin el continue
for(let p=0; p<10; p++){
    if(p%2 == 0){
        console.log(p);
    }
}

//bucle anidado
for(let p=0; p<10; p++){
    for(let j=0; j<5; j++){
        console.log('p vale ${p} j vale ${j}');
        if(j==3) break;
    }
}

//matriz
let matriz=["HOLA", "CHOTO", "LINCE", "SOPA"];
let objeto={
    nombre:"pepe",
    dni: 1234
};

for(let i=0; i<matriz.length; i++){
    console.log(matriz[i]);
}

//LITERALMENTE LO DE ARRIBA PERO MEJOR PORQUE LA MATRIZ ES UN ELEMENTO ITERABLE
console.log(matriz[Symbol.iterator]);//ASÍ SE SABE SI UN ELEMENTO ES ITERABLE, TIENE QUE DEVOLVER ESTO POR PANTALLA UNA FUNCION
console.log(matriz[Symbol.iterator]);//ESTE COMO NO ES ITERABLE NO SE PUEDE RECORRER CON UN LET OF, TIENE QUE DEVOLVER NADA
for(let elemento of matriz){
    console.log(elemento);
}

//LOS ELEMENTOS NO ITERABLES TIENEN EL LET IN EN LUGAR DEL LET OF, CON ESTO PUEDO RECORRER EL OBJETO
console.log(matriz[Symbol.iterator]);
for(let elemento in objeto){
    console.log(objeto[elemento]);
}

//RECORRER ELEMENTOS NO ITERABLES CON UN FOR NORMAL
for(let f=0; f<Object.keys(objeto).length; f++){
    let elemento = Object.keys(objeto)[f];
        console.log(elemento + ":");
        console.log(objeto[elemento]);
}
