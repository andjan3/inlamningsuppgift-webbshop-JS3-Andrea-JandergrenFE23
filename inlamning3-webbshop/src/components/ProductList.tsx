import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../redux/productSlice";

export default function ProductList() {
  const filteredProducts = useSelector(selectFilteredProducts);
  return (
    <>
      <div className="productList">
        <h2>Search result:</h2>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
