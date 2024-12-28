import React, { createContext, useState, useContext, useEffect } from 'react';
import booksData from '../data/books.json';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(booksData);
  }, []);
  const filterBooks = (term) => {
    setSearchTerm(term);
  };

  return (
    <LibraryContext.Provider value={{ searchTerm, filterBooks, books, setBooks }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useBooks = () => useContext(LibraryContext);
