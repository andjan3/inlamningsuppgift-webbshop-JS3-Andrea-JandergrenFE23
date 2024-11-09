import { Product } from "../types";
import { PopUpModal } from "./PopUpModal";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <>
      <div className="card mb-3" style={{ width: "60vw" }}>
        <div className="row g-0">
          <div className="col-md-2">
            <img
              src={product.imgUrl}
              className="img-fluid rounded-start"
              alt={"Image of" + product.title}
            />
          </div>

          <div className="col-md-10 d-flex justify-content-between align-items-center">
            <div className="col-md-4">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <PopUpModal
                  title={product.title}
                  description={product.description}
                />
              </div>
            </div>
            <div className="col-md-2 d-flex flex-column align-items-center">
              <p className="card-text">{product.price} SEK</p>
              <button type="button" className="btn btn-outline-primary">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
