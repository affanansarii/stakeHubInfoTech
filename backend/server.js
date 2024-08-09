// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/orderMatching', { useNewUrlParser: true, useUnifiedTopology: true });

const orderSchema = new mongoose.Schema({
    buyerQty: Number,
    buyerPrice: Number,
    sellerPrice: Number,
    sellerQty: Number,
});

const completedOrderSchema = new mongoose.Schema({
    price: Number,
    qty: Number,
});

const Order = mongoose.model('Order', orderSchema);
const CompletedOrder = mongoose.model('CompletedOrder', completedOrderSchema);

app.use(cors());
app.use(bodyParser.json());

// Get Pending Orders
app.get('/api/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

// Get Completed Orders
app.get('/api/completed-orders', async (req, res) => {
    const completedOrders = await CompletedOrder.find();
    res.json(completedOrders);
});

// Create a new order
app.post('/api/orders', async (req, res) => {
    const { buyerQty, buyerPrice, sellerPrice, sellerQty } = req.body;
    const newOrder = new Order({ buyerQty, buyerPrice, sellerPrice, sellerQty });
    await newOrder.save();
    matchOrders();
    res.json(newOrder);
});

// Order matching logic
const matchOrders = async () => {
    const pendingOrders = await Order.find();
    for (let order of pendingOrders) {
        if (order.buyerPrice >= order.sellerPrice) {
            const matchedQty = Math.min(order.buyerQty, order.sellerQty);
            await CompletedOrder.create({ price: order.sellerPrice, qty: matchedQty });
            await Order.deleteOne({ _id: order._id });
            // Update remaining quantities
            order.buyerQty -= matchedQty;
            order.sellerQty -= matchedQty;
            if (order.buyerQty > 0) await order.save();
        }
    }
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
