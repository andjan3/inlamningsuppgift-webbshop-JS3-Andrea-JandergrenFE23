import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "../db/products.json";
import { Product, CartItem } from "../types";
import { addToCart, calculateCartTotal } from "../utils/cartUtils";

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
      state.totalPrice = calculateCartTotal(state.cartItems);
    },

    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
      state.totalPrice = calculateCartTotal(state.cartItems);
    },
  },

  selectors: {
    selectFilteredProducts: (state: ProductsState) => {
      return state.filteredProducts;
    },

    selectCartItems: (state: ProductsState) => {
      return state.cartItems;
    },

    selectTotalPrice: (state: ProductsState) => {
      return state.totalPrice;
    },
  },
});

export const { selectFilteredProducts, selectCartItems, selectTotalPrice } =
  productSlice.selectors;
export const { filterProduct, addProductToCart, removeCartItem } =
  productSlice.actions;
export default productSlice.reducer;
