import { vehicleModel } from "../models/vehicle-model.js";

export const addVehicle = async (req, res) => {
  try {
    const { make, model, hp, topSpeed, vehicleType, year, img_url, category, price, description, stock,transmission } = req.body;
    const newVehicle = await vehicleModel.create({
      make, model, hp, topSpeed, vehicleType, year, img_url, category, price, description, stock, transmission
    })
    return res.status(201).json({
      success: true,
      message : "New Vehicle added SuccessFully",
      newVehicle
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}