/*
Productard component:
This component is responsible for rendering a single product and 
allowing users to add a product to the cart.

-It takes the product-object as a prop from ProductList-component.
-Dispatches addProductToCart and passing the product-object as a argument to update cartItems-state.
-Also passing product title and descrption as props to popUpModal-component

*/

import { Product } from "../types";
import { PopUpModal } from "./PopUpModal";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import {
  addProductToCart,
  selectIsModalVisible,
  setModalVisible,
  setFocusProduct,
} from "../redux/productSlice";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const isModalVisible = useAppSelector(selectIsModalVisible);

  const handleOnClick = (product: Product) => {
    dispatch(addProductToCart(product));
  };
  const openModal = () => {
    dispatch(setModalVisible(true));
  };

  const updateFocusProduct = (product: Product) => {
    dispatch(setFocusProduct(product));
  };
  return (
    <>
      <div className="card mb-3 d-flex flex-column flex-md-row productCardContainer">
        <img
          src={product.imgUrl}
          className="card-img-top"
          alt={"Image of" + product.title}
        />

        <div className="card-body d-flex flex-column  justify-content-center cardBody">
          <h5 className="card-title">{product.title}</h5>
          {isModalVisible && <PopUpModal />}
          <button
            type="button"
            className="moreInfoBtn"
            onClick={() => {
              openModal();
              updateFocusProduct(product);
            }}
          >
            More information
          </button>
        </div>
        <div className="cardFooter d-flex  align-items-center">
          <p>{product.price} SEK</p>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleOnClick(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
