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
      />
      <div className="food-item-info">
        <h3 className="food-item-title">{name}</h3>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price.toFixed(2)}</p>

        {itemCount === 0 ? (
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(id)}
            title="Add this item to cart"
          >
            Add to Cart
          </button>
        ) : (
          <div className="quantity-control">
            <button
              className="qty-btn"
              onClick={() => removeFromCart(id)}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="item-count">{itemCount}</span>
            <button
              className="qty-btn"
              onClick={() => addToCart(id)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
