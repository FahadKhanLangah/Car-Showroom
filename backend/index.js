import express from "express";
import { config } from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors';
import connectDB from "./config/db.js";
import userRouter from "./routes/user-routes.js";
import vehicleRouter from "./routes/vehicle-routes.js";
import orderRouter from "./routes/order-route.js";

config();
const App = express();
App.use(express.urlencoded({ extended: false }));

App.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
App.use(cookieParser())
App.use(express.json())
connectDB();
const PORT = process.env.PORT
App.get('/', (req, res) => {
  res.send("<h1>Hello</h1>")
})
App.use('/api/v1', userRouter);
App.use('/api/v1', vehicleRouter);
App.use('/api/v1', orderRouter);
App.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`)
})
