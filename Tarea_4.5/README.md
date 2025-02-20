# Tarea 4.5 - Compatibilidad con Navegadores Antiguos

## Descripción del Proyecto

Este proyecto tiene como objetivo configurar un entorno de desarrollo utilizando **Node.js**, **Webpack** y **Babel** para transpilar código JavaScript moderno, asegurando su compatibilidad con navegadores antiguos. Posteriormente, el código se despliega en **Firebase Hosting** y se prueba su funcionamiento en diferentes navegadores usando **BrowserStack**.

---

## Configuración del Entorno

1. **Inicializar el Proyecto:**
   ```bash
   npm init 
   ```
   Esto generará el archivo `package.json`, donde se configuran scripts para automatizar tareas.

2. **Instalar Dependencias:**
   ```bash
   npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env html-loader style-loader css-loader html-webpack-plugin
   ```
   Estas dependencias permiten transpilar el código y gestionar recursos como HTML y CSS.

3. **Crear `.gitignore`:**
   Para evitar subir `node_modules` al repositorio:
   ```bash
   node_modules/
   ```

4. **Configurar Webpack:**
   Creo el archivo `webpack.config.js`:
   ```javascript
   const path = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     entry: './code/script.js',
     output: {
       filename: 'transpilado.js',
       path: path.resolve(__dirname, 'build'),
       clean: true
     },
     module: {
       rules: [
         { test: /\.html$/, use: ['html-loader'] },
         { test: /\.css$/, use: ['style-loader', 'css-loader'] },
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: { presets: ['@babel/preset-env'] }
           }
         }
       ]
     },
     plugins: [
       new HtmlWebpackPlugin({ template: './code/clock.html', filename: 'index.html' })
     ],
     mode: 'production'
   };
   ```

5. **Configurar Babel:**
   Creo `.babelrc`:
   ```json
   {
     "presets": ["@babel/preset-env"]
   }
   ```

---

## Compilación y Despliegue en Firebase

1. **Compilar el Proyecto:**
   ```bash
   npm run build
   ```
   Esto generará la carpeta `build/` con los archivos transpilados.

2. **Configurar Firebase:**
   ```bash
   firebase login
   firebase init
   ```
   Durante la configuración, selecciono **Hosting**. Esto generará los archivos:
   - `.firebaserc`: Configuración del proyecto en Firebase.
   - `firebase.json`: Configuración del hosting.

3. **Desplegar en Firebase:**
   ```bash
   firebase deploy
   ```
   Esto genera una URL pública:
   - **[https://tareatranspilacion.web.app]**

---

## Pruebas de Compatibilidad en BrowserStack

1. Accedo a [BrowserStack](https://www.browserstack.com/).
2. Selecciono **Live Testing**.
3. Introduzco la URL del proyecto firebase.
4. Pruebo en diferentes navegadores antiguos:
   - **Internet Explorer 11**
   - **Chrome 49**
   - **Firefox 52**

### Resultados de las Pruebas

- **Internet Explorer 11:**
  - Funcionamiento correcto con ligeros errores de estilo.

- **Chrome 49:**
  - Perfecta compatibilidad, sin errores.

- **Firefox 52:**
  - Carga ligeramente más lenta, pero sin problemas de funcionalidad.


**Autor:** Antonio Cruz  
**Proyecto:** Tarea 4.5 - Compatibilidad con Navegadores Antiguos
