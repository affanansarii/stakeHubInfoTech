// src/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ refreshOrders }) => {
    const [buyerQty, setBuyerQty] = useState('');
    const [buyerPrice, setBuyerPrice] = useState('');
    const [sellerPrice, setSellerPrice] = useState('');
    const [sellerQty, setSellerQty] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOrder = { buyerQty: Number(buyerQty), buyerPrice: Number(buyerPrice), sellerPrice: Number(sellerPrice), sellerQty: Number(sellerQty) };
        await axios.post('http://localhost:5000/api/orders', newOrder);
        refreshOrders(); // Refresh the pending orders
        // Reset form
        setBuyerQty('');
        setBuyerPrice('');
        setSellerPrice('');
        setSellerQty('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={buyerQty} onChange={(e) => setBuyerQty(e.target.value)} placeholder="Buyer Qty" required />
            <input type="number" value={buyerPrice} onChange={(e) => setBuyerPrice(e.target.value)} placeholder="Buyer Price" required />
            <input type="number" value={sellerPrice} onChange={(e) => setSellerPrice(e.target.value)} placeholder="Seller Price" required />
            <input type="number" value={sellerQty} onChange={(e) => setSellerQty(e.target.value)} placeholder="Seller Qty" required />
            <button type="submit">Add Order</button>
        </form>
    );
};

export default OrderForm;
