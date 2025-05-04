import express from 'express'
import { addVehicle, getAllVehicles, getVehicleDetail } from '../controller/vehicle-controller.js';
import { isAuth, isAuthorizedRole } from '../middleware/Auth.js';

const vehicleRouter = express.Router();

vehicleRouter.post("/add-new-vehicle", isAuth, isAuthorizedRole("admin"), addVehicle);
vehicleRouter.get("/get-all-vehicles", getAllVehicles);
vehicleRouter.get("/vehicle-detail/:id",getVehicleDetail);
export default vehicleRouter;