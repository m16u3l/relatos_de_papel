import React, { useContext, useState } from "react";
import "../styles/styles.css";
import { Book } from "../components/Book";
import { LinearProgress } from "@mui/material";
import { SearchBar } from "../components/SearchBar";
import { useBooks } from "../context/LibraryContext";
import { FaSearch } from "react-icons/fa";

export const Overview = () => {
  const { books, searchTerm } = useBooks();
  const { filterBooks } = useBooks();

  const handleSearch = (event) => {
    filterBooks(event.target.value);
  };
  const filteredBooks = books.filter(book =>
    book.libro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overview">
      <div className="header-section">
        <h2 className="section-title">Libros Disponibles</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar libros..."
            onChange={handleSearch}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
      <div className="book-container">
        {books.length > 0 ? (
          filteredBooks.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              libro={book.libro}
              titulo_original={book.titulo_original}
              fecha_de_lanzamiento={book.fecha_de_lanzamiento}
              autor={book.autor}
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
