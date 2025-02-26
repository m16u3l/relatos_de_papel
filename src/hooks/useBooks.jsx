import { useEffect, useState } from "react";
import { bookService } from "../services/booksService";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const data = await bookService.getBooks();
        setBooks(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los libros');
        console.error('Error loading books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, isLoading, error };
};