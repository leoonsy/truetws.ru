import $ from 'jquery';

class Api {
  static async sendOrder(name, phone, hdn) {
    const data = {
      name,
      phone,
      hdn,
    };

    return $.ajax({
      // eslint-disable-next-line no-undef
      url: API_URL + '/buy.php',
      dataType: 'json',
      type: 'POST',
      data,
    });
  }

  static async getPrices() {
    return $.ajax({
      // eslint-disable-next-line no-undef
      url: API_URL + '/price.php',
      type: 'GET',
    });
  }
}

export default Api;
