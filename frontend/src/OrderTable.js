// src/OrderTable.js
import React from 'react';

const OrderTable = ({ orders, completedOrders }) => {
    return (
        <div>
            <h2>Pending Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Buyer Qty</th>
                        <th>Buyer Price</th>
                        <th>Seller Price</th>
                        <th>Seller Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.buyerQty}</td>
                            <td>{order.buyerPrice}</td>
                            <td>{order.sellerPrice}</td>
                            <td>{order.sellerQty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Completed Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {completedOrders.map((completed, index) => (
                        <tr key={index}>
                            <td>{completed.price}</td>
                            <td>{completed.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
