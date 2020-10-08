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
      url: API_URL + '/buy.php',
      dataType: 'json',
      type: 'POST',
      data,
    });
  }

  static async getPrices() {
    return $.ajax({
      url: API_URL + '/price.php',
      type: 'GET',
    });
  }

  static async login(password: string) {
    const data = {
      password,
    };
    const hashedPassword = await $.ajax({
      url: API_URL + '/login.php',
      type: 'POST',
      data,
    });
    localStorage.setItem('hashedPassword', hashedPassword.data);
  }

  static getHashedPassword() {
    return localStorage.getItem('hashedPassword');
  }

  static async savePrices(
    oldPrice: number | string,
    newPrice: number | string
  ) {
    const data = {
      oldPrice,
      newPrice,
      hashedPassword: Api.getHashedPassword(),
    };

    return $.ajax({
      url: API_URL + '/price.php',
      type: 'POST',
      data,
    });
  }

  static async isAuth() {
    if (!Api.getHashedPassword()) return false;

    try {
      const data = {
        hashedPassword: localStorage.getItem('hashedPassword'),
      };
      await $.ajax({
        url: API_URL + '/auth.php',
        type: 'POST',
        data,
      });
      return true;
    } catch {
      return false;
    }
  }

  static logout() {
    localStorage.removeItem('hashedPassword');
  }
}

export default Api;
