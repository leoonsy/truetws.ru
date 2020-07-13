import $ from 'jquery';
import 'jquery.maskedinput/src/jquery.maskedinput';
import WOW from 'wow.js/dist/wow.min';

$(".header__mobile-number").mask("+7(999)999-99-99");
$(() => {
    new WOW({
        animateClass: "animate__animated"
    }).init();
});
