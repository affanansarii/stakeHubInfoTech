// src/App.js
import React, { useEffect, useState } from 'react';
import OrderTable from './OrderTable';
import OrderForm from './OrderForm';
import axios from 'axios';
import './App.css';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchCompletedOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:5000/api/orders');
    setOrders(response.data);
  };

  const fetchCompletedOrders = async () => {
    const response = await axios.get('http://localhost:5000/api/completed-orders');
    setCompletedOrders(response.data);
  };

  // Function to refresh the pending orders
  const refreshOrders = async () => {
    await fetchOrders(); // Fetch the updated orders after adding a new one
  };

  return (
    <div>
      <h1>Order Matching System</h1>
      <OrderForm refreshOrders={refreshOrders} />
      <OrderTable orders={orders} completedOrders={completedOrders} />
    </div>
  );
};

export default App;
