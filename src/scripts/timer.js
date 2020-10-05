import moment from 'moment/min/moment.min';

const timer = document.querySelector('.buy-1__discount-time');
if (timer) {
  const discountDuration = 3; //длительность акции в днях
  const currentDateMoscow = moment().utc().add(3, 'h');
  const currentDay = currentDateMoscow.format('DD');
  const addDay = discountDuration - (currentDay % discountDuration);
  const resultDay = currentDateMoscow
    .add(addDay, 'days')
    .format('DD.MM.YYYY 00:00:00');
  timer.textContent = resultDay;
}
