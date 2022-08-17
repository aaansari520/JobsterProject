import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  //   user: null,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    // console.log(`Register User :  ${JSON.stringify(user)}`);

    try {
      const resp = await customFetch.post("/auth/register", user);
      console.log("response", resp);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    // console.log(`Register User :  ${JSON.stringify(user)}`);

    try {
      const resp = await customFetch.post("/auth/login", user);
      console.log("response", resp);
      return resp.data;
    } catch (error) {
      //   console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.user = user;
      addUserToLocalStorage(user);
      state.isLoading = false;
      toast.success(`Welcome to the team ${user.name}`);
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(`${action.payload}`);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.user = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.user = user;
      addUserToLocalStorage(user);
      state.isLoading = false;
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(`${action.payload}`);
    },
  },
});

export const { toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
