/* вариант прелоадера (с кругляшками) */
$(document).ready(function() {


  $(window).on('load',function() {
    setTimeout(function() {
      $('.preloader').addClass('preloader--faded');
    },1000);
    $('body').css('backgroundColor','#fff');
  });

  $('.loader').append('<span class="percentage">0%</span>');
  /* Процент в preloader считаем по прогрузившимся изображениям */
  var images              = document.images,
      imagesCount         = images.length,
      imagesCountLoaded   = 0,

      /* Переменные для кружочков */
      circlesCount        = 10,
      xRadius             = 50, /* радиус в процентах от родителя */
      stepAngle           = 2 * Math.PI / circlesCount,
      animationDuration   = 1.2,
      circleArr, xTop, xLeft, xAngle, imagesSrc = [];

  /* Рисуем кружочки вокруг процента загрузки */
  for (var i = 0; i < circlesCount; i++) {

    $('.loader').append('<span class="loader__circle"></span>');
    xAngle = i * stepAngle;
    xTop = 50 + xRadius * Math.cos(xAngle) + '%';
    xLeft = 50 + xRadius * Math.sin(xAngle) + '%';

    $($('.loader__circle')[i]).css({
      top: xTop,
      left: xLeft,
      animationDuration: animationDuration + 's',
      animationDelay: (-animationDuration + animationDuration / circlesCount * (i + 1)) + 's'
    });
  }

  for (var i = 0; i < imagesCount; i++) {
    imagesSrc.push(images[i].src);
  }

  getBgImages();
  function getBgImages() {
    var allBg = $('section, header, main, footer, div').each(function() {
        var url = '';
        var urlArr = [];

        if ($(this).css('background-image') != 'none') {
            var url = $(this).css('background-image');
        }

        if (url.length > 0) {
          urlArr = url.split(',');
          for (var i = 0; i < urlArr.length; i++) {
            urlArr[i] = urlArr[i].replace("url(\"", "");
            urlArr[i] = urlArr[i].replace("url(", "");
            urlArr[i] = urlArr[i].replace("\")", "");
            urlArr[i] = urlArr[i].replace(")", "");
            imagesSrc.push(urlArr[i]);
            imagesCount++;
          }
        }
    });
}

  /* Считаем процент загрузки */
  for (var i = 0; i < imagesCount; i++) {
    var imageClone = new Image();
    imageClone.onload  = imageLoaded;
    imageClone.onerror = imageLoaded;
    imageClone.src     = imagesSrc[i];
  }

  function imageLoaded() {
    imagesCountLoaded++;
    $('.percentage')[0].innerHTML = ( ((100 / imagesCount) * imagesCountLoaded) << 0) + '%';
  }

});
