import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // ✅ Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      // ✅ Log to check structure of response
      console.log("Order response:", response);

      const orders = response.data?.data || []; // Adjust based on real structure
      setData(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // ✅ Runs when token is available
  useEffect(() => {
    console.log("Token in useEffect:", token); // Debugging token
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p className="order-items">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p><strong>Total:</strong> ${order.amount}.00</p>
              <p><strong>Items:</strong> {order.items.length}</p>
              <p className="order-status">
                <span className={`status-dot ${order.status.toLowerCase()}`}>●</span>
                <b>{order.status}</b>
              </p>
              <button className="track-btn">Track Order</button>
            </div>
          ))
        ) : (
          <p className="no-orders">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
