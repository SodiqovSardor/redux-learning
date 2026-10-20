import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUser } from "./AddUsersSlice";
import { deleteUser } from "./DeleteUsersSlice";
import { editUser } from "./EditUsersSlice";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
});

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching users";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error deleting user";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const updated = action.payload;
        state.users = state.users.map((u) =>
          u.id === updated.id ? updated : u,
        );
        state.status = "succeeded";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error editing user";
      });
  },
});

export default usersSlice.reducer;
