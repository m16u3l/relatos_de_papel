import React from "react";
import GlobalRouter from "./routes/GlobalRouter";
import { LibraryContext } from "./context/LibraryContext";
import { Footer } from "./components/Footer";
import { useBooks } from "./hooks/useBooks";

function App() {
  const books = useBooks();

  return (
    <LibraryContext.Provider value={{ books }}>
      <GlobalRouter></GlobalRouter>
      <Footer />
    </LibraryContext.Provider>
  );
}

export default App;
