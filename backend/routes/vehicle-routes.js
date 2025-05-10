import express from 'express'
import { addVehicle, deleteCar, getAllVehicles, getRecommendedCars, getTopSellingCars, getVehicleDetail, searchVehicles, updateCar } from '../controller/vehicle-controller.js';
import { isAuth, isAuthorizedRole } from '../middleware/Auth.js';

const vehicleRouter = express.Router();

vehicleRouter.post("/add-new-vehicle", isAuth, isAuthorizedRole("admin"), addVehicle);
vehicleRouter.get("/get-all-vehicles", getAllVehicles);
vehicleRouter.get("/vehicle-detail/:id", getVehicleDetail);
vehicleRouter.get("/search", searchVehicles);
vehicleRouter.get("/top-selling-cars", getTopSellingCars);
vehicleRouter.get("/get-recommended-car", isAuth, getRecommendedCars);
vehicleRouter.put("/update-car", isAuth, isAuthorizedRole("admin"), updateCar);
vehicleRouter.delete("/delete-car/:id", isAuth, isAuthorizedRole("admin"), deleteCar);
export default vehicleRouter;