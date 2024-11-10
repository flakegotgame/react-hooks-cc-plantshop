import React from "react";

function Search({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for plants"
      onChange={handleChange}
    />
  );
}

export default Search;

