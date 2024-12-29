import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import '../styles/cart.css';

export const Cart = () => {
  const { cart, removeFromCart } = useLibrary();

  return (
    <table className="cart-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <tr key={item.id} className="cart-item">
            <td>{item.titulo}</td>
            <td>{item.quantity}</td>
            <td>${item.precio}</td>
            <td>${Number(item.total).toFixed(2)}</td>
            <td>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                ×
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Total Final:</td>
          <td colSpan="2">
            ${cart.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};