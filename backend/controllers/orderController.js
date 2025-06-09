import OrderModel from '../models/orderModel.js';
import UserModel from '../models/userModel.js';

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    if (!userId || !items?.length || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address: address || {},
      paymentMethod,
      paymentDone: paymentMethod === 'online',
      status: paymentMethod === 'cod' ? 'Pending Payment' : 'Processing',
    });

    await newOrder.save();

    // Clear user's cart after placing order
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
  }
};

export { placeOrder };
