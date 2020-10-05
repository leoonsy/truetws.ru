//сокрытие меню при прокрутке вниз
let menu = document.querySelector('.menu'),
  scrollPrev = 0;

window.addEventListener('scroll', () => {
  let scrolled = window.pageYOffset;

  if (scrolled > 100 && scrolled > scrollPrev) {
    menu.classList.add('out');
  } else {
    menu.classList.remove('out');
  }
  scrollPrev = scrolled;
});
