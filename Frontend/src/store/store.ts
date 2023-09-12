import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import messageReducer from "./slices/message";
import authReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer
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
