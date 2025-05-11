import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  city: { type: String, required: true },
  avatar: String,
  searchHistory: [{ type: String }]
}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema);