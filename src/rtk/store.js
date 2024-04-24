import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import Protfolio from "./Protfolio";
import TraineesSlice from "./TraineesSlice";

const store = configureStore({
  reducer: {
    User: UserSlice,
    Profile: Protfolio,
    Trainees:TraineesSlice,
  },
});
export default store;
