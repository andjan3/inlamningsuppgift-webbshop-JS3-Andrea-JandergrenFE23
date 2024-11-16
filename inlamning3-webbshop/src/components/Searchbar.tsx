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
