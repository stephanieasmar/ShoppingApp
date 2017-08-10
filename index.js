const db = require('./db');

class Customer {
    constructor(name, email, addr, password) {
        this.name = name;
        this.email = email;
        this.address = addr;
        this.password = password;
    }
    save() {
        return db.one(`
        insert into customers
        (name, email, address, password)
        values
        ('${this.name}', '${this.email}', '${this.address}', '${this.password}')
        returning customer_id;
        `);
    }
    static get(id) {
        return db.one(`
            select customer_id, name, email, address from customers where customer_id=${id};
        `).then((result) => {
            let c = new Customer();
            c.customer_id =result.customer_id;
            c.name = result.name;
            c.email = result.email;
            c.address = result.address;
            return c;
        })
    }
}

module.exports = Customer;