import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema(
  {
  make: String,  
  model: String,    
  hp: Number,  
  topSpeed: String,
  vehicleType: String,
  transmission: String,
  year : String,
  img_url: String,
  category: String,
  price: Number,
  description: String,
  stock: Number,
  sold: { type: Number, default: 0 }
},{timestamps : true});

export const vehicleModel = mongoose.model('vehicle', vehicleSchema);
