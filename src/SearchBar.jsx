import React from "react";
import "./Style.css";

function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
      />
      <span className="material-icons">search</span>

    </div>
  );
}

export default SearchBar;
