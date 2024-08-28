import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import commonReducer from "./slices/commonSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// eslint-disable-next-line no-undef
// export const RootState = ReturnType;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch();
