const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerId: String,
    amtPurchased: Number
});

// Collection that is based on customerSchema
const Orders = mongoose.model('orders', OrderSchema);

module.exports = Orders;