import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { CartDropdown } from './CartDropdown';
import { useLibrary } from '../context/LibraryContext';
import '../styles/header.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useLibrary();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Relatos de Papel
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/books">Libros</Link>
          <Link to="/categories">Categorías</Link>
          <Link to="/authors">Autores</Link>
        </div>
        <div className="header-actions">
          <div className="cart-icon">
          <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
          </Link>
            <span className="cart-count">{cart.length}</span>
            <CartDropdown />
          </div>
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
};
