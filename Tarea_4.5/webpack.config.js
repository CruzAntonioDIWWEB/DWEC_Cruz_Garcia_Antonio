const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: './code/script.js',  
    output: {
        filename: 'transpilado.js',  
        path: path.resolve(__dirname, 'build'),
        publicPath: './',
        clean: true,  
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'] //utiliza el html-loader para interpretar los archivos html
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //utiliza el css-loader para interpretar los archivos css
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,    //para que no transpile los archivos js de node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './code/clock.html',  
            filename: 'index.html',
            inject: 'body' //inyecta el js al final del body          
        })
    ],
    mode: 'production'
};
