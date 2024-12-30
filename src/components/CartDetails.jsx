import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { useNavigate } from 'react-router-dom';
import { Cart } from './Cart';
import '../styles/cart.css';

export const CartDetails = () => {
  const { cart, getCartTotal, clearCart } = useLibrary();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handlePayment = () => {
    setShowMessage(true);
    setTimeout(() => {
      clearCart();
      navigate('/books');
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="cart-details-container">
      {showMessage && (
        <div className="payment-success-message">
          ¡Pago completado con éxito!
        </div>
      )}
      <div className="cart-details">
        <h2>Carrito de Compras</h2>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>No hay items en el carrito</p>
            <button
              className="continue-shopping"
              onClick={() => navigate('/books')}
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <Cart />
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total a Pagar:</span>
                <span>${getCartTotal()}</span>
              </div>
              <button
                className="checkout-button"
                onClick={handlePayment}
              >
                Proceder al Pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};