import { createAsyncThunk } from "@reduxjs/toolkit";

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ userId, updatedUser }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      },
    );
    const data = await res.json();
    return data;
  },
);
