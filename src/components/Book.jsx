import React from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import '../styles/book.css';

export const Book = ({ id, titulo, anio, autor, resumen, precio, stock = 0 }) => {
  const { addToCart, cart } = useLibrary();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      titulo,
      autor,
      precio,
      stock
    });
  };

  const getCartItemQuantity = () => {
    const cartItem = cart.find(item => item.id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  const isAvailableForCart = () => {
    const cartQuantity = getCartItemQuantity();
    return stock > cartQuantity;
  };

  return (
    <Link id={id} to={`/books/${id}`} className="card">
      <h3>{titulo}</h3>
      <p><strong>Autor:</strong> {autor}</p>
      <p><strong>Año de lanzamiento:</strong> {anio}</p>
      <p><strong>Descripción:</strong> {resumen}</p>
      <p><strong>Precio:</strong> {precio}</p>
      <p><strong>Stock disponible:</strong> {stock - getCartItemQuantity()}</p>
      {isAvailableForCart() ? (
        <button 
          id={`add-to-cart-${id}`}
          onClick={handleAddToCart} 
          className="add-to-cart-btn"
        >
          Añadir al carrito
        </button>
      ) : (
        <p className="out-of-stock">
          {stock === 0 ? 'Agotado' : 'Máximo en carrito'}
        </p>
      )}
    </Link>
  );
};