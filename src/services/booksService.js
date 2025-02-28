import booksData from '../data/books.json';

const API_URL = process.env.REACT_APP_CATALOGUE_API_URL || 'http://localhost:9191/ms-books-catalogue';

export const bookService = {
  async getBooks() {
    try {
      if (!process.env.REACT_APP_CATALOGUE_API_URL) {
        console.warn('API URL not set, using local data');
        return booksData;
      }

      const response = await fetch(`${API_URL}/libros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetMethod: 'GET',
          queryParams: {
            visible: ['true']
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      return booksData;
    }
  }
};