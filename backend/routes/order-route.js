import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getMyOrders } from '../controller/order-controller.js';
import { isAuth, isAuthorizedRole } from '../middleware/Auth.js';
const orderRouter = express.Router();
orderRouter.post('/create-order/:vId', isAuth, createOrder);
orderRouter.get('/get-all-orders', isAuth, isAuthorizedRole('admin'), getAllOrders);
orderRouter.delete('/delete-order/:orderId', isAuth, isAuthorizedRole('admin'), deleteOrder);
orderRouter.get('/get-my-orders', isAuth, getMyOrders);
export default orderRouter;