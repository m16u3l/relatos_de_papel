import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { Cart } from './Cart';
import '../styles/cart.css';

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