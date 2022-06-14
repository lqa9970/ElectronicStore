import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  status: null,
  error: null,
};

const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
