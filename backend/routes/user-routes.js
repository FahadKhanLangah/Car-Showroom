import express from "express";
import upload from "../middleware/multer.js";
import { loadUserDetail, loginUser, logout, registerUser } from "../controller/user-controller.js";
import { isAuth } from "../middleware/Auth.js";

const userRouter = express.Router();

userRouter.post("/register",upload.single('avatar'),registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/user-me",isAuth,loadUserDetail);
userRouter.get("/logout",isAuth,logout);
export default userRouter;