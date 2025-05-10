import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true
})
export const buyVehicle = createAsyncThunk("order/add", async (id) => {
  try {
    const { data } = await api.post(`/create-order/${id}`);
    toast.info(data?.message)
    return null;
  } catch (error) {
    return toast.error(error.response?.data?.message)
  }
})

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    error: null,
    orders: []
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
    })
  }
})

export default orderSlice.reducer;