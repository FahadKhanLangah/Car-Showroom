import express from 'express';
import { createOrder, getAllOrders } from '../controller/order-controller.js';
import { isAuth, isAuthorizedRole } from '../middleware/Auth.js';
const orderRouter = express.Router();
orderRouter.post('/create-order/:vId', isAuth, createOrder);
orderRouter.get('/get-all-orders', getAllOrders);
export default orderRouter;