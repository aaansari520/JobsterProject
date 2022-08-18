import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./features/job/jobSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
  },
});
export default store;
