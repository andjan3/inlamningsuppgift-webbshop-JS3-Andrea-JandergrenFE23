/*
CartUtils:
-This file contains helper functions to handle cart-operations in productSlice.

Functions:
-addToCart: Adds a product to the cart or increments its quantity if it already exists.
-calculateProductTotal: calculates total price of a specific item in cart based on quantity and price.
-calculateCartTotal: calculates total cost of all items in the cart.
*/
import { Product, CartItem } from "../types";

const calculateProductTotal = (quantity: number, price: number): number => {
  return quantity * price;
};

const addToCart = (cartItems: CartItem[], product: Product): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) => item.product.id === product.id
  );

  if (existingCartItem) {
    const updatedQuantity = existingCartItem.quantity + 1;
    return cartItems.map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: updatedQuantity,
            totalPrice: calculateProductTotal(updatedQuantity, product.price),
          }
        : item
    );
  } else {
    return [
      ...cartItems,
      {
        product,
        quantity: 1,
        totalPrice: calculateProductTotal(1, product.price),
      },
    ];
  }
};

const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total: number, item: CartItem) =>
      total + item.product.price * item.quantity,
    0
  );
};
export { addToCart, calculateCartTotal };
