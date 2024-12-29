import React from "react";
import "../styles/styles.css";
import { Book } from "../components/Book";
import { LinearProgress } from "@mui/material";
import { SearchBar } from "../components/SearchBar";
import { useLibrary } from "../context/LibraryContext";

export const Overview = () => {
  const { books, searchTerm, filterBooks } = useLibrary();

  const handleSearch = (value) => {
    filterBooks(value);
  };
  const filteredBooks = books.filter(book =>
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overview">
      <div className="header-section">
        <h3 className="section-title">Libros Disponibles</h3>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="book-container">
        {books.length > 0 ? (
          filteredBooks.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              titulo={book.titulo}
              titulo_original={book.titulo_original}
              fecha_de_lanzamiento={book.fecha_de_lanzamiento}
              autor={book.autor}
              descripcion={book.descripcion}
              precio={book.precio}
            />
          ))
        ) : (
          <LinearProgress className="linear-progress" />
        )}
      </div>
    </div>
  );
};
