import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true
})

export const getAdminAnalytics = createAsyncThunk("admin-analytics", async () => {
  try {
    const { data } = await api.get("/admin-analytics");
    return data.data;
  } catch (error) {
    const message = error.response?.data?.message
    return toast.error(message);
  }
})
export const getAllUsers = createAsyncThunk("admin-allUsers", async () => {
  try {
    const { data } = await api.get("/get-all-users");
    return data.users;
  } catch (error) {
    const message = error.response?.data?.message
    return toast.error(message);
  }
})
export const addNewVehicle = createAsyncThunk("add-new-vehicle", async (formData) => {
  try {
    const { data } = await api.post("/add-new-vehicle", formData);
    toast.info(data.message);
    return data?.error
  } catch (error) {
    const message = error.response?.data?.message
    return toast.error(message);
  }
})
const initialState = {
  totalUsers: 0,
  totalVehicles: 0,
  totalOrders: 0,
  totalSales: 0,
  salesLast7Days: 0,
  salesLast30Days: 0,
  totalProfit: 0,
  mostSellingCars: [],
  regularCustomers: [],
  lowStockVehicles: [],
  error: null,
  isLoading: false,
  users: []
}
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(getAdminAnalytics.pending, (state) => {
      state.error = null,
        state.isLoading = true
    }).addCase(getAdminAnalytics.fulfilled, (state, action) => {
      state.error = null,
        state.isLoading = false,
        state.totalUsers = action.payload.totalUsers,
        state.totalVehicles = action.payload.totalVehicles,
        state.totalOrders = action.payload.totalOrders,
        state.totalSales = action.payload.totalSales,
        state.totalProfit = action.payload.totalProfit,
        state.mostSellingCars = action.payload.mostSellingCars,
        state.regularCustomers = action.payload.regularCustomers
      state.salesLast7Days = action.payload.salesLast7Days,
        state.salesLast30Days = action.payload.salesLast30Days,
        state.salesLast30Days = action.payload.salesLast30Days,
        state.lowStockVehicles = action.payload.lowStockVehicles
    }).addCase(getAdminAnalytics.rejected, (state) => {
      state.isLoading = false
    }).addCase(addNewVehicle.pending, (state) => {
      state.error = null,
        state.isLoading = true
    }).addCase(addNewVehicle.fulfilled, (state) => {
      state.error = null,
        state.isLoading = false
    }).addCase(addNewVehicle.rejected, (state, action) => {
      state.error = action.payload.error,
        state.isLoading = false
    }).addCase(getAllUsers.pending, (state) => {
      state.error = null,
        state.isLoading = true
    }).addCase(getAllUsers.fulfilled, (state, action) => {
      state.error = null,
        state.isLoading = false,
        state.users = action.payload
    }).addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.payload.error,
        state.isLoading = false
    })
  }
})

export default adminSlice.reducer;