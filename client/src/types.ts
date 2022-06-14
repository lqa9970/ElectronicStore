export enum Theme {
  Dark = "dark",
  Light = "light",
}

export type AppState = {
  product: ProductState;
  cart: CartState;
};

export type CartState = {
  cartItems: Product[];
  cartTotalAmount: number;
};

export type ProductState = {
  products: Product[];
};

export type ThemeContextType = {
  theme: Theme;
  switchTheme: (switchTheme: Theme) => void;
};

export type Product = {
  name: string;
  categories: string[];
  description: string;
  img: string;
  price: number;
  quantity: number;
  _id: string;
  cartItems: Product;
  quantityInCart: number;
  cartTotalQuantity: number;
};

export type User = {
  firstName: string;
  lastName: string;
  _id: string;
  email: string;
};
