import { CartItem } from "../types";
import { useAppDispatch } from "../redux/reduxHooks";
import { removeCartItem } from "../redux/productSlice";

interface CartItemProps {
  cartItem: CartItem;
}

export const CartItemCard = ({ cartItem }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleOnClick = (cartItemId: number) => {
    dispatch(removeCartItem(cartItemId));
  };

  return (
    <div key={cartItem.product.id} className="card mb-2">
      <div className="d-flex align-items-center p-3">
        <img
          src={cartItem.product.imgUrl}
          className="img-fluid me-3 cartItemImg"
          alt={cartItem.product.title}
        />
        <div className="flex-grow-1">
          <h5 className="card-title">{cartItem.product.title}</h5>
          <p className="card-text">Quantity: {cartItem.quantity}</p>
          <div className="test">
            <p>Price: {cartItem.product.price} SEK</p>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleOnClick(cartItem.product.id)}
            >
              Delete
            </button>
          </div>

          <p className="card-text">Total: {cartItem.totalPrice} SEK</p>
        </div>
      </div>
    </div>
  );
};
