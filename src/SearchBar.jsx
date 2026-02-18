import React from "react";
import "./Style.css";

function SearchBar({ onSearch }) {

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        onChange={handleChange}
      />
      <span className="material-icons">search</span>
    </div>
  );
}

export default SearchBar;
