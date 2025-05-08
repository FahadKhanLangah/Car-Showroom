import bcrypt from "bcryptjs";
import { userModel } from "../models/user-model.js";
import jwt from 'jsonwebtoken';
export const registerUser = async (req, res) => {
  const { name, phone, password, email, gender, address, city } = req.body;
  try {
    if (!name || !phone || !password || !email || !city) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone, Email, Password and City fields are Required"
      })
    }
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: `User with this email ${email} already exist`
      })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    let avatarUrl = "https://png.pngtree.com/png-clipart/20190924/original/pngtree-human-avatar-free-vector-png-image_4825373.jpg";
    if (req.file && req.file.path && req.file.filename) {
      avatarUrl = req.file.path;
    }
    const user = await userModel.create({
      name, email, password: hashPassword, phone, gender, address, city,
      avatar: avatarUrl
    })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
      success: true,
      message: `Welcome ${name}, to DB Car Center`,
      token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}

export const loginUser = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "Email and Password fields are Required"
      })
    }
    const userExist = await userModel.findOne({ email: email });
    if (!userExist) {
      return res.status(409).json({
        success: false,
        message: `User with this email ${email} does not already exist`
      })
    }
    const isPasswordMatch = bcrypt.compareSync(password, userExist.password)
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentails"
      })
    }
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
      success: true,
      message: `Welcome back ${userExist.name}, to DB Car Center`,
      token,
      user: userExist
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}

export const loadUserDetail = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(409).json({
        success: false,
        message: `User does not exist`
      })
    }
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}

export const logout = async (req, res) => {
  try {
    await res.clearCookie('token', {
      httpOnly: true,
      expires: new Date(0)
    })
    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
    })
  }
}
