import { CartItem } from "../types";
interface CartItemProps {
  cartItem: CartItem;
}

export const CartItemCard = ({ cartItem }: CartItemProps) => (
  <div key={cartItem.product.id} className="card mb-3">
    <div style={{ width: "30vw" }} className="d-flex align-items-center p-3">
      <img
        src={cartItem.product.imgUrl}
        className="img-fluid me-3"
        alt={cartItem.product.title}
        style={{ width: "100px", height: "auto" }}
      />
      <div className="flex-grow-1">
        <h5 className="card-title">{cartItem.product.title}</h5>
        <p className="card-text">Quantity: {cartItem.quantity}</p>
        <p className="card-text">Price: {cartItem.product.price} SEK</p>
        <p className="card-text">Total: {cartItem.totalPrice} SEK</p>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  </div>
);
