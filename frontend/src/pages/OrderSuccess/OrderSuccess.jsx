import { useSearchParams, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("orderId");

  //  useEffect(() => {
  //  if (!orderId) {
  // Redirect if orderId is missing
  // navigate('/');
  // }
  // }, [orderId, navigate]);

  return (
    <div className="order-page-wrapper">
      <div className="order-success-container">
        <div className="success-icon">
          <img src={assets.success} alt=" " />
        </div>
        <h2>Thank you for your purchase!</h2>
        <p>Your order has been placed successfully.</p>
        <div className="order-details">
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Payment Method:</strong> Cash on Delivery
          </p>
        </div>
        <button onClick={() => navigate("/")} className="home-button">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
