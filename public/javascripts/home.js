$(function() {
  var slider = $('#slider');
  var slideContainer = $('#slide-container');
  var slideWidth = slideContainer.children().first().width();
  var slideCount = slideContainer.children().length;
  var carouselWidth = slideCount * slideWidth;
  var leftMargin = 0;
  var slideIndex = 1;

  slider.css({
    width: slideWidth
  });

  slideContainer.css({
    width: carouselWidth
  });

  setInterval(function() {
    if (slideIndex < slideCount) {
      leftMargin = -(slideWidth * slideIndex);
      slideIndex++;
    } else {
      leftMargin = 0;
      slideIndex = 1;
    }

    slideContainer.animate({
      marginLeft: leftMargin
    }, 500);
  }, 3000);
});