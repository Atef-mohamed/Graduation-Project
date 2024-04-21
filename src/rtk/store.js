import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import Protfolio from "./Protfolio";

const store = configureStore({
  reducer: {
    User: UserSlice,
    Profile: Protfolio,
  },
});
export default store;
