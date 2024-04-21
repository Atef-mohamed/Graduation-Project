import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import url from "../url.json";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (userSignUpData) => {
    const res = await axios.post(`${url.url}/coach/signup`, userSignUpData);
    return res.data;
  }
);

export const logIn = createAsyncThunk("user/login", async (userLoginData) => {
  const res = await axios.post(`${url.url}/coach/login`, userLoginData);
  return res.data;
});
export const resend = createAsyncThunk(
  "user/resend",
  async (userResendData) => {
    const res = await axios.post(`${url.url}/coach/resend`, userResendData);
    return res.data;
  }
);

export const verifyCode = createAsyncThunk(
  "user/verifyOtp",
  async (verifyOtpData) => {
    const res = await axios.post(`${url.url}/coach/verify`, verifyOtpData);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userSignUpData: null,
    userLoginData: null,
    verifyOtpData: null,
    userResendData: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Sign Up
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userSignUpData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });

    // Login
    builder.addCase(logIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.userLoginData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });

    // Verify Code
    builder.addCase(verifyCode.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyCode.fulfilled, (state, action) => {
      state.verifyOtpData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(verifyCode.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    builder.addCase(resend.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resend.fulfilled, (state, action) => {
      state.userLoginData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(resend.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
