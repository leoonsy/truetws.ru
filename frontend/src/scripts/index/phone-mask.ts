//маска для телефона
import InputMask from 'inputmask';

const $selector = document.querySelectorAll('input[type=tel]');
const im = new InputMask('+7 (999) 999-99-99');
im.mask($selector as any);
