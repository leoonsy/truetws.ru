// Подсветка меню при прокрутке

// Получить расстояние от верха страницы до элемента
const offsetTopFull = ( el ) => window.pageYOffset + el.getBoundingClientRect().top;

let menuLinks = document.querySelectorAll('.menu__elem a');

let prevActiveLink = null;
window.addEventListener('scroll', () => {
    let scrolledTop = window.pageYOffset;

    menuLinks.forEach(link => {
       const sectionId = link.getAttribute('href').match(/#(.*)$/)[1];
       if (sectionId) {
           const section = document.getElementById(sectionId);
           const sectionOffsetTop = offsetTopFull(section);
           if (sectionOffsetTop <= scrolledTop + 1) {
               if (prevActiveLink)
                   prevActiveLink.parentElement.classList.remove('active');
               link.parentElement.classList.add('active');

               prevActiveLink = link;
           }
       }
    });

});