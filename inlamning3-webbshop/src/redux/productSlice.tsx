/* 
  productSlice: 
  - This slice manages the state related to products in the application.

  -Functionality:
    -filterProduct: filtering products based on input provided by user.
    -addProductToCart: adding products to the cart, the specific product object is passed as payload.
    -removeCartItem: removing products from the cart, the products id is passed as payload.

 -State: 
  -allProducts: List of all products from the external file products.json
  -filteredProducts: List of products that match the search applied by the user.
  -cartItems: Contains a list of items added to the shopping cart. 
  -totalPrice: Holds the total price of all added products in the cart

*/

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

      const filtered = state.allProducts.filter((product) => {
        const descriptionText = Object.values(product.description)
          .join(" ")
          .toLowerCase();

        return (
          product.title.toLowerCase().includes(searchFilter) ||
          descriptionText.includes(searchFilter)
        );
      });

      state.filteredProducts = filtered;
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
