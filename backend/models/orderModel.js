import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, default: {} },
  status: { type: String, default: "Food Processing" },
  Date: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['online', 'cod'], required: true },
  paymentDone: { type: Boolean, default: false },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' }
});


const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
