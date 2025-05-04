import { vehicleModel } from "../models/vehicle-model.js";

export const addVehicle = async (req, res) => {
  try {
    const { make, model, hp, topSpeed, vehicleType, year, img_url, category, price, description, stock, transmission } = req.body;
    const newVehicle = await vehicleModel.create({
      make, model, hp, topSpeed, vehicleType, year, img_url, category, price, description, stock, transmission
    })
    return res.status(201).json({
      success: true,
      message: "New Vehicle added SuccessFully",
      newVehicle
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find();

    const totalStockResult = await vehicleModel.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" }
        }
      }
    ]);

    const totalStock = totalStockResult[0]?.totalStock || 0;

    return res.status(200).json({
      success: true,
      vehicles,
      totalStock
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export const getVehicleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await vehicleModel.findById(id);
    return res.status(200).json({
      success: true,
      vehicle
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
