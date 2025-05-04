import express from 'express'
import { addVehicle } from '../controller/vehicle-controller.js';
import { isAuth, isAuthorizedRole } from '../middleware/Auth.js';

const vehicleRouter = express.Router();

vehicleRouter.post("/add-new-vehicle", isAuth, isAuthorizedRole("admin"), addVehicle);

export default vehicleRouter;