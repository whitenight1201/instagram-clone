import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import messageReducer from "./slices/message";
import authReducer from "./slices/auth";
import postReducer from "./slices/post";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    posts: postReducer
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
