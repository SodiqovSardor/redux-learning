import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/GetUsersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
