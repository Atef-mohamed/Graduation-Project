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
// Show one trainee
// export const fetchTrainee = createAsyncThunk(
//   "Trainees/fetchTrainee",
//   async (token) => {
//     const res = await axios.post(`${url.url}/coach/trainees$`, token);
//     // console.log(res.data.msg.length);
//     return res.data;
//   }
// );

export const userSlice = createSlice({
  name: "Trainees",
  initialState: {
    TraineesList: null,
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
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
