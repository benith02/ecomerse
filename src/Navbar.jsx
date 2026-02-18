// Navbar.jsx
import React from "react";
import DynamicNavigation from "./DynamicNavigation.jsx";
import SearchBar from "./SearchBar.jsx";
import './Style.css'
import { Link } from "react-router-dom";

export default function Navbar({ onSearch }) {
  return (
    <div className="Navbar">
      <Link to="/" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "2rem", marginLeft: "10px"}} className="page-Logo">Monocart</Link>

      {/* Search bar */}
      <SearchBar onSearch={onSearch} />

      {/* Navigation links */}
      <DynamicNavigation
        links={[
          { id: "home", label: "Home", href: "/" },
          { id: "cart", label: "My Cart", href: "/cart" },
          { id: "orders", label: "Your Orders", href: "/OrderPage" },
          { id: "login", label: "Login", href: "/login" },
        ]}
        showLabelsOnMobile={true}
      />
    </div>
  );
}
