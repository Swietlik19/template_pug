//= ../node_modules/jquery/dist/jquery.min.js
//= preloader.js


$(document).ready(function() {

  /* Плавный переход к якорю */
  $(function(){
    $('a[href^="#"]').click(function(){
      var _href = $(this).attr('href');
      $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
      return false;
    });
  });

});
