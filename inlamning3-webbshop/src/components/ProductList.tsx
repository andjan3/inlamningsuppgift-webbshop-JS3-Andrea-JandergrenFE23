import ProductCard from "./ProductCard";
import { useAppSelector } from "../redux/reduxHooks";
import { selectFilteredProducts } from "../redux/productSlice";

export default function ProductList() {
  const filteredProducts = useAppSelector(selectFilteredProducts);
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
