/*
Searchbar Component:
This component is responsible for rendering the search form and handling user input.

Functionality:
- Updates the filteredProducts state by dispatching and passing users input as an argument when the form is submitted.
- Has two internal states:
    -searchInput - to store the current search text entered by the user.
    -isSearchSubmitted - to track whether the form has been submitted and help show a "No products found" message if no results are found.

*/

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { filterProduct, selectFilteredProducts } from "../redux/productSlice";

interface InputState {
  input: string;
}

export default function Searchbar() {
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector(selectFilteredProducts);

  const initialState: InputState = { input: "" };
  const [searchInput, setSearchInput] = useState<InputState>(initialState);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(filterProduct(searchInput.input));
    setSearchInput({ input: "" });
    setIsSearchSubmitted(true);
  };

  return (
    <>
      <div className="d-flex justify-content-center my-3">
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchInput.input}
            onChange={(e) =>
              setSearchInput((prevState) => ({
                ...prevState,
                input: e.target.value,
              }))
            }
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>

      {filteredProducts.length === 0 && isSearchSubmitted && (
        <div className="noProductsContainer">
          <h2>No products found. Try again!</h2>
        </div>
      )}
    </>
  );
}
