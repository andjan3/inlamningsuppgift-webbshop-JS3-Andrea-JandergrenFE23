/* 
PopUpModal component:
This component is responsible for rendering a popUpModal with additional information to the product, such
as title and description. 

-It contains an internal state to manage the visibility of the modal.

*/

import {
  selectIsModalVisible,
  setModalVisible,
  selectFocusProduct,
} from "../redux/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";

export function PopUpModal() {
  const dispatch = useAppDispatch();
  const isModalVisible = useAppSelector(selectIsModalVisible);
  const product = useAppSelector(selectFocusProduct);

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setModalVisible(false));
  };

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
