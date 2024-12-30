import React, { createContext, useState, useContext, useEffect } from 'react';
import booksData from '../data/books.json';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setBooks(booksData);
  }, []);

  const filterBooks = (term) => {
    setSearchTerm(term);
  };

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingBook = prevCart.find(item => item.id === book.id);
      if (existingBook) {
        return prevCart.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.precio }
            : item
        );
      }
      return [...prevCart, { ...book, quantity: 1, total: book.precio }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => {
      const existingBook = prevCart.find(item => item.id === bookId);
      if (existingBook && existingBook.quantity > 1) {
        return prevCart.map(item =>
          item.id === bookId
            ? { ...item, quantity: item.quantity - 1, total: (item.quantity - 1) * item.precio }
            : item
        );
      }
      return prevCart.filter(item => item.id !== bookId);
    });
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.total, 0).toFixed(2);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <LibraryContext.Provider value={{
      cart, addToCart, removeFromCart, getCartTotal,
      searchTerm, filterBooks, books, setBooks, clearCart
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
