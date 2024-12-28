import React from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../context/LibraryContext";

const BookDetails = () => {
  const { bookId } = useParams();
  const { books } = useBooks();
  const book = books.find((r) => r.id === parseInt(bookId));

  if (!book) {
    return <h3>Libro no encontrado</h3>;
  }

  return (
    <div className="book-details">
      <h2 className="book-name">{book.libro} ({book.titulo_original})</h2>
      <p><strong>Autor:</strong> {book.autor}</p>
      <p><strong>Fecha de lanzamiento:</strong> {book.fecha_de_lanzamiento}</p>
      <p><strong>Descripción:</strong> {book.descripcion}</p>
    </div>
  );
};

export default BookDetails;
