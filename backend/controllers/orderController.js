import OrderModel from '../models/orderModel.js';
import UserModel from '../models/userModel.js';

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.body.userId;

    if (!userId || !items?.length || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      paymentDone: paymentMethod === 'online',
      paymentStatus: paymentMethod === 'online' ? 'Paid' : 'Unpaid',
      status: paymentMethod === 'cod' ? 'Pending Payment' : 'Processing'
    });

    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!['Paid', 'Unpaid'].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid payment status' });
    }

    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.paymentStatus = paymentStatus;
    order.paymentDone = paymentStatus === 'Paid';
    order.status = paymentStatus === 'Paid' ? 'Payment Received' : 'Pending Payment';

    await order.save();

    res.status(200).json({ success: true, message: 'Payment status updated' });
  } catch (err) {
    console.error('Update payment status error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to get all orders' });
  }
};

// ✅ Added this function:
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user orders' });
  }
};
