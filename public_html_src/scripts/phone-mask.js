//маска для телефона
import $ from "jquery";
import 'jquery.maskedinput/src/jquery.maskedinput';

$(".header__mobile-number").mask("+7(999)999-99-99", { autoclear: false });
$(".buy-form__phone").mask("+7(999)999-99-99", { autoclear: false });
$(".end-form__phone").mask("+7(999)999-99-99", { autoclear: false });
$(".modal-form__phone").mask("+7(999)999-99-99", { autoclear: false });