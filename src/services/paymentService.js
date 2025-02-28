const PAYMENT_API_URL = process.env.REACT_APP_PAYMENT_API_URL || 'http://localhost:9191/msbookpayments/api';

export const paymentService = {
  async processSale(items) {
    try {
      const formattedItems = items.map(item => ({
        bookId: item.id+"",
        cant: item.quantity,
        unitPrice: parseFloat(item.precio),
        totalPrice: parseFloat(item.total)
      }));

      const response = await fetch(`${PAYMENT_API_URL}/ventas`, {
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

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Error al procesar el pago');
    }
  }
};