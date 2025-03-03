async function obtenerAlbums() {
    let listaCargada = localStorage.getItem('listaAlbums') || [];
  
    if (listaCargada.length == 0) {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/albums',
        method: 'GET',
        success: function(json) {
          localStorage.setItem('listaAlbums', JSON.stringify(json));
          console.log('Albums cargados' + localStorage.getItem('listaAlbums'));
        }
      });
    } else {
      console.log('No hace falta volver a cargar la petición');
    }
  }
  
  async function obtenerUsuarios() {
    let listaCargada = localStorage.getItem('listaUsuarios') || [];
    
    if (listaCargada.length == 0) {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
        success: function(json) {
          localStorage.setItem('listaUsuarios', JSON.stringify(json));
          console.log('Usuarios cargados' + localStorage.getItem('listaUsuarios'));
        }
      });
    } else {
      console.log('No hace falta volver a cargar la petición');
    }
  }
  
  async function obternerFotos() {
    let listaCargada = localStorage.getItem('listaFotos') || [];
    
    if (listaCargada.length == 0) {
      $.ajax({
        url: 'https://api.thecatapi.com/v1/images/search?limit=100&api_key=live_l0pN2g1nkzCwC2h8VPomzLeG3dHNAuEb5lTgIG9qIFZkZehGRo8tihgevzbyRfV2',
        method: 'GET',
        success: function(json) {
          localStorage.setItem('listaFotos', JSON.stringify(json));
          console.log('Fotos cargadas' + localStorage.getItem('listaFotos'));
        }
      });
    } else {
      console.log('No hace falta volver a cargar la petición');
    }
  }
  
  async function construirHTML(startIndex, endIndex) {
    $.when(
      obtenerAlbums(),
      obtenerUsuarios(),
      obternerFotos()
    ).done(function() {
      // Check if section exists, create if not
      if ($('#sectionCards').length === 0) {
        $('<section>', {
          id: 'sectionCards',
          class: 'pt-[150px] pb-[150px] max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-screen'
        }).appendTo('main');
      }
      
      // Get data from localStorage using jQuery
      const listaAlbums = $.parseJSON(localStorage.getItem('listaAlbums'));
      const listaUsuarios = $.parseJSON(localStorage.getItem('listaUsuarios'));
      const listaFotos = $.parseJSON(localStorage.getItem('listaFotos'));
      
      // Loop through items
      $.each(listaAlbums.slice(startIndex, endIndex), function(i, album) {
        // Get random photo
        const fotoAleatoria = listaFotos[Math.floor(Math.random() * listaFotos.length)];
        
        // Find autor
        const autorAlbum = $.grep(listaUsuarios, function(usuario) {
          return usuario.id == album.userId;
        })[0];
        
        // Create card structure
        $('<div>', {
          class: 'group w-[300px] h-[300px] bg-transparent border border-[#f1f1f1] [perspective:1000px]'
        }).append(
          $('<div>', {
            class: 'relative w-full h-full text-center transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'
          }).append(
            // Front of card
            $('<div>', {
              class: 'absolute w-full h-full bg-[#bbbbbb] text-black [backface-visibility:hidden]'
            }).append(
              $('<img>', {
                class: 'w-[300px] h-[300px]',
                src: fotoAleatoria.url,
                alt: fotoAleatoria.id
              })
            ),
            // Back of card
            $('<div>', {
              class: 'absolute w-full h-full bg-[#1e90ff] text-white [transform:rotateY(180deg)] [backface-visibility:hidden]'
            }).append(
              $('<h1>').text(album.title),
              $('<p>').text("Autor: " + autorAlbum.name)
            )
          )
        ).appendTo('#sectionCards');
      });
      
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
  
  $(window).on('load', function() {
    if ($(document).height() < $(window).height()) {
      loadMoreItems();
    }
  });
  
  $(document).ready(function() {
    construirHTML(0, batchSize);
  });