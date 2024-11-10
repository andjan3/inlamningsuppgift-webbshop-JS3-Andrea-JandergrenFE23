import React from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ProductList from "./components/ProductList";
import CartItemList from "./components/CartItemList";

function Webbshop() {
  return (
    <div className="App">
      <Searchbar />
      <div className="wrapper">
        <ProductList />
        <CartItemList />
      </div>
    </div>
  );
}

export default Webbshop;
