import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import url from "../url.json";

// Show trainees
export const fetchTraineesList = createAsyncThunk(
  "Trainees/fetchTraineesList",
  async (token) => {
    const res = await axios.post(`${url.url}/coach/trainees`, token);
    // console.log(res.data.msg.length);
    return res.data;
  }
);
// Show sports
export const fetchGifList = createAsyncThunk(
  "Trainees/fetchGifList",
  async (token) => {
    const res = await axios.post(`${url.url}/sports`, token);
    console.log(res.data);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "Trainees",
  initialState: {
    TraineesList: null,
    GifLists: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Trainees List
    builder.addCase(fetchTraineesList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTraineesList.fulfilled, (state, action) => {
      state.TraineesList = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchTraineesList.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // Gif List
    builder.addCase(fetchGifList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGifList.fulfilled, (state, action) => {
      state.GifLists = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchGifList.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
