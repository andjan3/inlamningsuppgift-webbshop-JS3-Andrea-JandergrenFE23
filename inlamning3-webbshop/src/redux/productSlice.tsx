import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "../db/products.json";
import { Product, CartItem } from "../types";

interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  cartItems: CartItem[];
  totalPrice: number;
}

const initialState: ProductsState = {
  allProducts: productsData.products,
  filteredProducts: [],
  cartItems: [],
  totalPrice: 0,
};

const addToCart = (cartItems: CartItem[], product: Product): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) => item.product.id === product.id
  );
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * product.price,
          }
        : item
    );
  } else {
    return [
      ...cartItems,
      {
        product,
        quantity: 1,
        totalPrice: product.price,
      },
    ];
  }
};

const calculateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total: number, item: CartItem) =>
      total + item.product.price * item.quantity,
    0
  );
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterProduct: (state, action: PayloadAction<string>) => {
      const searchFilter = action.payload.trim().toLowerCase();
      state.filteredProducts = state.allProducts.filter((product) => {
        const descriptionText = Object.values(product.description)
          .join(" ")
          .toLowerCase();
        return (
          product.title.toLowerCase().includes(searchFilter) ||
          descriptionText.includes(searchFilter)
        );
      });
    },
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.cartItems = addToCart(state.cartItems, action.payload);
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },

    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
  },

  selectors: {
    selectFilteredProducts: (state) => {
      return state.filteredProducts;
    },

    selectCartItems: (state) => {
      return state.cartItems;
    },

    selectTotalPrice: (state) => {
      return state.totalPrice;
    },
  },
});

export const { selectFilteredProducts, selectCartItems, selectTotalPrice } =
  productSlice.selectors;
export const { filterProduct, addProductToCart, removeCartItem } =
  productSlice.actions;
export default productSlice.reducer;
