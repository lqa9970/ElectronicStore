// Fetching in this file is deprecated and got replaced by RTK Queries in the `APIs` folder

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  status: null,
  error: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3030/api/v1/products");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending as any]: (state: any, action: any) => {
      state.status = "pending";
    },
    [getProducts.fulfilled as any]: (state: any, action: any) => {
      state.status = "success";
      state.item = action.payload;
    },
    [getProducts.rejected as any]: (state: any, action: any) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
