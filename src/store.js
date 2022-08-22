import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./features/job/jobSlice";
import userReducer from "./features/user/userSlice";
import allJobReducer from "./features/allJobs/allJobsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJob: allJobReducer,
  },
});
export default store;
