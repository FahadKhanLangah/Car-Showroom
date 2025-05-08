import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    const { data } = await axios.post("http://localhost:4000/api/v1/login", { email, password }, { withCredentials: true })
    toast.info(data?.message)
    return data;
  } catch (error) {
    return toast.error(error.response?.data?.message || 'Login failed')
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
    isAuth: false,
    token: null,
    user: null
  },
  reducers: {
    logoutUser: (action, state) => { }
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload.user,
        state.isAuth = true
    }).addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }
})
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;