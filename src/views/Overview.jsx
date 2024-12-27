import React, { useContext } from "react";
import "../styles/styles.css";
import { Book } from "../components/Book";
import { LibraryContext } from "../context/LibraryContext";
import { LinearProgress } from "@mui/material";

export const Overview = () => {
  const { books } = useContext(LibraryContext);

  return (
    <div>
      <h2 className="center-text">Libros Disponibles</h2>
      <div className="book-container">
        {books.length > 0 ? (
          books.map((book, index) => (
            <Book
              key={index}
              id={book.id}
              name={book.name}
              cuisine={book.cuisine}
              rating={book.rating}
            />
          ))
        ) : (
          <LinearProgress color="secondary" />
        )}
        { }
      </div>
    </div>
  );
};
