import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
})
export const buyVehicle = createAsyncThunk("order/add", async (id) => {
  try {
    const { data } = await api.post(`/create-order/${id}`);
    toast.info(data?.message)
    return data;
  } catch (error) {
    return toast.error(error.response?.data?.message)
  }
})
export const deleteOrder = createAsyncThunk("order/delete", async (id) => {
  try {
    const { data } = await api.delete(`/delete-order/${id}`);
    toast.info(data?.message)
    return data;
  } catch (error) {
    return toast.error(error.response?.data?.message)
  }
})
export const getAllOrders = createAsyncThunk("order/get-all", async () => {
  try {
    const { data } = await api.get('/get-all-orders');
    return data.orders
  } catch (error) {
    return toast.error(error.response?.data?.message);
  }
})
export const getMyCars = createAsyncThunk("order/get-my-orders", async () => {
  try {
    const { data } = await api.get('/get-my-orders');
    console.log(data)
    return data.orders
  } catch (error) {
    return toast.error(error.response?.data?.message);
  }
})
const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    error: null,
    orders: [],
    myOrders: []
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(buyVehicle.pending, (state) => {
      state.error = null,
        state.isLoading = true
    }).addCase(buyVehicle.fulfilled, (state) => {
      state.error = null,
        state.isLoading = false
    }).addCase(buyVehicle.rejected, (state, action) => {
      state.error = action.payload,
        state.isLoading = false
    }).addCase(getAllOrders.pending, (state) => {
      state.isLoading = true,
        state.error = null
    }).addCase(getAllOrders.fulfilled, (state, action) => {
      state.isLoading = false,
        state.error = null,
        state.orders = action.payload
    }).addCase(getAllOrders.rejected, (state) => {
      state.isLoading = false,
        state.orders = []
    }).addCase(deleteOrder.pending, (state) => {
      state.isLoading = true,
        state.error = null
    }).addCase(deleteOrder.fulfilled, (state) => {
      state.isLoading = false,
        state.error = null
    }).addCase(deleteOrder.rejected, (state, action) => {
      state.isLoading = false,
        state.error = action.payload.error.response?.data?.messageF
    }).addCase(getMyCars.pending, (state) => {
      state.isLoading = true,
        state.error = null
    }).addCase(getMyCars.fulfilled, (state, action) => {
      state.isLoading = false,
        state.error = null,
        state.myOrders = action.payload
    }).addCase(getMyCars.rejected, (state, action) => {
      state.isLoading = false,
        state.error = action.payload.error.response?.data?.messageF
    })
  }
})

export default orderSlice.reducer;