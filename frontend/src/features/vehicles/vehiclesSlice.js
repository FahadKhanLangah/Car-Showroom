import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching vehicles
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    const response = await axios.get('YOUR_BACKEND_API_ENDPOINT');
    return response.data;
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
    totalStock: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    sortVehicles: (state, action) => {
      if (action.payload === 'low-to-high') {
        state.vehicles.sort((a, b) => a.price - b.price);
      } else if (action.payload === 'high-to-low') {
        state.vehicles.sort((a, b) => b.price - a.price);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles = action.payload.vehicles;
        state.totalStock = action.payload.totalStock;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { sortVehicles } = vehiclesSlice.actions;

export const selectAllVehicles = (state) => state.vehicles.vehicles;
export const selectVehicleById = (state, vehicleId) =>
  state.vehicles.vehicles.find(vehicle => vehicle._id === vehicleId);
export const getVehiclesStatus = (state) => state.vehicles.status;
export const getVehiclesError = (state) => state.vehicles.error;
export const getTotalStock = (state) => state.vehicles.totalStock;

export default vehiclesSlice.reducer;