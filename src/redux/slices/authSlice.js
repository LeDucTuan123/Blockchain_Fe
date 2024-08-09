import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLogin: false,
  user: null,
  loading: false,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        toast.success("Đăng nhập thành công");
      }

      const data = res.data;
      console.log("data", data);

      localStorage.setItem("user", JSON.stringify(data));

      const getUser = JSON.parse(localStorage.getItem("user"));
      console.log(getUser);

      return data;
    } catch (error) {}
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      // state.isLogin = true;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
  },
});

const authReducer = authSlice.reducer;

export const { setIsLogin } = authSlice.actions;

export default authReducer;
