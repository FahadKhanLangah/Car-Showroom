import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from '../features/vehicles/vehiclesSlice';
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/admin/adminSlice'
export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    auth: authReducer,
    admin: adminReducer
  },
});