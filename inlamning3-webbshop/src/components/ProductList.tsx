/*
ProductList component:
This component is responsible for rendering a list of filtered products. 

-It iterates over the filteredProducts-list and render a ProductCard for each product,
passing the product-object as a prop to the ProductCard component.

*/
import ProductCard from "./ProductCard";
import { useAppSelector } from "../redux/reduxHooks";
import { selectFilteredProducts } from "../redux/productSlice";
import { Product } from "../types";

export default function ProductList() {
  const filteredProducts: Product[] = useAppSelector(selectFilteredProducts);
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
