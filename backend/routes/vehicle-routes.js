import express from 'express'
import { addVehicle, getAllVehicles, getRecommendedCars, getTopSellingCars, getVehicleDetail, searchVehicles } from '../controller/vehicle-controller.js';
import { isAuth, isAuthorizedRole } from '../middleware/Auth.js';

const vehicleRouter = express.Router();

vehicleRouter.post("/add-new-vehicle", isAuth, isAuthorizedRole("admin"), addVehicle);
vehicleRouter.get("/get-all-vehicles", getAllVehicles);
vehicleRouter.get("/vehicle-detail/:id", getVehicleDetail);
vehicleRouter.get("/search", searchVehicles);
vehicleRouter.get("/top-selling-cars", getTopSellingCars);
vehicleRouter.get("/get-recommended-car", isAuth, getRecommendedCars);
export default vehicleRouter;