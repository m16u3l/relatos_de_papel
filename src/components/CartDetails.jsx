import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { useNavigate } from 'react-router-dom';
import { Cart } from './Cart';
import { paymentService } from '../services/paymentService';
import { bookService } from '../services/booksService';
import '../styles/cart.css';

export const CartDetails = () => {
  const { cart, getCartTotal, clearCart, setBooks } = useLibrary();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState(null);

  const refreshBooks = async () => {
    try {
      const updatedBooks = await bookService.getBooks();
      setBooks(updatedBooks);
    } catch (err) {
      console.error('Error refreshing books:', err);
    }
  };

  const handlePayment = async () => {
    try {
      setShowMessage(false);
      setError(null);
      await paymentService.processSale(cart);
      setShowMessage(true);
      await refreshBooks();
      setTimeout(() => {
        clearCart();
        navigate('/books');
        setShowMessage(false);
      }, 3000);
    } catch (err) {
      setError('Error al procesar el pago');
      console.error('Payment error:', err);
    }
  };

  return (
    <div className="cart-details-container">
      {(showMessage || error) && (
        <div className={`message ${showMessage ? 'success' : 'error'}`}>
          {showMessage ? '¡Pago completado con éxito!' : error}
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
                Pagar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};