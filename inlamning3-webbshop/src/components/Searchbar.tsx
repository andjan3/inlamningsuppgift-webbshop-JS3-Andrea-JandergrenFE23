import { useState } from "react";
import { InputState } from "../types";

export default function Searchbar() {
  const initialState: InputState = { input: "" };
  const [searchInput, setSearchInput] = useState<InputState>(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchInput.input);
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
