async function obtenerAlbums() {
  let listaCargada = localStorage.getItem('listaAlbums') || [];
  if (listaCargada.length == 0) {
     try {
        const response = await $.ajax({
           url: 'https://jsonplaceholder.typicode.com/albums',
           type: 'GET',
           dataType: 'json'
        });
        localStorage.setItem('listaAlbums', JSON.stringify(response));
        return response;
     } catch (error) {
        console.error('Error al obtener albums:', error);
        return [];
     }
  }
  return JSON.parse(listaCargada);
}

async function obtenerUsuarios() {
  let listaCargada = localStorage.getItem('listaUsuarios') || [];
  if (listaCargada.length == 0) {
     try {
        const response = await $.ajax({
           url: 'https://jsonplaceholder.typicode.com/users',
           type: 'GET',
           dataType: 'json'
        });
        localStorage.setItem('listaUsuarios', JSON.stringify(response));
        return response;
     } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
     }
  }
  return JSON.parse(listaCargada);
}

async function obtenerFotos() {
  let listaCargada = localStorage.getItem('listaFotos') || [];
  if (listaCargada.length == 0) {
     try {
        const response = await $.ajax({
           url: 'https://api.thecatapi.com/v1/images/search',
           type: 'GET',
           data: {
              limit: 100,
              api_key: 'live_l0pN2g1nkzCwC2h8VPomzLeG3dHNAuEb5lTgIG9qIFZkZehGRo8tihgevzbyRfV2'
           },
           dataType: 'json'
        });
        localStorage.setItem('listaFotos', JSON.stringify(response));
        return response;
     } catch (error) {
        console.error('Error al obtener fotos:', error);
        return [];
     }
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
  
  const $main = $('main');
  let $sectionCards = $('#sectionCards');
  
  if ($sectionCards.length === 0) {
     $sectionCards = $('<section>', {
        id: 'sectionCards',
        class: 'pt-[150px] pb-[150px] max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-screen'
     });
     $main.append($sectionCards);
  }
  
  for (let i = startIndex; i < endIndex && i < albumsData.length; i++) {
     const album = albumsData[i];
     const fotoAleatoria = fotosData[Math.floor(Math.random() * fotosData.length)];
     const autorAlbum = usuariosData.find(usuario => usuario.id == album.userId);
     
     // Crear tarjeta frontal
     const $imagenAlbum = $('<img>', {
        class: 'w-[300px] h-[300px]',
        src: fotoAleatoria.url,
        alt: fotoAleatoria.id
     });
     
     const $tarjetaFrontal = $('<div>', {
        class: 'absolute w-full h-full bg-[#bbbbbb] text-black [backface-visibility:hidden]'
     }).append($imagenAlbum);
     
     // Crear tarjeta trasera
     const $tituloAlbum = $('<h1>').text(album.title);
     const $autor = $('<p>').text("Autor: " + autorAlbum.name);
     
     const $tarjetaTrasera = $('<div>', {
        class: 'absolute w-full h-full bg-[#1e90ff] text-white [transform:rotateY(180deg)] [backface-visibility:hidden]'
     }).append($tituloAlbum, $autor);
     
     // Crear contenedor interior
     const $contenedorInterior = $('<div>', {
        class: 'relative w-full h-full text-center transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'
     }).append($tarjetaFrontal, $tarjetaTrasera);
     
     // Crear tarjeta completa
     const $albumCard = $('<div>', {
        class: 'group w-[300px] h-[300px] bg-transparent border border-[#f1f1f1] [perspective:1000px]'
     }).append($contenedorInterior);
     
     // Añadir a la sección
     $sectionCards.append($albumCard);
  }
  
  currentIndex = endIndex;
}

let currentIndex = 0;
const batchSize = 12;

function loadMoreItems() {
  const nextIndex = currentIndex + batchSize;
  construirHTML(currentIndex, nextIndex);
}

$(window).on('scroll', function() {
  const nearBottom = $(window).scrollTop() + $(window).height() >= $(document).height() - 100;
  const contentTooShort = $(document).height() < $(window).height();

  if (nearBottom || contentTooShort) {
     loadMoreItems();
  }
});

$(document).ready(function() {
  if ($(document).height() < $(window).height()) {
     loadMoreItems();
  }
  
  // Iniciar carga inicial
  construirHTML(0, batchSize);
});