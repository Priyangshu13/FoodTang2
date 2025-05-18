import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, description, price, image }) => {
  const { url, cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const itemCount = cartItems[id] || 0;

  return (
    <div className="food-item">
      <img
        src={`${url}/images/${image}`}
        alt={name}
        className="food-item-image"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150";
        }}
      />
      <div className="food-item-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="food-item-price">₹{price.toFixed(2)}</p>

        {itemCount === 0 ? (
          <button className="add-to-cart-btn" onClick={() => addToCart(id)}>
            Add to Cart
          </button>
        ) : (
          <div className="quantity-control">
            <button onClick={() => removeFromCart(id)}>-</button>
            <span>{itemCount}</span>
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
