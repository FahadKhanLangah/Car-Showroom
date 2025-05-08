import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from '../features/vehicles/vehiclesSlice';
import authReducer from '../features/auth/authSlice'
export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    auth: authReducer
  },
});