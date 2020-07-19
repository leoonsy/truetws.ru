//сокрытие меню при прокрутке вниз
import $ from "jquery";

let $menu = $('.menu'),
    scrollPrev = 0;

$(window).scroll(function() {
    let scrolled = $(window).scrollTop();

    if ( scrolled > 100 && scrolled > scrollPrev ) {
        $menu.addClass('out');
    } else {
        $menu.removeClass('out');
    }
    scrollPrev = scrolled;
});