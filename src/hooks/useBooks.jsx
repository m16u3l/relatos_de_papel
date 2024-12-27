import { useEffect, useState } from "react";
import testBooks from "../context/books.json";

export const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setBooks(testBooks);
    }, 2000);
  }, []);

  return books;
};
