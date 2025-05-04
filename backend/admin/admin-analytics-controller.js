import { vehicleModel } from "../models/vehicle-model.js";
import { orderModel } from "../models/order-model.js";
import { userModel } from "../models/user-model.js";

export const adminAnalyticsController = async (req, res) => {
  try {
    // Total Users
    const totalUsers = await userModel.countDocuments();

    // Total Vehicles
    const totalVehicles = await vehicleModel.countDocuments();

    // Total Orders
    const totalOrders = await orderModel.countDocuments({ paymentStatus: "completed" });

    // Total Sales & Profit
    const orders = await orderModel.find({ paymentStatus: "completed" });
    const totalSales = orders.reduce((acc, order) => acc + order.priceAtPurchase, 0);
    const totalProfit = totalSales * 0.15; // Assume 15% profit margin

    // Most Selling Cars (Top 5)
    const mostSellingCars = await orderModel.aggregate([
      {
        $group: {
          _id: "$vehicleId",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
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
          model: "$vehicle.model",
          make: "$vehicle.make",
          count: 1,
          image: "$vehicle.img_url"
        }
      }
    ]);

    // Regular Customers (Top 5 users by order count)
    const regularCustomers = await orderModel.aggregate([
      {
        $group: {
          _id: "$userId",
          orders: { $sum: 1 }
        }
      },
      { $sort: { orders: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          phone: "$user.phone",
          orders: 1
        }
      }
    ]);

    // Sales in last 7 days, last 30 days
    const now = new Date();
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);

    const last30Days = new Date(now);
    last30Days.setDate(now.getDate() - 30);

    const salesLast7Days = await orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
          paymentStatus: "completed"
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$priceAtPurchase" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const salesLast30Days = await orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: last30Days },
          paymentStatus: "completed"
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$priceAtPurchase" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Low Stock Vehicles
    const lowStockVehicles = await vehicleModel.find({ stock: { $lt: 5 } }).select("make model stock");

    res.status(200).json({
      success: true,
      message: "Admin Analytics Dashboard",
      data: {
        totalUsers,
        totalVehicles,
        totalOrders,
        totalSales,
        totalProfit,
        mostSellingCars,
        regularCustomers,
        salesLast7Days,
        salesLast30Days,
        lowStockVehicles
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      error: error.message
    });
  }
};
