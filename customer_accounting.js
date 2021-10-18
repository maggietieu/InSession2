const mongoose = require('mongoose');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Database Info
// Name: MongoDB
// Port: 27017
// Version: 5.0
// Download link: https://docs.mongodb.com/guides/server/install/

mongoose.connect('mongodb://localhost/customerDB');

mongoose.connection.once('open', () => {
    console.log('Database connection successful...');
}).on('error', function(err){
    console.log('Database connection ERROR...');
});

async function createCustomer(_customerId, _name) {
    const filter = { customerId: _customerId };
    const existingCustomerWithGivenId = await Customer.findOne(filter);
    // If a customerId already exists, don't add it.
    if(existingCustomerWithGivenId != null) {
        //console.log("Customer already exists in database. Did not add duplicate.")
    } else {
        var customer = new Customer({
            customerId: _customerId,
            name: _name,
            totalAmtPurchased: 0
        });
        // Save the customer to collection
        await customer.save().then(() => {
           // console.log("Customer added? ", customer.isNew == false, "\n");
        });
    }
}

async function createOrder(_customerId, _amtPurchased) {
    // if(typeof _customerId != 'string' || typeof _amtPurchased != 'number') {
    //     throw new Exception('CustomerId and AmyPurchased must be string and number, respectively.');
    // }

    const filter = { customerId: _customerId };
    const existingCustomerWithGivenId = await Customer.findOne(filter);
    // If a customerId exists, the order can be placed.
    if(existingCustomerWithGivenId != null) {
        var order = new Order({
            customerId: _customerId,
            amtPurchased: _amtPurchased
        });
        // Increment customer's totalAmtPurchased by the order's amt
        const update = { totalAmtPurchased : existingCustomerWithGivenId.totalAmtPurchased + _amtPurchased };
        await Customer.findOneAndUpdate(filter, update);
        // Save the order to collection
        await order.save().then(() => {
           // console.log("Order added? ", order.isNew == false, "\n");
        });
    } else {
        //console.log("Customer with id", _customerId, "does not exist.");
    }
}

async function getAllCustomers() {
    const result = await Customer.find();
    return result || [];
}

module.exports = {
    createOrder,
    createCustomer,
    getAllCustomers
};