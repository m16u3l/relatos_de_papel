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
          books.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              libro={book.libro}
              titulo_original={book.titulo_original}
              fecha_de_lanzamiento={book.fecha_de_lanzamiento}
              autora={book.autor}
              descripcion={book.descripcion}
            />
          ))
        ) : (
          <LinearProgress className="linear-progress" />
        )}
      </div>
    </div>
  );
};
