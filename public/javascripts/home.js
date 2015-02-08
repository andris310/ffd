var slider;
var slides;
var container;
var slideWidth;
var slideCount;
var carouselWidth;
var slideContainer;

$(function() {
  var leftMargin = 0;
  var slideIndex = 1;

  slider = $('#slider');
  container = $('#container');
  slideWidth = container.width();
  slides = $('#slide-container li');
  slideContainer = $('#slide-container');
  slideCount = slideContainer.children().length;
  carouselWidth = slideCount * slideWidth;

  $( window ).resize(function() {
    calculateSliderWidth();
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
  }, 4000);

  calculateSliderWidth();
});

function calculateSliderWidth() {
  slideWidth = container.width();
  carouselWidth = slideCount * slideWidth;
  console.log('slideWidth: ', slideWidth);
  console.log('carouselWidht:', carouselWidth);

  slider.css({
    width: slideWidth
  });

  slideContainer.css({
    width: carouselWidth
  });

  slides.css({
    width: slideWidth
  });
}