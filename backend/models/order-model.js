import mongoose from "mongoose";
const orderSchema = new mongoose(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicle' },
    priceAtPurchase: Number,
    purchaseDate: Date,
    paymentStatus : {type : String , enum : ["pending", "completed"]},
    discount : Number,
    invoicePdfUrl: String,
  });
export const orderModel = mongoose.model('order', orderSchema);