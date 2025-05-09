import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true
})

export const loadUser = createAsyncThunk("loaduser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/user-me');
    return data.user
  } catch (err) {
    return rejectWithValue(null)
  }
})

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    const { data } = await api.post("/login", { email, password })
    toast.info(data?.message)
    return data;
  } catch (error) {
    return toast.error(error.response?.data?.message || 'Login failed')
  }
})
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await api.get("/logout", { withCredentials: true });
    toast.info(data?.message)
    console.info(data);
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
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(loadUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }).addCase(login.pending, (state) => {
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
      }).addCase(logoutUser.pending, (state) => {
        state.isLoading = true,
          state.error = null
      }).addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false,
          state.error = null,
          state.isAuth = false,
          state.user = null,
          state.token = null
      }).addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false,
          state.error = action.payload
      })
  }
})
export const { clearError } = authSlice.actions;
export default authSlice.reducer;