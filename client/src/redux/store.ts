import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "./Slices/CartSlice";

import { productsApi } from "./APIs/productsAPI";
import { usersApi } from "./APIs/userAPI";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(getTotals());

// These belong to the deprecated parts

// store.dispatch(getProducts());
// store.dispatch(getUsers());

// products: productReducer,
// users: userReducer,
