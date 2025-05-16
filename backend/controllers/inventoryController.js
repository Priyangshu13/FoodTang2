import InventoryItem from '../models/inventoryItem.js';

// GET all inventory items
export const getInventory = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Failed to fetch items:', error);
    res.status(500).json({ message: 'Failed to load inventory', error: error.message });
  }
};

// POST new item
export const addInventoryItem = async (req, res) => {
  const { name, quantity, unit, cost } = req.body;
  console.log('Received POST data:', req.body);

  if (!name || quantity === undefined || unit === undefined || cost === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (quantity < 0) {
    return res.status(400).json({ message: 'Quantity cannot be negative' });
  }

  if (cost < 0) {
    return res.status(400).json({ message: 'Cost cannot be negative' });
  }

  try {
    const newItem = new InventoryItem({
      name,
      quantity: parseFloat(quantity),
      unit,
      cost: parseFloat(cost),
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('MongoDB save error:', error);
    res.status(500).json({ message: 'Failed to add item', error: error.message });
  }
};

// PUT update item
export const updateInventoryItem = async (req, res) => {
  const { name, quantity, unit, cost } = req.body;

  if (quantity < 0 || cost < 0) {
    return res.status(400).json({ message: 'Quantity and cost must be non-negative' });
  }

  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      { name, quantity: parseFloat(quantity), unit, cost: parseFloat(cost) },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Failed to update item:', error);
    res.status(500).json({ message: 'Failed to update item', error: error.message });
  }
};

// DELETE item
export const deleteInventoryItem = async (req, res) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Failed to delete item:', error);
    res.status(500).json({ message: 'Failed to delete item', error: error.message });
  }
};
