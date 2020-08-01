import $ from 'jquery';

const BUY_API_URL = '/api/buy.php';

class Order {
    constructor(name, phone, price, hdn) {
        this.name = name;
        this.phone = phone;
        this.price = price;
        this.hdn = hdn;
    }

    async sendOrder() {
        const {name, phone, price, hdn} = this;
        const data = {
            name,
            phone,
            price,
            hdn
        };

        return new Promise((resolve, reject) => {
            $.ajax({
                url: BUY_API_URL,
                dataType: 'json',
                type: 'POST',
                data
            }).then((data) => {
                resolve(data);
            }).catch(xhr => {
                const response = JSON.parse(xhr.responseText);
                reject({
                    ...JSON.parse(xhr.responseText),
                    httpCode: xhr.status
                });
            })
        });
    }
}

export default Order;