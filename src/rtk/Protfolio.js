import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import url from "../url.json";

export const submitProfileData = createAsyncThunk(
  "profile/submitProfileData",
  async (userProfileData) => {
    const res = await axios.post(
      `${url.url}/coach/profile/complete`,
      userProfileData
    );
    return res.data;
  }
);
export const addProtfolio = createAsyncThunk(
  "profile/addProtfolio",
  async (userProtfolioData) => {
    const res = await axios.post(
      `${url.url}/coach/portfolio/create`,
      userProtfolioData
    );
    return res.data;
  }
);
// get protfolio
export const getProtfolio = createAsyncThunk(
  "profile/getProtfolio",
  async (token) => {
    const res = await axios.post(`${url.url}/coach/portfolio/show`, token);
    return res.data;
  }
);
// delete protfolio
export const deleteProtfolio = createAsyncThunk(
  "profile/deleteProtfolio",
  async (id) => {
    const res = await axios.post(`${url.url}/coach/portfolio/delete`, id);
    return res.data;
  }
);
// add package
export const addPackage = createAsyncThunk(
  "profile/addPackage",
  async (packagePriceData) => {
    const res = await axios.post(
      `${url.url}/coach/package/create`,
      packagePriceData
    );
    return res.data;
  }
);
// Show Profile
export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (token) => {
    const res = await axios.post(`${url.url}/coach/profile/show`, token);
    console.log("profile data", res.data);
    return res.data;
  }
);
// Edit Profile
export const editProfileData = createAsyncThunk(
  "profile/edtitProfileData",
  async (data) => {
    const res = await axios.post(`${url.url}/coach/profile/update`, data);
    console.log("profile edit ", res.data);

    return res.data;
  }
);

//start
export const updatePortfolio = createAsyncThunk(
  "portfolio/updatePortfolio",
  async (data) => {
    const res = await axios.post(`${url.url}/coach/portfolio/update`, data);
    return res.data;
  }
);
//end
export const userSlice = createSlice({
  name: "profile",
  initialState: {
    userProfileData: null,
    userProtfolioData: null,
    clientProtfolioData: null,
    packagePriceData: null,
    CoachProfileData: null,
    editProfiledata: null,
    TraineesList: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // complete profile
    builder.addCase(submitProfileData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitProfileData.fulfilled, (state, action) => {
      state.userProfileData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(submitProfileData.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    // Add protfolio
    builder.addCase(addProtfolio.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProtfolio.fulfilled, (state, action) => {
      state.userProtfolioData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(addProtfolio.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // Add protfolio
    builder.addCase(getProtfolio.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProtfolio.fulfilled, (state, action) => {
      state.clientProtfolioData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getProtfolio.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // Delete protfolio
    builder.addCase(deleteProtfolio.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProtfolio.fulfilled, (state, action) => {
      state.clientProtfolioData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteProtfolio.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // Add Package
    builder.addCase(addPackage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPackage.fulfilled, (state, action) => {
      state.packagePriceData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(addPackage.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // Show Profile
    builder.addCase(fetchProfileData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.CoachProfileData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchProfileData.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // Show Profile
    builder.addCase(editProfileData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProfileData.fulfilled, (state, action) => {
      state.editProfiledata = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(editProfileData.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    //start
    builder.addCase(updatePortfolio.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePortfolio.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updatePortfolio.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    //end
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
