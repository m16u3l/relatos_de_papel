import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { LibraryContext } from "../context/LibraryContext";

const BookDetails = () => {
  const { bookId } = useParams();
  const { books } = useContext(LibraryContext);
  const book = books.find((r) => r.id === bookId);

  if (!book) {
    return <h2>Libro no encontrado</h2>;
  }

  console.log(book.name);

  return (
    <div className="book-details">
      <h2 className="book-name">{book.name}</h2>
      <p className="book-cuisine">Cocina: {book.cuisine}</p>
      <p className="book-rating">Calificación: {book.rating} / 5</p>
    </div>
  );
};

export default BookDetails;
