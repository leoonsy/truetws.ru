import Api from './api';
const $oldPrice = document.querySelector('.price__number-old');
const $newPrice = document.querySelector('.price__number-new');
Api.getPrices().then((data) => {
  $oldPrice!.innerHTML = data.data.oldPrice;
  $newPrice!.innerHTML = data.data.newPrice;
});
