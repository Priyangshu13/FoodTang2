import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, default: {} },
  status: { type: String, default: "Food Processing" },
  paymentMethod: { type: String, enum: ['online', 'cod'], required: true },
  paymentDone: { type: Boolean, default: false },
}, { timestamps: true }); // ✅ Adds createdAt and updatedAt fields

const OrderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default OrderModel;