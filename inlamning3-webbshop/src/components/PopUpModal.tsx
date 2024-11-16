/* 
PopUpModal component:
This component is responsible for rendering a popUpModal with additional information to the product, such
as title and description. 

-It contains an internal state to manage the visibility of the modal.

*/

import { useState } from "react";
import { ProductDescription } from "../types";

interface PopUpModalInfo {
  title: string;
  description: ProductDescription;
}

export function PopUpModal({ title, description }: PopUpModalInfo) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalVisible(false);
  };

  return (
    <>
      <button type="button" className="moreInfoBtn" onClick={openModal}>
        More information
      </button>

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
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <ul>
                  {Object.entries(description).map(([key, value]) => (
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
