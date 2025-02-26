import booksData from '../data/books.json';

const API_URL = process.env.REACT_CATALOGUE_API_URL || 'http://127.0.0.1:8181/ms-books-catalogue';

export const bookService = {
  async getBooks() {
    try {
      if (!process.env.REACT_CATALOGUE_API_URL) {
        console.warn('API URL not set, using local data');
        return booksData;
      }

      const response = await fetch(`${API_URL}/libros`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      console.warn('Falling back to local data');
      return booksData;
    }
  }
};