//карусель (слайдер)
import $ from 'jquery';
import 'slick-carousel/slick/slick';

($('.gift__slider') as any).slick({
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 2,
  arrows: true,
  dots: true,
  dotsClass: 'gift__dots',
  prevArrow: '<div class="gift__arrow prev"></div>',
  nextArrow: '<div class="gift__arrow next"></div>',
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
