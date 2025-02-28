import React from "react";
import { useParams } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

const BookDetails = () => {
  const { bookId } = useParams();
  const { books, addToCart, cart } = useLibrary();
  const book = books.find((r) => r.id === parseInt(bookId));

  if (!book) {
    return <h3>Libro no encontrado</h3>;
  }

  const getCartItemQuantity = () => {
    const cartItem = cart.find(item => item.id === book.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const isAvailableForCart = () => {
    const cartQuantity = getCartItemQuantity();
    return book.stock > cartQuantity;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: book.id,
      titulo: book.titulo,
      autor: book.autor,
      precio: book.precio,
      stock: book.stock
    });
  };

  return (
    <div className="book-details">
      <h2 className="book-name">{book.titulo}</h2>
      <p><strong>Autor:</strong> {book.autor}</p>
      <p><strong>Año de lanzamiento:</strong> {book.anio}</p>
      <p><strong>Descripción:</strong> {book.resumen}</p>
      <p><strong>Precio:</strong> ${book.precio}</p>
      <p><strong>Stock disponible:</strong> {book.stock - getCartItemQuantity()}</p>

      {isAvailableForCart() ? (
        <button 
          onClick={handleAddToCart} 
          className="add-to-cart-btn"
        >
          Añadir al carrito
        </button>
      ) : (
        <p className="out-of-stock">
          {book.stock === 0 ? 'Agotado' : 'Máximo en carrito'}
        </p>
      )}
    </div>
  );
};

export default BookDetails;