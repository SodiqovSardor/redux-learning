import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE",
    });
    return userId;
  },
);
