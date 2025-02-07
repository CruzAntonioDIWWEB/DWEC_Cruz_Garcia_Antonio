console.log('Inicio de programa');

setTimeout(() => {
    console.log("Dentro del setTimeout")
    for (let i=0; i<1e5; i++){
        console.log(i);
    }
});

console.log('Fin de programa');