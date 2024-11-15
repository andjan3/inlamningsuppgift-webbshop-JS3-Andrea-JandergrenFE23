import "./App.css";
import Searchbar from "./components/Searchbar";
import ProductList from "./components/ProductList";
import CartItemList from "./components/CartItemList";
import { useAppSelector } from "./redux/reduxHooks";
import { selectFilteredProducts } from "./redux/productSlice";

function Webbshop() {
  const filteredProducts = useAppSelector(selectFilteredProducts);

  const renderContent = () => {
    if (filteredProducts.length === 0) {
      return (
        <h2>
          Search for items like "T-shirt"or "Denim" to explore our collection.
        </h2>
      );
    } else {
      return (
        <>
          <ProductList />
          <CartItemList />
        </>
      );
    }
  };

  return (
    <div className="App">
      <Searchbar />
      <div className="wrapper">{renderContent()}</div>
    </div>
  );
}

export default Webbshop;
