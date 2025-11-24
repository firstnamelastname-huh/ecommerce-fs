// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <header className="header">
      <Link to="/">
      <h1>E-commerce App</h1>
      </Link>
      <nav>
        <Link to="/">Products</Link>
        <Link to="/cart">
          Cart{cartCount > 0 && <span className="header__cart-count">({cartCount})</span>}
        </Link>
        <Link to="/orders">My Orders</Link>
      </nav>
    </header>
  );
}

export default Header;
