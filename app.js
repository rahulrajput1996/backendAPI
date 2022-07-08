const express = require("express");
const app = express();;
const mongoose = require("mongoose");
const port = 27017;
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

app.use(express.urlencoded());
app.use(express.json());

main().catch(err => console.log(err));
async function main() {
    console.log("connected")
    await mongoose.connect('mongodb://localhost:27017/customer');
}

// question 1 api
const kittySchema = new mongoose.Schema({
    CustomerName: String,
    Email: String,
    MobileNumber: Number,
    City: String,
    CustomerId: { type: ObjectIdSchema, default: new ObjectId() }
});

const customers = mongoose.model("customers", kittySchema);

app.post("/customer", (req, res) => {
    // console.log(req.body);
    var mydata = new customers(req.body);

    mydata.save().then(() => {
        res.status(200).send("send data")
    }).catch(() => {
        res.status(200).send("data not send")

    })
})

// question 2 api
const kittySchema2 = new mongoose.Schema({
    ProductName: String,
    Quantity: Number,
    Pricing: Number,
    MRP: { type: Number, min: this.Pricing },
    PurchaseorderID: { type: ObjectIdSchema, default: new ObjectId() },
    CustomerId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customers' }]
});

const purchase = mongoose.model("purchase", kittySchema2);

app.post("/purchase", (req, res) => {
    console.log(req.body);
    var mydata = new purchase(req.body);

    mydata.save().then(() => {
        res.status(200).send("send data")
    }).catch(() => {
        res.status(200).send("data not send")

    })
})

// question 3 api
const kittySchema3 = new mongoose.Schema({
    Address: String,
    City: String,
    Pincode: Number,
    PurchaseorderID: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'purchase' }],
    CustomerId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customers' }]
});

const shipping = mongoose.model("shipping", kittySchema3);

app.post("/shipping", (req, res) => {
    console.log(req.body);
    var mydata = new shipping(req.body);

    mydata.save().then(() => {
        res.status(200).send("send data")
    }).catch(() => {
        res.status(200).send("data not send")

    })
})

app.get("/", (req, res) => {
    res.status(200).send("this is home page")
})

app.listen(port, () => {
    console.log(`request is listen at ${port}`);
})