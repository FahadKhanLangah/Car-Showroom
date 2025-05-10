import { orderModel } from "../models/order-model.js";
import { vehicleModel } from "../models/vehicle-model.js";
import { userModel } from "../models/user-model.js";

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

export const searchVehicles = async (req, res) => {
  try {
    const {
      q, make, model, year, category, vehicleType,
      page = 1, limit = 10
    } = req.query;

    const userId = req.user?.id;

    const query = {};

    if (q) {
      const regex = new RegExp(q, "i");
      query.$or = [
        { make: regex },
        { model: regex },
        { year: regex },
        { category: regex },
        { vehicleType: regex }
      ];
    } else {
      if (make) query.make = new RegExp(make, "i");
      if (model) query.model = new RegExp(model, "i");
      if (year) query.year = year;
      if (category) query.category = new RegExp(category, "i");
      if (vehicleType) query.vehicleType = new RegExp(vehicleType, "i");
    }

    // Save search history
    const searchTerms = q
      ? [q.toLowerCase()]
      : [make, model, year, category, vehicleType].filter(Boolean).map(term => term.toLowerCase());

    if (userId && searchTerms.length) {
      await userModel.findByIdAndUpdate(userId, {
        $addToSet: { searchHistory: { $each: searchTerms } }
      });
    }

    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      vehicleModel.find(query).skip(skip).limit(Number(limit)),
      vehicleModel.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      totalResults: total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      vehicles
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTopSellingCars = async (req, res) => {
  try {
    const topCars = await orderModel.aggregate([
      {
        $group: {
          _id: "$vehicleId",
          totalSales: { $sum: 1 }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "vehicles",
          localField: "_id",
          foreignField: "_id",
          as: "vehicle"
        }
      },
      { $unwind: "$vehicle" },
      {
        $project: {
          _id: 0,
          vehicle: 1,
          totalSales: 1
        }
      }
    ]);

    res.status(200).json({ success: true, topCars });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecommendedCars = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    const interests = user?.searchHistory || [];

    if (interests.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No search history yet",
        recommended: []
      });
    }

    const recommended = await vehicleModel.find({
      $or: [
        { make: { $in: interests } },
        { model: { $in: interests } },
        { category: { $in: interests } },
        { vehicleType: { $in: interests } },
        { year: { $in: interests } }
      ]
    }).limit(10);

    return res.status(200).json({
      success: true,
      recommended
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { formdata } = req.body;
    const vid = formdata.id;
    if (!vid) {
      return res.status(404).json({
        success: false,
        message: "No id is provided"
      })
    }
    const updateFields = {};
    if (formdata.stock !== undefined) {
      updateFields.stock = Number(formdata.stock);
    }
    if (formdata.price !== undefined) {
      updateFields.price = Number(formdata.price);
    }
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update"
      });
    }
    const updatedCar = await vehicleModel.findByIdAndUpdate(
      { _id: vid },
      updateFields,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Car information updated successfully",
      car: updatedCar
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        success: true,
        message: "No car id is provided",
      });
    }
    await vehicleModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Car Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};




