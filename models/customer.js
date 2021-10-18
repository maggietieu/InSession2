const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customerId: String,
    name: String,
    totalAmtPurchased: Number
});

// Collection that is based on customerSchema
const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;