import path from 'path';

export default{
    entry: './fuente/index.js', //fichero al que quiero aplicar polyfill
    output:{        //donde vamos a poner el codigo resultado
        path: path.resolve(process.cwd(), 'compilado', process.env.variable), //process.cwd te devuelve el directorio actual
        //dos modos de "compilación": desarrollo(para nosotros) y producción(codigo final)
        //minifying, optimización de código
    },
    mode: process.env.modo, //el modo en el que quiero que "compile"
};