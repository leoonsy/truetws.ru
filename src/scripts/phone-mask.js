//маска для телефона
import InputMask from "inputmask";

let selector = document.querySelectorAll('input[type=tel]');
let im = new InputMask('+7 (999) 999-99-99');
im.mask(selector);