import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countCart: 0,
  searchTextValue: "",
};

const commonSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCountCart: (state, action) => {
      state.countCart = action.payload;
    },
    setSearchTextValue: (state, action) => {
      state.searchTextValue = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

const commonReducer = commonSlice.reducer;

export const { setCountCart, setSearchTextValue } = commonSlice.actions;

export default commonReducer;
