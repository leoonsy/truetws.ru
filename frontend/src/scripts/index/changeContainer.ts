//изменяет .container на .container-fluid у контейнеров с data-change-container-size (минимальной шириной)
//да, можно было воспользоваться чистым css с media-запросами вместо этого скрипта...
const $containers = document.querySelectorAll(
  '.container[data-change-container-size]'
) as NodeListOf<HTMLElement>;

function changeContainer() {
  const clientWidth = document.documentElement.clientWidth;
  $containers.forEach(($container) => {
    const changeContainerSize = Number($container.dataset.changeContainerSize);
    if (clientWidth <= changeContainerSize) {
      $container.classList.add('container-fluid');
      $container.classList.remove('container');
    } else {
      $container.classList.add('container');
      $container.classList.remove('container-fluid');
    }
  });
}

window.onresize = changeContainer;
changeContainer();
