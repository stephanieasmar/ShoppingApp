const expect = require('chai').expect;
const Customer = require('../index');

describe('Customers', () => {
    it('should be able to save to the database', (done) => {
        
        let myCustomer = new Customer('me', 'me@me.com', '123 me street', 'm3m3m3');
        myCustomer
            .save()
            .then((result) => {

                done();
            });      
    });
    it('should be able to get a customer from the database', (done) => {
        let myCustomer = new Customer();
        Customer
            .get(1)
            .then((myCustomer) => {
                done();
            });
    });
    it('should save, provide an ID, and then get via ID', (done) => {
        let data = ['Ronald McDonald', 'rm@mcds.com', 'everywhere', 'yum'];
        let c1 = new Customer(...data);
        c1.save()
            .then((result) => {
                let customer_id = result.customer_id;
                Customer.get(customer_id)
                    .then((c2) => {
                        expect(c2.name).to.equal(data[0]);
                        expect(c2.email).to.equal(data[1]);
                        expect(c2.address).to.equal(data[2]);

                        done();
                    }).catch(console.log);
            })
    });
    it('should have a customer_id when we retrieve from db', (done) => {
        let data = ['Ronald McDonald', 'rm@mcds.com', 'everywhere', 'yum'];
        let newName = 'oakley';
        let c1 = new Customer(...data);
        c1.save()
            .then((resultFromSave1) => {
                c1.customer_id = resultFromSave1.customer_id
                c1.name = newName;
                c1.save()
                    .then((resultFromSave2) => {

                        let customer_id = resultFromSave1.customer_id;
                        Customer.get(customer_id)
                            .then((c2) => {
                                expect(c2.name).to.equal(newName);

                                done();
                            })
                            .catch(console.log);
                    }).catch(console.log);
                    
            }).catch(console.log);
    });
});