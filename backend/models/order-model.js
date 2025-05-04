import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicle' },
    priceAtPurchase: Number,
    paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
    discount: { type: Number, default: 0 }
  }, { timestamps : true});
export const orderModel = mongoose.model('order', orderSchema);