import React from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import '../styles/book.css';

export const Book = ({ id, titulo, titulo_original, fecha_de_lanzamiento, autor, descripcion, precio }) => {
  const { addToCart } = useLibrary();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      titulo,
      titulo_original,
      autor,
      precio
    });
  };

  return (
    <Link id={id} to={`/books/${id}`} className="card">
      <h3>{titulo} ({titulo_original})</h3>
      <p><strong>Autor:</strong> {autor}</p>
      <p><strong>Fecha de lanzamiento:</strong> {fecha_de_lanzamiento}</p>
      <p><strong>Descripción:</strong> {descripcion}</p>
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
