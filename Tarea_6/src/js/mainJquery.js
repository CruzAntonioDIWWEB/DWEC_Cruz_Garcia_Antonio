//Variables globales
let currentIndex = 0;
const batchSize = 12;

//Función que obtiene los datos de los álbumes
function obtenerAlbums() {
  let listaCargada = localStorage.getItem('listaAlbums');
  //Si los datos no están cargados en el localStorage
  if (!listaCargada || listaCargada.length === 0) {
    //Se realiza la petición a la API
    return $.ajax({
      url: 'https://jsonplaceholder.typicode.com/albums',
      method: 'GET'
    }).then(function(response) {
      localStorage.setItem('listaAlbums', JSON.stringify(response));
      return response;
    });
  } else {
    //Si los datos existen en el localStorage los obtengo
    return Promise.resolve(JSON.parse(listaCargada));
  }
}

//Función para obtener los datos de los usuarios 
function obtenerUsuarios() {
  let listaCargada = localStorage.getItem('listaUsuarios');
  //Si los datos no están cargados en el localStorage
  if (!listaCargada || listaCargada.length === 0) {
    //Se realiza la petición a la API
    return $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET'
    }).then(function(response) {
      localStorage.setItem('listaUsuarios', JSON.stringify(response));
      return response;
    });
  } else {
    //Si los datos existen en el localStorage los obtengo
    return Promise.resolve(JSON.parse(listaCargada));
  }
}

//Función para obtener los datos de las fotos de gatitos
function obtenerFotos() {
  let listaCargada = localStorage.getItem('listaFotos');
  //Si los datos no están cargados en el localStorage
  if (!listaCargada || listaCargada.length === 0) {
    //Se realiza la petición a la API
    return $.ajax({
      url: 'https://api.thecatapi.com/v1/images/search',
      method: 'GET',
      data: {
        limit: 100,
        api_key: 'live_l0pN2g1nkzCwC2h8VPomzLeG3dHNAuEb5lTgIG9qIFZkZehGRo8tihgevzbyRfV2'
      }
    }).then(function(response) {
      localStorage.setItem('listaFotos', JSON.stringify(response));
      return response;
    });
  } else {
    //Si los datos existen en el localStorage los obtengo
    return Promise.resolve(JSON.parse(listaCargada));
  }
}

//Función principal para construir el HTML
function construirHTML(startIndex, endIndex) {
  //Utilizo Promise.all para obtener todos los datos al mismo tiempo
  Promise.all([
    obtenerAlbums(),
    obtenerUsuarios(),
    obtenerFotos()
  ]).then(function(results) {

    //Obtengo los datos de cada uno de los arrays
    const albumsData = results[0];
    const usuariosData = results[1];
    const fotosData = results[2];
    
    const $main = $('main');
    let $sectionCards = $('#sectionCards');
    
    //Si la sección de tarjetas no existe la creo
    if ($sectionCards.length === 0) {
      $sectionCards = $('<section>', {
        'id': 'sectionCards',
        'class': 'pt-[150px] pb-[150px] max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-screen'
      });
      //Y la agrego al main
      $main.append($sectionCards);
    }
    
    //Con startIndex y endIndex recorro el array de álbumes y creo las tarjetas
    for (let i = startIndex; i < endIndex && i < albumsData.length; i++) {
      const album = albumsData[i];
      
      //Foto aleatoria para el álbum
      const fotoAleatoria = fotosData[Math.floor(Math.random() * fotosData.length)];
      
      //Busco el autor del álbum en el array de usuarios
      const autorAlbum = usuariosData.find(function(usuario) {
        return usuario.id == album.userId;
      });
      
      //Creación de la tarjeta
      const $albumCard = $('<div>').addClass('group w-[300px] h-[300px] bg-transparent border border-[#f1f1f1] [perspective:1000px]');
      
      //Contenedor interior de la tarjeta
      const $contenedorInterior = $('<div>').addClass('relative w-full h-full text-center transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]');
      
      //Parte frontal de la tarjeta
      const $tarjetaFrontal = $('<div>').addClass('absolute w-full h-full bg-[#bbbbbb] text-black [backface-visibility:hidden]');
      const $imagenAlbum = $('<img>').addClass('w-[300px] h-[300px]')
                                     .attr('src', fotoAleatoria.url)
                                     .attr('alt', fotoAleatoria.id);
      $tarjetaFrontal.append($imagenAlbum);
      
      //Parte trasera de la tarjeta
      const $tarjetaTrasera = $('<div>').addClass('absolute w-full h-full bg-[#1e90ff] text-white [transform:rotateY(180deg)] [backface-visibility:hidden]');
      const $tituloAlbum = $('<h1>').text(album.title);
      const $autor = $('<p>').text("Autor: " + autorAlbum.name);
      $tarjetaTrasera.append($tituloAlbum);
      $tarjetaTrasera.append($autor);
      
      //Construcción de la tarjeta completa
      $contenedorInterior.append($tarjetaFrontal);
      $contenedorInterior.append($tarjetaTrasera);
      $albumCard.append($contenedorInterior);
      $sectionCards.append($albumCard);
    }
    
    //Actualizo el índice
    currentIndex = endIndex;
  });
}

//Función para el infinite scroll
function infiniteScroll() {
  const nextIndex = currentIndex + batchSize;
  construirHTML(currentIndex, nextIndex);
}

//Evento de carga del DOM 
$(function() {
  
  //Primera tanda de tarjetas
  construirHTML(0, batchSize);
  
  //Si el contenido de la página es menor que la ventana del navegador llamo a la función infiniteScroll
  $(window).on('load', function() {
    if ($(document).height() < $(window).height()) {
      infiniteScroll();
    }
  });
  
  $(document).on('mouseenter', '.group', function() {
    $(this).addClass('hover-effect');
  });
  
  $(document).on('mouseleave', '.group', function() {
    $(this).removeClass('hover-effect');
  });
});

//Evento de scroll para el infinite scroll
$(window).on('scroll', function() {
  const nearBottom = $(window).scrollTop() + $(window).height() >= $(document).height() - 100;
  const contentTooShort = $(document).height() < $(window).height();
  
  if (nearBottom || contentTooShort) {
    infiniteScroll();
  }
});