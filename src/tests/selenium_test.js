const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Pruebas de búsqueda de productos", function () {
  let driver;
  this.timeout(30000);

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  beforeEach(async function () {
    let retries = 3;
    while (retries > 0) {
      try {
        await driver.get("http://localhost:3000");
        await driver.wait(until.elementLocated(By.className("overview")), 5000);
        break;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("debería buscar un producto y mostrar resultados", async function () {
    try {
      const searchInput = await driver.wait(
        until.elementLocated(By.className("search-input")),
        5000
      );

      await searchInput.sendKeys("anillos");
      await driver.wait(
        until.elementLocated(By.className("linear-progress")),
        3000
      );

      await driver.wait(until.elementLocated(By.className("card")), 5000);

      const filteredBooks = await driver.findElements(By.className("card"));

      assert.ok(
        filteredBooks.length > 0,
        `Deberían mostrarse libros en los resultados. Encontrados: ${filteredBooks.length}`
      );
    } catch (error) {
      console.error("Error en la prueba:", error);
      throw error;
    }
  });

  it("debería mostrar mensaje cuando no hay resultados", async function () {
    try {
      const searchInput = await driver.findElement(
        By.className("search-input")
      );
      await searchInput.clear();
      await searchInput.sendKeys("xyzabc123");

      await driver.wait(
        until.elementLocated(By.className("linear-progress")),
        3000
      );

      await driver.wait(
        async () => {
          const books = await driver.findElements(By.className("card"));
          return books.length === 0;
        },
        5000,
        "Los resultados deberían estar vacíos"
      );
    } catch (error) {
      console.error("Error en la prueba:", error);
      throw error;
    }
  });
  it("debería completar el flujo de compra", async function () {
    try {
      const books = await driver.wait(
        until.elementsLocated(By.className("card")),
        5000
      );

      for (let i = 0; i < 3; i++) {
        const addToCartButton = await books[i].findElement(
          By.id(`add-to-cart-${i + 1}`)
        );
        await addToCartButton.click();

        await driver.wait(
          until.elementLocated(By.className("cart-count")),
          2000
        );
      }

      const cartCount = await driver.findElement(By.className("cart-count"));
      const count = await cartCount.getText();
      assert.strictEqual(count, "3", "El carrito debería tener 3 items");

      const cartIcon = await driver.findElement(By.css(".cart-icon a"));
      await cartIcon.click();

      await driver.wait(until.elementLocated(By.className("cart-details-container")), 5000);

      const cartItems = await driver.findElements(By.className("cart-item"));
      assert.strictEqual(
        cartItems.length,
        6,
        "Deberían haber 3 items en la página del carrito"
      );

      const checkoutButton = await driver.findElement(
        By.className("checkout-button")
      );
      await checkoutButton.click();
      const successMessage = await driver.wait(
        until.elementLocated(By.className("payment-success-message")),
        5000
      );

      const messageText = await successMessage.getText();
      assert.strictEqual(
        messageText,
        "¡Pago completado con éxito!",
        "Debería mostrar mensaje de éxito"
      );

      await driver.wait(until.elementLocated(By.className("overview")), 5000);
    } catch (error) {
      console.error("Error en la prueba de flujo de compra:", error);
      throw error;
    }
  });
});
