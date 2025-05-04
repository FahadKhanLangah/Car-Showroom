import jwt from 'jsonwebtoken'
import { userModel } from '../models/user-model.js';

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied: Login Again" });
    }
    const id = jwt.verify(token, process.env.JWT_SECRET);
    req.user = id;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

export const isAuthorizedRole = (requiredRole) => async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please login first"
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not allowed to access this resource"
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
