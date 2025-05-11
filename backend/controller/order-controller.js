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
    const { startDate, endDate } = req.query;
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    // GET /api/v1/orders?startDate=2024-05-01&endDate=2024-05-30

    const orders = await orderModel.find(filter).populate({
      path: "userId",
      select: "name"
    })
      .populate({
        path: "vehicleId",
        select: "make model img_url"
      })
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      buyerName: order.userId?.name,
      carName: `${order.vehicleId?.make} ${order.vehicleId?.model}`,
      carImg: order.vehicleId?.img_url,
      orderDate: order.createdAt,
      price: order.priceAtPurchase,
      carId: order.vehicleId,
      userId: order.userId
    }));

    return res.status(200).json({
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

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(404).json({
        success: false,
        message: "Order Id is required"
      })
    }
    await orderModel.findByIdAndDelete(orderId);
    return res.status(201).json({
      success: true,
      message: "This Order is deleted successFully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
    })
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await orderModel.find({ userId: id }).populate({
      path: "userId",
      select: "name"
    })
      .populate({
        path: "vehicleId",
        select: "make model img_url"
      })
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      buyerName: order.userId?.name,
      carName: `${order.vehicleId?.make} ${order.vehicleId?.model}`,
      carImg: order.vehicleId?.img_url,
      orderDate: order.createdAt,
      price: order.priceAtPurchase,
      carId: order.vehicleId,
      userId: order.userId
    }));
    return res.status(200).json({
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