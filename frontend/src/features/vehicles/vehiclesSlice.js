import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true
})

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    try {
      const response = await api.get('/get-all-vehicles');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message
      return toast.error(message);
    }
  }
);

export const searchVehicles = createAsyncThunk(
  'vehicles/searchVehicles',
  async (searchTerm) => {
    try {
      const response = await api.get(`/search?q=${searchTerm}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message
      return toast.error(message);
    }
  })

export const updateCar = createAsyncThunk("update-vehicle", async (formdata) => {
  try {
    const { data } = await api.put(`/update-car`, { formdata });
    return toast.success(data.message)
  } catch (error) {
    const message = error.response?.data?.message
    return toast.error(message);
  }
})
export const deleteCar = createAsyncThunk("delete-vehicle", async (id) => {
  try {
    const { data } = await api.delete(`/delete-car/${id}`);
    return toast.success(data.message)
  } catch (error) {
    const message = error.response?.data?.message
    return toast.error(message);
  }
})
const initialState = {
  vehicles: [],
  totalStock: 0,
  status: 'idle',
  error: null,
  filteredVehicles: [],
  searchStatus: 'idle',
  searchError: null,
  searchedData: []
}
const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    sortVehicles: (state, action) => {
      const targetArray = state.filteredVehicles.length > 0
        ? state.filteredVehicles
        : state.vehicles;
      if (action.payload === 'low-to-high') {
        targetArray.sort((a, b) => a.price - b.price);
      } else if (action.payload === 'high-to-low') {
        targetArray.sort((a, b) => b.price - a.price);
      }
    },
    clearSearchResults: (state) => {
      state.filteredVehicles = [];
      state.searchStatus = 'idle';
      state.searchError = null;
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
      }).addCase(searchVehicles.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchVehicles.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchedData = action.payload;
      })
      .addCase(searchVehicles.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message;
      }).addCase(updateCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCar.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.status = 'failed';
        state.searchError = action.error.message;
      }).addCase(deleteCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCar.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.status = 'failed';
        state.searchError = action.error.message;
      });
  }
});

export const { sortVehicles, clearSearchResults } = vehiclesSlice.actions;

export const selectAllVehicles = (state) =>
  state.vehicles.filteredVehicles.length > 0
    ? state.vehicles.filteredVehicles
    : state.vehicles.vehicles;
export const selectVehicleById = (state, vehicleId) =>
  state.vehicles.vehicles.find(vehicle => vehicle._id === vehicleId);
export const getVehiclesStatus = (state) => state.vehicles.status;
export const getSearchStatus = (state) => state.vehicles.searchStatus;
export const getVehiclesError = (state) => state.vehicles.error;
export const getSearchError = (state) => state.vehicles.searchError;
export const getTotalStock = (state) => state.vehicles.totalStock;
export const isSearchActive = (state) => state.vehicles.filteredVehicles.length > 0;

export default vehiclesSlice.reducer;