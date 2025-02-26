import React from "react";
import { useParams } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

const BookDetails = () => {
  const { bookId } = useParams();
  const { books, addToCart } = useLibrary();
  const book = books.find((r) => r.id === parseInt(bookId));

  if (!book) {
    return <h3>Libro no encontrado</h3>;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: book.id,
      titulo: book.titulo,
      autor: book.autor,
      precio: book.precio
    });
  };

  return (
    <div className="book-details">
      <h2 className="book-name">{book.titulo}</h2>
      <p><strong>Autor:</strong> {book.autor}</p>
      <p><strong>Año de lanzamiento:</strong> {book.anio}</p>
      <p><strong>Descripción:</strong> {book.resumen}</p>

      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Añadir al carrito
      </button>
    </div>
  );
};

export default BookDetails;
