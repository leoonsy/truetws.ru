//сокрытие меню при прокрутке вниз
const $menu = document.querySelector('.menu')!;
let scrollPrev = 0;

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  if (scrolled > 100 && scrolled > scrollPrev) {
    $menu.classList.add('out');
  } else {
    $menu.classList.remove('out');
  }

  scrollPrev = scrolled;
});
