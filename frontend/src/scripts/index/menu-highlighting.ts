// Подсветка меню при прокрутке

// Получить расстояние от верха страницы до элемента
const offsetTopFull = ($el: Element) =>
  window.pageYOffset + $el.getBoundingClientRect().top;
const $menuLinks = document.querySelectorAll('.menu__elem a');

let $prevActiveLink: Element | null = null;
window.addEventListener('scroll', () => {
  const scrolledTop = window.pageYOffset;

  $menuLinks.forEach((link) => {
    const sectionId = link.getAttribute('href')!.match(/#(.*)$/)![1];
    const $section = document.getElementById(sectionId)!;
    const sectionOffsetTop = offsetTopFull($section);
    if (sectionOffsetTop <= scrolledTop + 1) {
      if ($prevActiveLink)
        $prevActiveLink.parentElement?.classList.remove('active');
      link.parentElement?.classList.add('active');

      $prevActiveLink = link;
    }
  });
});
