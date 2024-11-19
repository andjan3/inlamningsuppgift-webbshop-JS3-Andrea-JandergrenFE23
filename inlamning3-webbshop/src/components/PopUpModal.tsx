/* 
PopUpModal component:
This component is responsible for rendering a popUpModal with additional information to the product, such
as title and description. 

-Select product details and modal visibility state from Redux.
- Handles closing of the modal through user interaction.
*/

import {
  selectIsModalVisible,
  setModalVisible,
  selectFocusProduct,
} from "../redux/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { Product } from "../types";

export function PopUpModal() {
  const dispatch = useAppDispatch();
  const isModalVisible: boolean = useAppSelector(selectIsModalVisible);
  const product: Product | null = useAppSelector(selectFocusProduct);

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setModalVisible(false));
  };

  if (!product) return null;

  return (
    <>
      {isModalVisible && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          role="dialog"
          onClick={closeModal}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{product?.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <ul>
                  {product?.description &&
                    Object.entries(product?.description).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
