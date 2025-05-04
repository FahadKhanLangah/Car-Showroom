import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"] },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  address : String,
  city: { type: String, required: true },
  avatar: String
}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema);