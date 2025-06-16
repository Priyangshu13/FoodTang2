// src/components/MyOrders.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';

const MyOrders = () => {
  const { token, url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/order/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setOrders([]);
      }
    };

    if (token) fetchOrders();
  }, [token, url]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Amount:</strong> ₹{order.amount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p>
  <strong>Date:</strong>{" "}
  {order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "Not Available"}
</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;