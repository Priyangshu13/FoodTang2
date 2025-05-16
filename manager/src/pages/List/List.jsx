// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // For prop type validation
import "./List.css";
import axios from "axios";

const List = ({ url = "http://localhost:4000" }) => { // Provide a default URL
  const [list, setList] = useState([]);
  const [error, setError] = useState(null); // State to store error messages
  const [notification, setNotification] = useState(""); // State to store notifications

  // Fetch the list of food items
  const fetchlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        setError(null); // Clear any previous errors
      } else {
        setError(response.data.message || "Failed to fetch the list.");
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching the list.");
    }
  };

  // Remove a food item by ID
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        setNotification("Item removed successfully!"); // Set success notification
        fetchlist(); // Refresh the list
      } else {
        setNotification(response.data.message || "Failed to remove item.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setNotification("An error occurred while removing the item.");
    } finally {
      // Clear the notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Fetch the list when the component mounts
  useEffect(() => {
    fetchlist();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      {/* Display error messages */}
      {error && <p className="error-message">Error: {error}</p>}
      {/* Display notifications */}
      {notification && <p className="notification-message">{notification}</p>}
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <button
                onClick={() => removeFood(item._id)}
                className="toggle-button"
                title="Remove this item"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No food items available.</p>
        )}
      </div>
    </div>
  );
};

// Prop type validation for the `url` prop
List.propTypes = {
  url: PropTypes.string,
};

export default List;
