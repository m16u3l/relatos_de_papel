import React, { useEffect, useState } from "react";
import { Book } from "../components/Book";
import { LinearProgress } from "@mui/material";
import { SearchBar } from "../components/SearchBar";
import { useLibrary } from "../context/LibraryContext";
import "../styles/styles.css";

export const Overview = () => {
  const { books, searchTerm, filterBooks } = useLibrary();
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = (value) => {
    filterBooks(value);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      const filtered = books.filter(book =>
        book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
      setLoading(false);
    }, 2000);
  }, [books, searchTerm]);

  return (
    <div className="overview">
      <div className="header-section">
        <h3 className="section-title">Libros Disponibles</h3>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="book-container">
        {loading ? (
          <LinearProgress className="linear-progress" />
        ) : (
          filteredBooks.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              titulo={book.titulo}
              anio={book.anio}
              autor={book.autor}
              resumen={book.resumen}
              precio={book.precio}
            />
          ))
        )}
      </div>
    </div>
  );
};
