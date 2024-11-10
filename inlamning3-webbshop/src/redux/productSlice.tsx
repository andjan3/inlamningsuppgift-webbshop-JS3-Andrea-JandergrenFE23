import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "../db/products.json";
import { Product, CartItem } from "../types";

interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  cartItems: CartItem[];
}

const initialState: ProductsState = {
  allProducts: productsData.products,
  filteredProducts: [],
  cartItems: [],
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
      const product = action.payload;

      if (product) {
        const existingCartItem = state.cartItems.find(
          (item) => item.product.id === product.id
        );

        if (existingCartItem) {
          existingCartItem.quantity += 1;
          existingCartItem.totalPrice =
            existingCartItem.quantity * product.price;
        } else {
          state.cartItems.push({
            product,
            quantity: 1,
            totalPrice: product.price,
          });
        }
      }
    },

    removeCartItem: (
      state: { cartItems: CartItem[] },
      action: PayloadAction<number>
    ) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
    },
  },

  selectors: {
    selectFilteredProducts: (state) => {
      return state.filteredProducts;
    },

    selectCartItems: (state) => {
      return state.cartItems;
    },
  },
});

export const { selectFilteredProducts, selectCartItems } =
  productSlice.selectors;
export const { filterProduct, addProductToCart, removeCartItem } =
  productSlice.actions;
export default productSlice.reducer;
