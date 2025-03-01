import booksData from '../data/books.json';

const API_URL = process.env.REACT_APP_CATALOGUE_API_URL || 'http://localhost:9191/ms-books-catalogue';
const STORAGE_KEY = 'books_data';

export const bookService = {
  initializeLocalStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData));
    }
  },

  async getBooks() {
    try {
      if (!process.env.REACT_APP_CATALOGUE_API_URL) {
        this.initializeLocalStorage();
        const localData = localStorage.getItem(STORAGE_KEY);
        return JSON.parse(localData);
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
      this.initializeLocalStorage();
      const localData = localStorage.getItem(STORAGE_KEY);
      return JSON.parse(localData);
    }
  },

  updateLocalBooks(updatedBooks) {
    if (!process.env.REACT_APP_CATALOGUE_API_URL) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    }
  }
};