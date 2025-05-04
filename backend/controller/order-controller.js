import { orderModel } from "../models/order-model.js";
import { vehicleModel } from "../models/vehicle-model.js";

export const createOrder = async (req, res) => {
  try {
    const id = req.user.id
    const { vId } = req.params;
    if (!id || !vId) {
      return res.status(500).json({
        success: false,
        message: "Vehicle Id and user Id are required"
      })
    }
    const vehicle = await vehicleModel.findById(vId);
    vehicle.sold += 1;
    vehicle.stock -= 1;
    await vehicle.save();
    const order = await orderModel.create({
      vehicleId: vId,
      userId: id,
      priceAtPurchase: vehicle.price
    });
    return res.status(201).json({
      success: true,
      message: "Your Order is placed successFully",
      order
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
    })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate({
      path: "userId",
      select: "name"
    })
      .populate({
        path: "vehicleId",
        select: "make model img_url"
      })
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      buyerName: order.userId?.name,
      carName: `${order.vehicleId?.make} ${order.vehicleId?.model}`,
      carImg: order.vehicleId?.img_url,
      orderDate: order.createdAt,
      price: order.priceAtPurchase,
      carId: order.vehicleId,
      userId: order.userId
    }));

    return res.status(404).json({
      success: true,
      orders: formattedOrders
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}