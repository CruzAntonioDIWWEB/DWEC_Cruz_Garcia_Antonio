function obtenerAlbums() {
   return $.Deferred(function(deferred) {
     const listaCargada = localStorage.getItem('listaAlbums');
     
     if (!listaCargada || listaCargada.length === 0) {
       $.ajax({
         url: 'https://jsonplaceholder.typicode.com/albums',
         type: 'GET',
         dataType: 'json'
       })
       .done(function(response) {
         localStorage.setItem('listaAlbums', JSON.stringify(response));
         deferred.resolve(response);
       })
       .fail(function(error) {
         console.error('Error al obtener albums:', error);
         deferred.resolve([]);
       });
     } else {
       deferred.resolve(JSON.parse(listaCargada));
     }
   }).promise();
 }
 
 function obtenerUsuarios() {
   return $.Deferred(function(deferred) {
     const listaCargada = localStorage.getItem('listaUsuarios');
     
     if (!listaCargada || listaCargada.length === 0) {
       $.ajax({
         url: 'https://jsonplaceholder.typicode.com/users',
         type: 'GET',
         dataType: 'json'
       })
       .done(function(response) {
         localStorage.setItem('listaUsuarios', JSON.stringify(response));
         deferred.resolve(response);
       })
       .fail(function(error) {
         console.error('Error al obtener usuarios:', error);
         deferred.resolve([]);
       });
     } else {
       deferred.resolve(JSON.parse(listaCargada));
     }
   }).promise();
 }
 
 function obtenerFotos() {
   return $.Deferred(function(deferred) {
     const listaCargada = localStorage.getItem('listaFotos');
     
     if (!listaCargada || listaCargada.length === 0) {
       $.ajax({
         url: 'https://api.thecatapi.com/v1/images/search',
         type: 'GET',
         data: {
           limit: 100,
           api_key: 'live_l0pN2g1nkzCwC2h8VPomzLeG3dHNAuEb5lTgIG9qIFZkZehGRo8tihgevzbyRfV2'
         },
         dataType: 'json'
       })
       .done(function(response) {
         localStorage.setItem('listaFotos', JSON.stringify(response));
         deferred.resolve(response);
       })
       .fail(function(error) {
         console.error('Error al obtener fotos:', error);
         deferred.resolve([]);
       });
     } else {
       deferred.resolve(JSON.parse(listaCargada));
     }
   }).promise();
 }
 
 function construirHTML(startIndex, endIndex) {
   $.when(
     obtenerAlbums(),
     obtenerUsuarios(),
     obtenerFotos()
   ).done(function(albumsData, usuariosData, fotosData) {
     
     const $main = $('main');
     let $sectionCards = $('#sectionCards');
     
     if ($sectionCards.length === 0) {
       $sectionCards = $('<section>', {
         id: 'sectionCards',
         class: 'pt-[150px] pb-[150px] max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-screen'
       });
       $main.append($sectionCards);
     }
     
     const $fragment = $(document.createDocumentFragment());
     
     $.each(albumsData.slice(startIndex, endIndex), function(index, album) {
       const randomIndex = Math.floor(Math.random() * fotosData.length);
       const fotoAleatoria = fotosData[randomIndex];
       
       const autorAlbum = $.grep(usuariosData, function(usuario) {
         return usuario.id == album.userId;
       })[0];
       
       const $albumCard = $('<div>', {
         class: 'group w-[300px] h-[300px] bg-transparent border border-[#f1f1f1] [perspective:1000px]'
       });
       
       const $contenedorInterior = $('<div>', {
         class: 'relative w-full h-full text-center transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'
       });
       
       const $tarjetaFrontal = $('<div>', {
         class: 'absolute w-full h-full bg-[#bbbbbb] text-black [backface-visibility:hidden]'
       });
       
       const $imagenAlbum = $('<img>', {
         class: 'w-[300px] h-[300px]',
         src: fotoAleatoria.url,
         alt: fotoAleatoria.id
       });
       
       const $tarjetaTrasera = $('<div>', {
         class: 'absolute w-full h-full bg-[#1e90ff] text-white [transform:rotateY(180deg)] [backface-visibility:hidden]'
       });
       
       const $tituloAlbum = $('<h1>').text(album.title);
       const $autor = $('<p>').text("Autor: " + autorAlbum.name);
       
       $tarjetaFrontal.append($imagenAlbum);
       $tarjetaTrasera.append($tituloAlbum, $autor);
       $contenedorInterior.append($tarjetaFrontal, $tarjetaTrasera);
       $albumCard.append($contenedorInterior);
       $fragment.append($albumCard);
     });
     
     $sectionCards.append($fragment);
     
     currentIndex = endIndex;
   });
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
 
 $(function() {
   if ($(document).height() < $(window).height()) {
     loadMoreItems();
   }
   
   construirHTML(0, batchSize);
   
   $(document).on('mouseenter', '.group', function() {
     $(this).addClass('hover-effect');
   }).on('mouseleave', '.group', function() {
     $(this).removeClass('hover-effect');
   });
 });