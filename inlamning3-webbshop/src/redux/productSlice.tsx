/* 
  productSlice: 
  - This slice manages the state related to products in the application.

 === Functionality  ===
  -filterProduct: filtering products based on input provided by user.
  -addProductToCart: adding products to the cart, the specific product object is passed as payload.
  -removeCartItem: removing products from the cart, the products id is passed as payload.
  - setFocusProduct: Sets a specific product as the one to display details for.
  - setModalVisible: Toggles the visibility of the modal popup.

  === State ===
  -filteredProducts: List of products that match the search applied by the user.
  -cartItems: Contains a list of items added to the shopping cart. 
  -focusProduct: Contains a single product of which details should be displayd in popUpModal.
  -isModalVisible: boolean, holding wheather the popUpModal should be visible or not.

  === Memoized selector ===
  selectCartTotalPrice: calculating total price of products in the cart.

*/

import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import productsData from "../db/products.json";
import { Product, CartItem } from "../types";
import { addToCart } from "../utils/cartUtils";

interface ProductsState {
  filteredProducts: Product[];
  cartItems: CartItem[];
  focusProduct: Product | null;
  isModalVisible: boolean;
}

const initialState: ProductsState = {
  filteredProducts: [],
  cartItems: [],
  focusProduct: null,
  isModalVisible: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterProduct: (state, action: PayloadAction<string>) => {
      const searchFilter = action.payload.trim().toLowerCase();

      state.filteredProducts = productsData.products.filter((product) => {
        const descriptionText = Object.values(product.description)
          .join(" ")
          .toLowerCase();

        return (
          product.title.toLowerCase().includes(searchFilter) ||
          descriptionText.includes(searchFilter)
        );
      });
    },

    setModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isModalVisible = action.payload;
    },
    setFocusProduct: (state, action: PayloadAction<Product>) => {
      state.focusProduct = action.payload;
    },
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.cartItems = addToCart(state.cartItems, action.payload);
    },

    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
    },
  },

  selectors: {
    selectFilteredProducts: (state: ProductsState) => {
      return state.filteredProducts;
    },

    selectCartItems: (state: ProductsState) => {
      return state.cartItems;
    },

    selectFocusProduct: (state: ProductsState) => {
      return state.focusProduct;
    },

    selectIsModalVisible: (state: ProductsState) => {
      return state.isModalVisible;
    },
  },
});

export const {
  selectFilteredProducts,
  selectCartItems,
  selectFocusProduct,
  selectIsModalVisible,
} = productSlice.selectors;
export const {
  filterProduct,
  addProductToCart,
  removeCartItem,
  setFocusProduct,
  setModalVisible,
} = productSlice.actions;
export default productSlice.reducer;

// Memoized selector for calculating the total price of cart items.
// This ensures the total is only recalculated when the cartItems array changes.

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => {
    if (cartItems.length === 0 || !cartItems) {
      return 0;
    }
    return cartItems.reduce(
      (total: number, item: CartItem) =>
        total + item.product.price * item.quantity,
      0
    );
  }
);
