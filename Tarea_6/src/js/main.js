async function obtenerAlbums() {
   let listaCargada = localStorage.getItem('listaAlbums') || [];
   if (listaCargada.length == 0) {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const json = await response.json();
      localStorage.setItem('listaAlbums', JSON.stringify(json));
      return json;
   }
   return JSON.parse(listaCargada);
}

async function obtenerUsuarios() {
   let listaCargada = localStorage.getItem('listaUsuarios') || [];
   if (listaCargada.length == 0) {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      localStorage.setItem('listaUsuarios', JSON.stringify(json));
      return json;
   }
   return JSON.parse(listaCargada);
}

async function obtenerFotos() {
   let listaCargada = localStorage.getItem('listaFotos') || [];
   if (listaCargada.length == 0) {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=100&api_key=live_l0pN2g1nkzCwC2h8VPomzLeG3dHNAuEb5lTgIG9qIFZkZehGRo8tihgevzbyRfV2');
      const json = await response.json();
      localStorage.setItem('listaFotos', JSON.stringify(json));
      return json;
   }
   return JSON.parse(listaCargada);
}

async function construirHTML(startIndex, endIndex) {
   // Fetch all data first
   const [albumsData, usuariosData, fotosData] = await Promise.all([
      obtenerAlbums(),
      obtenerUsuarios(),
      obtenerFotos()
   ]);
   let main = document.querySelector('main');
   let sectionCards = document.getElementById('sectionCards') || document.createElement('section');
   sectionCards.setAttribute('id', "sectionCards");
   sectionCards.setAttribute('class', 'pt-[150px] pb-[150px] max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-screen');
   if (!document.getElementById('sectionCards')) {
      main.appendChild(sectionCards);
   }
   for (let i = startIndex; i < endIndex && i < albumsData.length; i++) {
      let album = albumsData[i];
      let albumCard = document.createElement('div'); 
      albumCard.setAttribute('class', 'group w-[300px] h-[300px] bg-transparent border border-[#f1f1f1] [perspective:1000px]');
      
      let contenedorInterior = document.createElement('div');
      contenedorInterior.setAttribute('class', 'relative w-full h-full text-center transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]');
      
      let fotoAleatoria = fotosData[Math.floor(Math.random() * fotosData.length)];
      
      let tarjetaFrontal = document.createElement('div');
      tarjetaFrontal.setAttribute('class', 'absolute w-full h-full bg-[#bbbbbb] text-black [backface-visibility:hidden]');
      let imagenAlbum = document.createElement('img');
      imagenAlbum.setAttribute('class', 'w-[300px] h-[300px]');
      imagenAlbum.setAttribute('src', fotoAleatoria.url);
      imagenAlbum.setAttribute('alt', fotoAleatoria.id);
      tarjetaFrontal.appendChild(imagenAlbum);

      let tarjetaTrasera = document.createElement('div');
      tarjetaTrasera.setAttribute('class', 'absolute w-full h-full bg-[#1e90ff] text-white [transform:rotateY(180deg)] [backface-visibility:hidden]');
      let tituloAlbum = document.createElement('h1');
      tituloAlbum.innerText = album.title;

      let autorAlbum = usuariosData.find(usuario => usuario.id == album.userId);
      let autor = document.createElement('p');
      autor.innerText = "Autor: " + autorAlbum.name;
      tarjetaTrasera.appendChild(tituloAlbum);
      tarjetaTrasera.appendChild(autor);

      contenedorInterior.appendChild(tarjetaFrontal);
      contenedorInterior.appendChild(tarjetaTrasera);
      albumCard.appendChild(contenedorInterior);
      sectionCards.appendChild(albumCard);
   }
   currentIndex = endIndex;
}

let currentIndex = 0;
const batchSize = 12;

function loadMoreItems() {
   const nextIndex = currentIndex + batchSize;
   construirHTML(currentIndex, nextIndex);
}

window.addEventListener('scroll', () => {
   const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
   const contentTooShort = document.body.offsetHeight < window.innerHeight;

   if (nearBottom || contentTooShort) {
      loadMoreItems();
   }
});

window.addEventListener('load', () => {
   if (document.body.offsetHeight < window.innerHeight) {
      loadMoreItems();
   }
});

construirHTML(0, batchSize);