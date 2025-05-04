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

export const isAuthorizedRole = (role) => async (req, res, next) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Please Login first"
      })
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Does not Exist"
      })
    }
    if (user.role === role) {
      next();
    } else {
      return res.status(404).json({
        success: false,
        message: "You are not allowed access these resources"
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
    })
  }
}