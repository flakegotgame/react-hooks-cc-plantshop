import React from "react";

function Search({ onSearch }) {
  return (
    <input
      className="searchbar"
      type="text"
      placeholder="Search for plants"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default Search;


