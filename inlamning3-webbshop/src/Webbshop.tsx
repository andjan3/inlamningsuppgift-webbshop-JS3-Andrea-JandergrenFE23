import React from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ProductList from "./components/ProductList";

function Webbshop() {
  return (
    <div className="App">
      <Searchbar />
      <ProductList />
    </div>
  );
}

export default Webbshop;
