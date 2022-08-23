import {
  createSlice,
  createAsyncThunk,
  isAsyncThunkAction,
} from "@reduxjs/toolkit";
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          // authorization: `Bearer `,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! , Logging Out");
      }
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
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
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
      toast.error(`${action.payload}`, {
        position: "top-center",
      });
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
      toast.warn("Please Wait for sometime", {
        position: "top-center",
      });
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success("Successfully updated", {
        position: "top-center",
      });
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(
        action.payload ? action.payload : "Sorry we can't update...",
        {
          position: "top-center",
        }
      );
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
