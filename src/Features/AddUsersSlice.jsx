import { createAsyncThunk } from "@reduxjs/toolkit";

export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const data = await res.json();
  return data;
});
