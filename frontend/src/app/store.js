import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from '../features/vehicles/vehiclesSlice';

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
  },
});