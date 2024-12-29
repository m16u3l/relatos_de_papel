import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import '../styles/cart.css';
import { Cart } from './Cart';

export const CartDropdown = () => {
  const { cart } = useLibrary();

  return (
    <div className="cart-dropdown">
      <h3>Carrito de Compras</h3>
      {cart.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <Cart />
      )}
    </div>
  );
};