// Navbar.jsx
import React from "react";
import DynamicNavigation from "./DynamicNavigation.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Navbar({ onSearch }) {
  return (
    <div className="Navbar">
      <h2>Home</h2>

      {/* Search bar */}
      <SearchBar onSearch={onSearch} />

      {/* Navigation links */}
      <DynamicNavigation
        links={[
          { id: "home", label: "Home", href: "#" },
          { id: "products", label: "Products", href: "#products" },
          { id: "contact", label: "Contact", href: "#contact" },
          { id: "about", label: "About", href: "#about" },
        ]}
        showLabelsOnMobile={true}
      />
    </div>
  );
}
