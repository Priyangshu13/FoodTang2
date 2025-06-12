
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddInventory.css';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [cost, setCost] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [adjustingId, setAdjustingId] = useState(null);
  const [adjustedQty, setAdjustedQty] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('https://foodtang-backend.onrender.com/api/inventory');
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to load inventory:', error);
      setItems([]);
    }
  };

  const addOrUpdateItem = async () => {
    if (!name || quantity === '' || unit === '' || cost === '') {
      console.log('Please fill in all fields.');
      return;
    }

    const payload = {
      name,
      quantity: parseFloat(quantity),
      unit,
      cost: parseFloat(cost),
    };

    try {
      if (editingItem) {
        await axios.put(`http://localhost:4000/api/inventory/${editingItem._id}`, payload);
        console.log('Item updated.');
      } else {
        await axios.post('http://localhost:4000/api/inventory', payload);
        console.log('Item added.');
      }

      resetForm();
      fetchItems();
    } catch (error) {
      console.error('Error in add/update:', error.response?.data || error);
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

  const startEditing = (item) => {
    setEditingItem(item);
    setName(item.name);
    setQuantity(item.quantity);
    setUnit(item.unit);
    setCost(item.cost);
  };

  const resetForm = () => {
    setEditingItem(null);
    setName('');
    setQuantity('');
    setUnit('');
    setCost('');
  };

  const adjustQuantity = async (id) => {
    if (adjustedQty === '') return;

    try {
      await axios.put(`http://localhost:4000/api/inventory/${id}`, {
        quantity: parseFloat(adjustedQty),
      });
      console.log('Quantity adjusted');
      setAdjustedQty('');
      setAdjustingId(null);
      fetchItems();
    } catch (error) {
      console.error('Failed to adjust quantity:', error);
    }
  };

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>

      <div className="inventory-form">
        <input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          placeholder="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <input
          placeholder="Cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <button onClick={addOrUpdateItem}>
          {editingItem ? 'Update' : 'Add'}
        </button>
        {editingItem && <button onClick={resetForm}>Cancel</button>}
      </div>

      {items && items.length > 0 ? (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Cost</th>
              <th className='action'>Actions</th>
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
                  <button onClick={() => startEditing(item)}>Edit</button>
                  {adjustingId === item._id ? (
                    <>
                      <input
                        type="number"
                        placeholder="New qty"
                        value={adjustedQty}
                        onChange={(e) => setAdjustedQty(e.target.value)}
                        style={{ width: '80px' }}
                      />
                      <button onClick={() => adjustQuantity(item._id)}>✓</button>
                      <button onClick={() => setAdjustingId(null)}>✕</button>
                    </>
                  ) : (
                    <button onClick={() => setAdjustingId(item._id)}>
                      Adjust Qty
                    </button>
                  )}
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
