 import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">KnotBoard</div>

      <div className="navbar-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/settings">Settings</a>
      </div>
    </nav>
  );
}

export default Navbar;