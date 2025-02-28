import booksData from '../data/books.json';

const PAYMENT_API_URL = process.env.REACT_APP_PAYMENT_API_URL || 'http://localhost:9191/msbookpayments';
const STORAGE_KEY = 'books_data';

export const paymentService = {
  updateLocalStorage(items) {
    try {
      const currentBooks = localStorage.getItem(STORAGE_KEY) 
        ? JSON.parse(localStorage.getItem(STORAGE_KEY))
        : booksData;

      const updatedBooks = currentBooks.map(book => {
        const cartItem = items.find(item => item.id === book.id);
        if (cartItem) {
          return {
            ...book,
            stock: book.stock - cartItem.quantity
          };
        }
        return book;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
      return updatedBooks;
    } catch (error) {
      console.error('Error updating localStorage:', error);
      throw new Error('Error actualizando el inventario local');
    }
  },

  async processSale(items) {
    try {
      if (!process.env.REACT_APP_PAYMENT_API_URL) {
        console.warn('Payment API URL not set, processing locally');
        const updatedBooks = this.updateLocalStorage(items);
        
        return {
          success: true,
          message: 'Venta procesada localmente',
          updatedBooks
        };
      }

      const formattedItems = items.map(item => ({
        bookId: item.id + "",
        cant: item.quantity,
        unitPrice: parseFloat(item.precio),
        totalPrice: parseFloat(item.total)
      }));

      const response = await fetch(`${PAYMENT_API_URL}/api/ventas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetMethod: 'POST',
          queryParams: {},
          body: formattedItems
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.updateLocalStorage(items);
      return await response.json();
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Error al procesar el pago');
    }
  }
};