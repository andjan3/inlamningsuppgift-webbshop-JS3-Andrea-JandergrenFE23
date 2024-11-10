import { useAppSelector } from "../redux/reduxHooks";
import { selectCartItems } from "../redux/productSlice";
import { CartItemCard } from "./CartItemCard";
import { selectTotalPrice } from "../redux/productSlice";

export default function CartItemList() {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <div className="mb-4">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <div className="mb-2">
          {cartItems.map((cartItem) => (
            <CartItemCard key={cartItem.product.id} cartItem={cartItem} />
          ))}
          <h4>Total: {totalPrice} </h4>
        </div>
      )}
    </div>
  );
}
