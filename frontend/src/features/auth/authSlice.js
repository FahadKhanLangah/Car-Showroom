import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
})
export const loadUser = createAsyncThunk("loaduser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/user-me');
    return data.user
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Session expired');
  }
})

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    const { data } = await api.post("/login", { email, password })
    toast.info(data?.message);
    if (data.success) {
      const userData = await api.get('/user-me');
      return userData.data;
    }
  } catch (error) {
    return toast.error(error.response?.data?.message || 'Login failed')
  }
})

export const registerUser = createAsyncThunk("register", async (form, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("name", form.name)
    formData.append("email", form.email)
    formData.append("city", form.city)
    formData.append("password", form.password)
    formData.append("phone", form.phone)
    formData.append("avatar", form.avatar)
    const { data } = await api.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    toast.info(data.message);
    return data;
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed'
    toast.error(message)
    return rejectWithValue(message);
  }
})

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await api.get("/logout", { withCredentials: true });
    toast.info(data?.message)
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
    user: null,
    success: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload.user
      state.isAuth = true
      state.success = true
    }).addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.success = action.payload.success
    }).addCase(loadUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
        state.success = true
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.user = null;
        state.success = action.payload.success
      }).addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }).addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user
        if (action.payload.success) {
          state.isAuth = true
        } else
          state.isAuth = false,
            state.success = action.payload.success
      }).addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.success = action.payload.success
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