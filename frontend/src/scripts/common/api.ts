import $ from 'jquery';
declare const API_URL: string;

class Api {
  static async sendOrder(name: string, phone: string, hdn: string) {
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
