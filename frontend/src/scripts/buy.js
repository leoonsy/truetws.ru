import Order from './api';
import MicroModal from 'micromodal';
import ym from 'ym';

function changeSubmitButtonsState(isAllowed = true) {
  const submitButtons = document.querySelectorAll('input[type=submit]');
  submitButtons.forEach((form) => {
    if (isAllowed) {
      form.removeAttribute('disabled');
      form.classList.remove('disabled');
    } else {
      form.setAttribute('disabled', 'disabled');
      form.classList.add('disabled');
    }
  });
}

const buyForms = [
  document.querySelector('.header__form'),
  document.querySelector('.modal-form'),
  document.querySelector('.buy-form__form'),
  document.querySelector('.end-form'),
];

buyForms.forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    changeSubmitButtonsState(false);

    const data = {
      name: form.name.value,
      phone: form.phone.value,
      hdn: form.hdn.value,
    };

    const modalTitle = document.querySelector('#modal-message-title');
    const modalContent = document.querySelector('#modal-message-content');
    try {
      await Order.sendOrder(data.name, data.phone, data.hdn);
      //ym(66123454, 'reachGoal', 'buy');

      modalTitle.innerHTML = 'Спасибо за заказ!';
      modalTitle.classList.remove('text-danger');

      modalContent.innerHTML =
        'Ваш заказ принят! В ближайшее время с Вами свяжется менеджер для уточнения заказа!';
    } catch (err) {
      let message;
      switch (err.responseJSON?.type) {
        case 'validationError':
          message =
            'Указаны неверные данные. ' + err.responseJSON.errors.join(' ');
          break;
        case 'mailError':
          message = 'Ошибка при отправке письма. ' + err.responseJSON.message;
          break;
        default:
          message = 'Произошла неизвестная ошибка';
          break;
      }

      modalTitle.innerHTML = 'Ошибка!';
      modalTitle.classList.add('text-danger');

      modalContent.innerHTML = message;
    }

    changeSubmitButtonsState(true);

    MicroModal.show('modal-message', {
      onClose: () => {
        if (form.className === 'modal-form') MicroModal.show('modal-buy');
      },
    });
  });
});
