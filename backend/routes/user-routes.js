import express from "express";
import upload from "../middleware/multer.js";
import { getAllUsers, loadUserDetail, loginUser, logout, registerUser, updateUserRole } from "../controller/user-controller.js";
import { isAuth, isAuthorizedRole } from "../middleware/Auth.js";
import { adminAnalyticsController } from "../admin/admin-analytics-controller.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single('avatar'), registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user-me", isAuth, loadUserDetail);
userRouter.get("/logout", isAuth, logout);
userRouter.get("/admin-analytics", isAuth, isAuthorizedRole('admin'),adminAnalyticsController);
userRouter.get("/get-all-users", isAuth, isAuthorizedRole('admin'),getAllUsers);
userRouter.patch("/update-user-role", isAuth, isAuthorizedRole('admin'),updateUserRole);

export default userRouter;