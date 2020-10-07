import $ from 'jquery';

class Order {
  constructor(name, phone, hdn) {
    this.name = name;
    this.phone = phone;
    this.hdn = hdn;
  }

  async sendOrder() {
    const { name, phone, hdn } = this;
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
}

export default Order;
