import { useState } from "react";
import { useAppDispatch } from "../redux/reduxHooks";
import { filterProduct } from "../redux/productSlice";

interface InputState {
  input: string;
}

export default function Searchbar() {
  const dispatch = useAppDispatch();
  const initialState: InputState = { input: "" };
  const [searchInput, setSearchInput] = useState<InputState>(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchInput.input);
    dispatch(filterProduct(searchInput.input));
    setSearchInput({ input: "" });
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
              setSearchInput((oldState) => ({
                ...oldState,
                input: e.target.value,
              }))
            }
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
