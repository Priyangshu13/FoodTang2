// components/CheckoutPayment.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const {
    getTotalCartAmount,
    token,
    food_list = [],
    cartItems = {},
    url
  } = useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartItems[item._id] }));

    const address = {
      street: "123 Main St",
      city: "CityName",
      postalCode: "12345",
      country: "CountryName"
    };

    const orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Assumes 2 is delivery fee or similar
      paymentMethod,
      address,
    };

    try {
      const response = await axios.post(`${url}/api/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert(`Order placed successfully! Your order ID is: ${response.data.orderId}`);
        navigate("/confirm-payment");
      } else {
        alert("Error placing order");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        console.error("Order error:", err);
        alert("Failed to place order.");
      }
    }
  };

  return (
    <div>
      <h2>Checkout Payment</h2>
      <form onSubmit={placeOrder}>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            Cash on Delivery
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={() => setPaymentMethod('online')}
            />
            Online Payment
          </label>
        </div>
        <button type="submit">Proceed to Pay</button>
      </form>
    </div>
  );
};

export default CheckoutPayment;
