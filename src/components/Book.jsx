import React from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import '../styles/book.css';

export const Book = ({ id, titulo, anio, autor, resumen, precio }) => {
  const { addToCart } = useLibrary();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      titulo,
      autor,
      precio
    });
  };

  return (
    <Link id={id} to={`/books/${id}`} className="card">
      <h3>{titulo}</h3>
      <p><strong>Autor:</strong> {autor }</p>
      <p><strong>Año de lanzamiento:</strong> {anio}</p>
      <p><strong>Descripción:</strong> {resumen}</p>
      <p><strong>Precio:</strong> {precio}</p>
      <button 
        id={`add-to-cart-${id}`}
        onClick={handleAddToCart} 
        className="add-to-cart-btn"
      >
        Añadir al carrito
      </button>
    </Link>
  );
};
