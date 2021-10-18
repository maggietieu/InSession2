const { MongoClient } = require('mongodb');

async function main(){
    const uri = "mongodb+srv://admin:admin123@cluster0.fr3ga.mongodb.net/InSession2?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try{
        await client.connect();
        await createCustomer(client, {
            customerId: "123",
            name: "Bob",
            totalAmtPurchased: 0
        });
        await createOrder(client, {
            customerId: "456",
            amtPurchased: 1
        });
        await retrieveAllCustomers(client);
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

async function createCustomer(client, newCustomer){
    const result = await client.db("CustomerAccounting").collection("Customer").insertOne(newCustomer);
    console.log("New Customer created with id: ", result.insertedId);
}

async function createOrder(client, id, amtPurchased){
    const customerExists = await client.db("CustomerAccounting").collection("Order").findOne({customerId: id});
    const result = 0;
    if(customerExists){
        result = await client.db("CustomerAccounting").collection("Order").insertOne(newOrder);
        // ALSO UPDATE TOTAL AMT PURCHASED
    }
    else{
        // customer cannot order if they don't exist???? maybe create if they dont exts, but review specs
    }
    console.log("New Order created with id: ", result.insertedId);
}

async function retrieveAllCustomers(client){
    const result = await client.db("CustomerAccounting").collection("Customer").find().toArray();
    console.log(JSON.stringify(result));
}

main();