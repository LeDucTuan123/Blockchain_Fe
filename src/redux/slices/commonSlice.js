import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countCart: 0,
};

const commonSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCountCart: (state, action) => {
      state.countCart = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

const commonReducer = commonSlice.reducer;

export const { setCountCart } = commonSlice.actions;

export default commonReducer;
