import OrderModel from '../models/orderModel.js';
import UserModel from '../models/userModel.js';

// ----------------------------
// 1. Place an Order (User)
// ----------------------------
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address, paymentMethod } = req.body;

    if (!items?.length || !amount || !paymentMethod) {
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

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
  }
};

// ----------------------------
// 2. Get My Orders (User)
// ----------------------------
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

// ----------------------------
// 3. Get All Orders (Admin)
// ----------------------------
export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("userId", "name email");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Admin fetch orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

// ----------------------------
// 4. Update Payment Status (Admin)
// ----------------------------
export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { paymentDone } = req.body;

  try {
    const order = await OrderModel.findByIdAndUpdate(
      id,
      {
        paymentDone,
        status: paymentDone ? 'Processing' : 'Pending Payment',
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Payment status updated", order });
  } catch (error) {
    console.error('Payment update error:', error);
    res.status(500).json({ success: false, message: "Failed to update payment status" });
  }
};