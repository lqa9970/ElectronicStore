import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../context/theme-context";
import { Link } from "react-router-dom";

import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

import { AppState, Product } from "../types";
import {
  removeFromCart,
  addOneUnit,
  minusOneUnit,
  clearCart,
  getTotals,
} from "../redux/Slices/CartSlice";

const CartPage = () => {
  const cart = useSelector((state: AppState) => state.cart);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  const handleDeleteItem = (cartItem: Product) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleMinusOne = (cartItem: Product) => {
    dispatch(minusOneUnit(cartItem));
  };

  const handleAddOneUnit = (cartItem: Product) => {
    dispatch(addOneUnit(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className={`cartPage ${theme}`}>
        <h1>Your cart</h1>
        <Link to="/product">
          <IconButton>
            <ArrowBackIcon color="primary" />
          </IconButton>
        </Link>
        {cart.cartItems.length === 0 ? (
          <div className="cartPage__empty">
            <p>Your cart is currently empty...</p>
            <div className="button-area">
              <Button className="checkout-button" variant="contained" disabled>
                Checkout
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="cartPage__content">
              <div className="cartPage__content__titles">
                <h2 className="name">Product</h2>
                <h2 className="price">Price</h2>
                <h2 className="quantity">Quantity</h2>
                <h2 className="total">Total</h2>
              </div>
              <div className="cartPage__content__items">
                {cart.cartItems.map((cartItem) => (
                  <div
                    className={`cartPage__content__item ${theme}`}
                    key={cartItem._id}
                  >
                    <div className="cartPage__content__item__detail">
                      <img
                        src={cartItem.img}
                        alt={`${cartItem.name}'s image`}
                      />
                      <div>
                        <h2>{cartItem.name}</h2>
                        <IconButton onClick={() => handleDeleteItem(cartItem)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </div>
                    </div>
                    <div className="cartPage__content__item__price">
                      € {cartItem.price}
                    </div>
                    <div
                      className={`cartPage__content__item__quantity ${theme}`}
                    >
                      <button onClick={() => handleMinusOne(cartItem)}>
                        -
                      </button>
                      <div className="count">{cartItem.quantityInCart}</div>
                      <button onClick={() => handleAddOneUnit(cartItem)}>
                        +
                      </button>
                    </div>
                    <div className="cartPage__content__item__total-price">
                      € {cartItem.price * cartItem.quantityInCart}
                    </div>
                  </div>
                ))}
              </div>
              <div className={`cartPage__content__footer ${theme}`}>
                <button
                  className={`cartPage__content__footer__clear ${theme}`}
                  onClick={() => handleClearCart()}
                >
                  Clear cart
                </button>
                <div className="cartPage__content__footer__checkout">
                  <div className="cartPage__content__footer__checkout__subtotal">
                    <span>Subtotal: </span>
                    <span className="cartPage__content__footer__checkout__total-cost">
                      € {cart.cartTotalAmount}
                    </span>
                  </div>
                  <div className="button-area">
                    <Button className="checkout-button" variant="contained">
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
