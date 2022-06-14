import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: any, action) {
      const itemIndex = state.cartItems.findIndex(
        (item: Product) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantityInCart++;
        toast.info(
          `You added another "${state.cartItems[itemIndex].name}" to your cart`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        const _tempProducts = { ...action.payload, quantityInCart: 1 };
        state.cartItems.push(_tempProducts);
        toast.success(`🦄 You added a "${_tempProducts.name}" to your cart!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart(state: any, action: any) {
      const updatedCart = state.cartItems.filter(
        (item: Product) => item._id !== action.payload._id
      );
      state.cartItems = updatedCart;
      toast.warning(`You removed "${action.payload.name}" from your cart!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    addOneUnit(state: any, action: any) {
      const itemIndex = state.cartItems.findIndex(
        (item: Product) => item._id === action.payload._id
      );
      state.cartItems[itemIndex].quantityInCart++;
      toast.info(`You added 1 "${action.payload.name}" to your cart!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    minusOneUnit(state: any, action: any) {
      const itemIndex = state.cartItems.findIndex(
        (item: Product) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].quantityInCart > 1) {
        state.cartItems[itemIndex].quantityInCart--;
        toast.info(`You removed 1 "${action.payload.name}" from your cart!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (state.cartItems[itemIndex].quantityInCart === 1) {
        const updatedCart = state.cartItems.filter(
          (item: Product) => item._id !== action.payload._id
        );
        state.cartItems = updatedCart;
        toast.warning(`You removed "${action.payload.name}" from your cart!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart(state: any) {
      state.cartItems = [];
      toast.error(`You removed your whole cart!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    getTotals(state: any) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal: any, cartItem: Product) => {
          const { price, quantityInCart } = cartItem;
          const itemTotal = price * quantityInCart;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantityInCart;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addOneUnit,
  minusOneUnit,
  clearCart,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
