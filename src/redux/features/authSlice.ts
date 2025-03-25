import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";
import Cookies from "js-cookie";

interface AuthState {
  user: unknown;
  token: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: "",
};

// register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    thunkAPI
  ) => {
    try {
      await API.post("/auth/register", {
        email,
        password,
        name,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue("Signup failed");
    }
  }
);
// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await API.post("/auth/login", { email, password });
      const token = Cookies.get("token"); // ✅ Read token from HttpOnly Cookie
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return { user: response.data.user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await API.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = "";
      Cookies.remove("token"); // ✅ Remove Token on Logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Invalid login credentials";
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = "user already exists";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
