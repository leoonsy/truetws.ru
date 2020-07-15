import $ from 'jquery';
import 'jquery.maskedinput/src/jquery.maskedinput';
import WOW from 'wow.js/dist/wow.min';

$(".header__mobile-number").mask("+7(999)999-99-99");
$(() => {
    new WOW({
        animateClass: "animate__animated"
    }).init();

    let menu = $('.menu'),
        scrollPrev = 0;

    $(window).scroll(function() {
        let scrolled = $(window).scrollTop();

        if ( scrolled > 100 && scrolled > scrollPrev ) {
            menu.addClass('out');
        } else {
            menu.removeClass('out');
        }
        scrollPrev = scrolled;
    });
});
