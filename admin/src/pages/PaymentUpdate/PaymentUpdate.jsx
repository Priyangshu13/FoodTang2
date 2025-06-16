import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../assets/assets";
import { toast } from "react-toastify";
import "./PaymentUpdate.css";

const PaymentUpdate = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order`);
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Fetch orders failed", err);
    }
  };

  const handleUpdatePayment = async (orderId, currentStatus) => {
    try {
      const res = await axios.put(`${url}/api/order/update-payment/${orderId}`, {
        paymentDone: !currentStatus,
      });
      if (res.data.success) {
        toast.success("Payment status updated");
        fetchOrders();
      }
    } catch (err) {
      console.error("Payment update failed", err);
      toast.error("Failed to update payment");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="payment-update">
      <h2>Payment Updation</h2>
      {orders.length === 0 ? (
        <p className="error">No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order?.userId?.name || "Unknown"}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
                <td>{order.paymentDone ? "Done" : "Pending"}</td>
                <td>
                  <button
                    className={order.paymentDone ? "btn-paid" : "btn-pending"}
                    onClick={() => handleUpdatePayment(order._id, order.paymentDone)}
                  >
                    {order.paymentDone ? "Mark Pending" : "Mark Paid"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentUpdate;
