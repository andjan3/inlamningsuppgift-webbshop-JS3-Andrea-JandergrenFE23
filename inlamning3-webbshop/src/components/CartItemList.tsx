/*
CartItemList component:
This component is responsible for rendering a list of items in the shopping cart 

-It iterates over the cartItem-list and render a cartItemCard for each cartItem,
passing the cartItem-object as a prop to the CartItemtCard component.

*/

import { useAppSelector } from "../redux/reduxHooks";
import { selectCartItems, selectCartTotalPrice } from "../redux/productSlice";
import { CartItemCard } from "./CartItemCard";

export default function CartItemList() {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <div className="cartWrapper">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <>
          {cartItems.map((cartItem) => (
            <CartItemCard key={cartItem.product.id} cartItem={cartItem} />
          ))}
          <div className="totalPriceWrapper">
            <div>Total: </div>
            <div> {totalPrice} SEK</div>
          </div>
        </>
      )}
    </div>
  );
}
