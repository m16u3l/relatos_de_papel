import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { useNavigate } from 'react-router-dom';
import { Cart } from './Cart';
import '../styles/cart.css';

export const CartDropdown = () => {
  const { cart } = useLibrary();
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown">
      <h3>Carrito de Compras</h3>
      {cart.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <>
          <Cart />
          <button 
            className="checkout-button"
            onClick={() => navigate('/cart')}
          >
            Proceder al Pago
          </button>
        </>
      )}
    </div>
  );
};