// src/components/CheckoutPayment.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list = [], cartItems = {}, url } = useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    const address = {
      street: "123 Main St",
      city: "Sample City",
      postalCode: "123456",
      country: "India"
    };

    const orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + 2,
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
        alert(`Order placed successfully! Order ID: ${response.data.orderId}`);
        navigate('/my-orders');
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={placeOrder}>
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
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPayment;