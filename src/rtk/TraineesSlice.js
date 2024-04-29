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
    // console.log(res.data);
    return res.data;
  }
);
// add Plans
export const AddPlans = createAsyncThunk(
  "Trainees/AddPlans",
  async (plansData) => {
    const res = await axios.post(`${url.url}/plan/create`, plansData);
    console.log("add PLans", res.data);
    return res.data;
  }
);
// Show Plans
export const fetchPlansData = createAsyncThunk(
  "Trainees/fetchPlansData",
  async (data) => {
    const res = await axios.post(`${url.url}/plan/show`, data);
    console.log("show plans", res.data);
    return res.data;
  }
);
// Delete one exercise
export const deleteExercise = createAsyncThunk(
  "Trainees/deleteExercise",
  async (data) => {
    const res = await axios.post(`${url.url}/exercise/delete`, data);
    console.log("delete exercise", res.data);
    return res.data;
  }
);
// Delete Plan
export const deletePlan = createAsyncThunk(
  "Trainees/deletePlan",
  async (data) => {
    const res = await axios.post(`${url.url}/plan/delete`, data);
    console.log("delete plan", res.data);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "Trainees",
  initialState: {
    TraineesList: null,
    GifLists: null,
    plansData: null,
    showPlansData: null,
    exerciseDeleted: null,
    PlanDeleted: null,
    day: "",
    trainingName: "",
    exercise: "",
    exercises: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    addexercise: (state, action) => {
      state.exercise = action.payload;
    },
    activeDay: (state, action) => {
      state.day = action.payload;
    },
    trainName: (state, action) => {
      state.trainingName = action.payload;
    },
    addExersize: (state, action) => {
      state.exercises.push(action.payload);
    },
    removeExersize: (state, action) => {
      const index = action.payload;
      state.exercises.pop(index);
    },
    removeAllPlans: (state) => {
      state.exercises = [];
    },
  },
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
    // add plans
    builder.addCase(AddPlans.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AddPlans.fulfilled, (state, action) => {
      state.plansData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(AddPlans.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // Show plans
    builder.addCase(fetchPlansData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlansData.fulfilled, (state, action) => {
      state.showPlansData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchPlansData.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // delete exercise
    builder.addCase(deleteExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteExercise.fulfilled, (state, action) => {
      state.exerciseDeleted = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteExercise.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // delete Plan
    builder.addCase(deletePlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePlan.fulfilled, (state, action) => {
      state.PlanDeleted = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deletePlan.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
  },
});
export const {
  activeDay,
  trainName,
  addExersize,
  removeExersize,
  removeAllPlans,
  addexercise,
} = userSlice.actions;
export default userSlice.reducer;
