import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentUpdation = ({ token, url }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/all-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error('Fetch orders error:', err);
    }
  };

  // ✅ FIXED: Send correct field "paymentStatus" instead of "paymentDone"
  const handleUpdate = async (id, isPaid) => {
    try {
      await axios.put(`${url}/api/order/${id}/payment`, {
        paymentStatus: isPaid ? 'Paid' : 'Unpaid'
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Payment status updated");
      fetchOrders(); // refresh the list after update
    } catch (err) {
      console.error('Update error:', err);
      alert("Failed to update payment status");
    }
  };

  return (
    <div>
      <h2>Admin - Payment Update</h2>
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 10 }}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Amount:</strong> ${order.amount}</p>
          <p><strong>Method:</strong> {order.paymentMethod}</p>
          <p><strong>Status:</strong> {order.paymentStatus}</p>

          <button
            onClick={() => handleUpdate(order._id, true)}
            disabled={order.paymentStatus === 'Paid'}
            style={{ marginRight: 8 }}
          >
            Mark as Paid
          </button>
          <button
            onClick={() => handleUpdate(order._id, false)}
            disabled={order.paymentStatus === 'Unpaid'}
          >
            Mark as Unpaid
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaymentUpdation;
