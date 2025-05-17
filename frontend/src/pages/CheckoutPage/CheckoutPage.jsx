import axios from 'axios';
import './CheckoutPage.css';
import { useNavigate, NavLink } from 'react-router-dom';

const CheckoutPage = ({ cartItems, userId, address, totalAmount }) => {
  const navigate = useNavigate();

  const handleCODOrder = async () => {
    try {
      const response = await axios.post('/api/order/place', {
        userId,
        items: cartItems,
        amount: totalAmount,
        address,
      });

      if (response.data.success) {
        navigate(`/order-success?orderId=${response.data.orderId}`);
      } else {
        alert('There was an error placing your order.');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('There was a problem placing your order.');
    }
  };

  return (
    <div className="checkout-container">
      <div>
        <button onClick={handleCODOrder}>Place Order (Online Method)</button>
      </div>
      <div className="cashon">
        <NavLink to="/order-success">Place Order(Cash On Delivery)</NavLink>
      </div>
    </div>
  );
};

export default CheckoutPage;
