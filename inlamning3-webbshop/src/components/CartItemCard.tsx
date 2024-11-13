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
    <>
      <div key={cartItem.product.id} className="card cartItemContainer">
        <img
          src={cartItem.product.imgUrl}
          className="card-img-top cartItemImg"
          alt={cartItem.product.title}
          style={{ width: "6rem", height: "auto" }}
        />
        <div className="card-body" style={{ flex: "1" }}>
          <h5 className="cardTitle">{cartItem.product.title}</h5>
          <p className="cardText">Quantity: {cartItem.quantity}</p>
          <div className="cartItemDetails">
            <p className="cardText">Price: {cartItem.product.price} SEK</p>
            <button
              type="button"
              className="deleteBtn"
              onClick={() => handleOnClick(cartItem.product.id)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>

          <p className="cardText">Total: {cartItem.totalPrice} SEK</p>
        </div>
      </div>
    </>
  );
};
