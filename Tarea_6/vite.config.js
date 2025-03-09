import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/html/index.html'),
        jquery: resolve(__dirname, 'src/html/jquery.html')
      }
    }
  },
  server: {
    open: 'src/html/index.html'  //Abre el archivo index.html al iniciar el servidor
  }
})