import OrderModel from '../models/orderModel.js';
import UserModel from '../models/userModel.js';

// Place Order (COD version)
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || items.length === 0 || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required order fields" });
    }

    // Create order in DB with payment = false (COD)
    const newOrder = new OrderModel({
      userid: userId,
      items,
      amount,
      address,
      payment: false, // payment will be collected on delivery
    });
    await newOrder.save();

    // Clear cart
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Error placing order', error: error.message });
  }
};

// Verify Order (COD doesn't need this anymore, but can keep for status update if needed)
const verifyOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    // Mark the order as confirmed (still unpaid because it's COD)
    await OrderModel.findByIdAndUpdate(orderId, { status: "Confirmed" }); // optional status field
    res.json({ success: true, message: "Order confirmed (COD)" });
  } catch (error) {
    console.error('Error verifying order:', error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// User orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userid: req.body.userId }); // Note: was `orderModel`, should be `OrderModel`
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

export { placeOrder, verifyOrder, userOrders };
