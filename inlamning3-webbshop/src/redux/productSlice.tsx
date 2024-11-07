import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "../db/products.json";
import { Product } from "../types";

interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
}

export const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: productsData.products,
    filteredProducts: [] as Product[],
  } as ProductsState,
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
  },

  selectors: {
    selectFilteredProducts: (state) => {
      return state.filteredProducts;
    },
  },
});

export const { selectFilteredProducts } = productSlice.selectors;
export const { filterProduct } = productSlice.actions;
export default productSlice.reducer;
