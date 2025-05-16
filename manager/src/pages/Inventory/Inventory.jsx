// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Inventory.css';

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/inventory');
      if (Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        console.error('API response is not an array:', res.data);
        setItems([]);
      }
    } catch (error) {
      console.error('Failed to load inventory:', error.response?.data || error.message);
      setItems([]);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/inventory/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>

      {items.length > 0 ? (
        <table className="inventory-table">
          <thead>
            <tr>
              <th className='name'>Name</th>
              <th className='qty'>Qty</th>
              <th className='unit'>Unit</th>
              <th className='cost'>Cost</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.cost}</td>
                <td>
                  <button onClick={() => deleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-items">No inventory items available.</p>
      )}
    </div>
  );
};

export default Inventory;
