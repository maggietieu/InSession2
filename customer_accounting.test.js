const Customer = require('./models/customer');
const Order = require('./models/order');
const {createCustomer, createOrder, getAllCustomers} = require('./customer_accounting');

describe("Adding a customer to database", () => {
    beforeEach(async () => {
        await Customer.deleteMany();
    });

    afterEach(async () => {
        await Customer.deleteMany();
    });

    // #mock, #spy, #stub
    it('calls createCustomer() function once with correct input', async () => {
        const createCustomer = jest.fn();
        var customerId = '123abc';
        var name = 'Bob';
        await createCustomer(customerId, name);
        expect(createCustomer.mock.calls.length).toBe(1);
        expect(createCustomer.mock.calls[0][0]).toBe(customerId);
        expect(createCustomer.mock.calls[0][1]).toBe(name);
    });

    // #stub
    it('creates a customer with new id', async () => {
        var customerId = '123abc';
        var name = 'Bob';
        var filter = {customerId : customerId, name : name};
        await createCustomer(customerId, name);
        expect(Customer.findOne(filter)).not.toBeNull();
    });

    // #stub
    it('does not recreate a customer with an existing id', async () => {
        var customerId = '123abc';
        var name = 'Bob';
        var filter = {customerId : customerId, name : name};
        for(var i = 0; i < 2; i++){
            await createCustomer(customerId, name);
        }
        Customer.find(filter).exec(function (err, results) {
            expect(results.length).toBe(1);
        });
    });

    // #stub
    it('initializes customer totalAmtPurchased to 0', async () => {
        var customerId = '123abc';
        var name = 'Bob';
        var filter = {customerId : customerId, name : name};
        await createCustomer(customerId, name);
        Customer.findOne(filter).exec(function (err, result) {
            expect(result.totalAmtPurchased).toBe(0);
        });
    });
});

describe("Adding an order to database", () => {
    beforeEach(async () => {
        await Customer.deleteMany();
        await Order.deleteMany();
    });

    afterEach(async () => {
        await Customer.deleteMany();
        await Order.deleteMany();
    });

    // #mock, #spy, #stub
    it('calls createOrder() function once with correct input', async () => {
        const createOrder = jest.fn();
        var customerId = '123abc';
        var amtPurchased = 2;
        await createOrder(customerId, amtPurchased);
        expect(createOrder.mock.calls.length).toBe(1);
        expect(createOrder.mock.calls[0][0]).toBe(customerId);
        expect(createOrder.mock.calls[0][1]).toBe(amtPurchased);
    });

    // #stub
    it('creates an order with existing customerId', async () => {
        var customerId = '123abc';
        var name = 'Bob';
        var amtPurchased = 2;
        var filter = {customerId : customerId, amtPurchased : amtPurchased};
        await createCustomer(customerId, name);
        await createOrder(customerId, amtPurchased);
        expect(Order.findOne(filter)).not.toBeNull();
    });

    // #stub
    it('does not recreate an order for customerId that does not exist', async () => {
        var customerId = '123abc';
        var amtPurchased = 2;
        var filter = {customerId : customerId, amtPurchased : amtPurchased};
        await createOrder(customerId, amtPurchased);
        Order.findOne(filter).exec(function (err, result) {
            expect(result).toBeNull();
        });
    });

    // #stub
    it('increments existing customer totalAmtPurchased by amtPurchased in the order', async () => {
        var customerId = '123abc';
        var name = 'Bob';
        var amtPurchased1 = 2;
        var amtPurchased2 = 5;
        var filter = {customerId : customerId};
        await createCustomer(customerId, name);
        await createOrder(customerId, amtPurchased1);
        await createOrder(customerId, amtPurchased2);
        await Customer.findOne(filter).exec(function (err, result) {
            expect(result.totalAmtPurchased).toBe(amtPurchased1 + amtPurchased2);
        });
    });   
});

describe("Retrieving all customers in the database", () => {
    beforeEach(async () => {
        await Customer.deleteMany();
    });

    afterEach(async () => {
        await Customer.deleteMany();
    });

    // #mock, #spy, #stub
    it('calls getAllCustomers() function once', async () => {
        const getAllCustomers = jest.fn();
        await getAllCustomers();
        expect(getAllCustomers.mock.calls.length).toBe(1);
    });

    it('returns array of size 0 when no customers exist yet', async () => {
        const result = await getAllCustomers();
        expect(result.length).toBe(0);
    });

    // #stub
    it('returns array of correct size when customers exist', async () => {
        var customerId = '123abc';
        var name = 'Bob';
        await createCustomer(customerId, name);
        const result = await getAllCustomers();
        expect(result.length).toBe(1);
    });
});