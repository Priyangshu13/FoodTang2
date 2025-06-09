import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'; // ✅ make sure this path is correct
import axios from 'axios';

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list = [], cartItems = {}, url } = useContext(StoreContext);

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online'

  const placeOrder = async (e) => {
    e.preventDefault();

    // Build order items with quantities
    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartItems[item._id] }));

    // For demonstration, adding a dummy address object, replace with real data as needed
    const address = {
      street: "123 Main St",
      city: "CityName",
      postalCode: "12345",
      country: "CountryName"
    };

    const orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Add delivery charge
      paymentMethod,
      address,           // required by backend
    };

    console.log("Sending token to backend:", token);
    console.log("Order Data:", orderData);

    try {
      const response = await axios.post(`${url}/api/order`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        alert(`Order placed successfully! Your order ID is: ${response.data.orderId}`);
        navigate("/confirm-payment");
      } else {
        alert("Error placing order");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to place order.");
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
            Online Payment (Placeholder)
          </label>
        </div>
        <button type="submit">Proceed to Pay</button>
      </form>
    </div>
  );
};

export default CheckoutPayment;
