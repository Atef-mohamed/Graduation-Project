import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import url from "../url.json";

// Show trainees
export const fetchTraineesList = createAsyncThunk(
  "Trainees/fetchTraineesList",
  async (token, page) => {
    const res = await axios.post(
      `${url.url}/coach/trainees?page=${page}`,
      token
    );
    // console.log("Trainees data",res.data.msg.data);
    return res.data;
  }
);
// Async thunk to fetch trainee data
export const fetchTraineeData = createAsyncThunk(
  "trainees/fetchTraineeData",
  async ({ id, token }) => {
    const response = await axios.post(`${url.url}/coach/trainee/${id}`, {
      token,
    });
    return response.data;
  }
);
// Show sports
export const fetchGifList = createAsyncThunk(
  "Trainees/fetchGifList",
  async (token, page) => {
    const res = await axios.post(`${url.url}/sports?page=${page}`, token);
    console.log("gif", res.data);
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
// Update all plan
export const UpdatePlans = createAsyncThunk(
  "Trainees/UpdatePlan",
  async (plansData) => {
    const res = await axios.post(`${url.url}/plan/update`, plansData);
    console.log("update plan", res.data);
    return res.data;
  }
);
// View InBody Data
export const ViewInbodyData = createAsyncThunk(
  "Trainees/ViewInbodyData",
  async (data) => {
    const res = await axios.post(`${url.url}/inbody/show`, data);
    console.log("inbody", res.data);
    return res.data;
  }
);
// Edit Exercise
export const updated_exercise = createAsyncThunk(
  "Trainees/editExercise",
  async (data) => {
    const res = await axios.post(`${url.url}/exercise/update`, data);
    console.log("update plan", res.data);
    return res.data;
  }
);

// show Requests
export const fetchRequests = createAsyncThunk(
  "Trainees/fetchRequests",
  async (data) => {
    const res = await axios.post(`${url.url}/coach/requests`, data);
    console.log("Requests data", res.data);
    return res.data;
  }
);
// Accept Request
export const acceptRequest = createAsyncThunk(
  "Trainees/acceptRequest",
  async (data) => {
    const res = await axios.post(`${url.url}/coach/request/accept`, data);
    console.log("accept", res.data);
    return res.data;
  }
);
// Reject Request
export const rejectRequest = createAsyncThunk(
  "Trainees/rejectRequest",
  async (data) => {
    const res = await axios.post(`${url.url}/coach/request/reject`, data);
    console.log("reject", res.data);
    return res.data;
  }
);
// start
export const fetchChatList = createAsyncThunk(
  "Trainees/fetchChatList",
  async (data) => {
    const res = await axios.post(`${url.url}/chat`, data);
    return res.data;
  }
);
export const addMessage = createAsyncThunk(
  "Trainees/addMessage",
  async (data) => {
    const res = await axios.post(`${url.url}/coach/chat`, data);
    return res.data;
  }
);

// view chart in Report
export const fetchReportData = createAsyncThunk(
  "Trainees/fetchReportData",
  async (data) => {
    const res = await axios.post(`${url.url}/reports/chart`, data);
    console.log("Report::", res.data);
    return res.data;
  }
);
// UPDATE inbody in Report
export const updateInbodyReport = createAsyncThunk(
  "Trainees/updateInbodyReport",
  async (data) => {
    const res = await axios.post(`${url.url}/inbody/data`, data);
    console.log("InbodyReport::", res.data);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "Trainees",
  initialState: {
    TraineesList: null,
    trainee: null,
    GifLists: null,
    plansData: null,
    showPlansData: null,
    exerciseDeleted: null,
    PlanDeleted: null,
    day: "",
    trainingName: "",
    inBodyData: null,
    updated_exercise: {},
    exercise: null,
    exercises: [],
    chat: [],
    requestsData: [],
    acceptRequestData: null,
    rejectRequestData: null,
    updatedPlans: null,
    traineedata: null,
    reportChartData: null,
    reportInbodyData: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    addexercise: (state, action) => {
      state.exercise = action.payload;
    },
    traineeData: (state, action) => {
      state.traineedata = action.payload;
    },
    updatedExercise: (state, action) => {
      state.updated_exercise = action.payload;
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
    //start
    getMessage: (state, action) => {
      state.chat.push(action.payload);
    },
    //end
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
    // Trainee Data
    builder.addCase(fetchTraineeData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTraineeData.fulfilled, (state, action) => {
      state.trainee = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchTraineeData.rejected, (state, action) => {
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
    // View InBody Data
    builder.addCase(ViewInbodyData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ViewInbodyData.fulfilled, (state, action) => {
      state.inBodyData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(ViewInbodyData.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    //Edit exercise
    builder.addCase(updated_exercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updated_exercise.fulfilled, (state, action) => {
      state.updated_exercise = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updated_exercise.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    //Show Requests
    builder.addCase(fetchRequests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.requestsData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchRequests.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    //accept Requests
    builder.addCase(acceptRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(acceptRequest.fulfilled, (state, action) => {
      state.acceptRequestData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(acceptRequest.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    //reject Requests
    builder.addCase(rejectRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(rejectRequest.fulfilled, (state, action) => {
      state.rejectRequestData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(rejectRequest.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    // Update all plan
    builder.addCase(UpdatePlans.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdatePlans.fulfilled, (state, action) => {
      state.updatedPlans = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(UpdatePlans.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    //start Chat
    builder.addCase(fetchChatList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChatList.fulfilled, (state, action) => {
      state.chat = action.payload.msg;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchChatList.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    builder.addCase(addMessage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(addMessage.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });

    //end
    //fetch Report Data
    builder.addCase(fetchReportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReportData.fulfilled, (state, action) => {
      state.reportChartData = action.payload.msg;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchReportData.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    });
    //Update Inbody Report Data
    builder.addCase(updateInbodyReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateInbodyReport.fulfilled, (state, action) => {
      state.reportInbodyData = action.payload.msg;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateInbodyReport.rejected, (state, action) => {
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
  updatedExercise,
  removeExersize,
  removeAllPlans,
  addexercise,
  getMessage,
  traineeData,
} = userSlice.actions;
export default userSlice.reducer;
