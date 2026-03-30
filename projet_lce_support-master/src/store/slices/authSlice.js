import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/apiconfig.js";
import { showMessage } from "./showErrorSlice.js";

// Async action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const { token, user } = data;

      // Centralisation stockage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (err) {
       dispatch(showMessage({
              severity: 'error',
              duration: 5000,
              message: JSON.stringify(err.message) || JSON.stringify(err.response.data.message)
            }));
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Une erreur est survenue"
      );
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;