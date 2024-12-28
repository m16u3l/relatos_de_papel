import React, { useContext, useState } from "react";
import "../styles/styles.css";
import { Book } from "../components/Book";
import { LibraryContext } from "../context/LibraryContext";
import { LinearProgress } from "@mui/material";
import { SearchBar } from "../components/SearchBar";

export const Overview = () => {
  const { books } = useContext(LibraryContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(book =>
    book.libro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h2 className="center-text">Libros Disponibles</h2>
      <SearchBar onSearch={handleSearch} />
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
