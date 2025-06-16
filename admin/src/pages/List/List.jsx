// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./List.css";

const List = ({ url = "http://localhost:4000" }) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");

  const fetchList = async () => {
    try {
      const { data } = await axios.get(`${url}/api/food/list`);
      if (data.success) {
        setList(data.data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch the list.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching the list.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const { data } = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (data.success) {
        setNotification("✅ Item removed successfully!");
        fetchList();
      } else {
        setNotification(`⚠️ ${data.message || "Failed to remove item."}`);
      }
    } catch {
      setNotification("❌ An error occurred while removing the item.");
    } finally {
      setTimeout(() => setNotification(""), 3000);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list add flex-col">
      <h2>🍽 All Food Items</h2>

      {error && <div className="error-message">🚫 {error}</div>}
      {notification && <div className="notification-message">{notification}</div>}

      <div className="list-table">
        <div className="list-table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {list.length > 0 ? (
          list.map((item) => (
            <div key={item._id} className="list-table-row">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="food-image"
              />
              <span>{item.name}</span>
              <span>{item.category}</span>
              <span>₹{item.price}</span>
              <button
                className="remove-button"
                onClick={() => removeFood(item._id)}
                title="Remove this item"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="no-items">🥲 No food items available.</div>
        )}
      </div>
    </div>
  );
};

List.propTypes = {
  url: PropTypes.string,
};

export default List;
