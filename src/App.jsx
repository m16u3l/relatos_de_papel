import React from "react";
import GlobalRouter from "./routes/GlobalRouter";
import { LibraryContext } from "./context/LibraryContext";
import { useBooks } from "./hooks/useBooks";

function App() {
  const books = useBooks();

  return (
    <LibraryContext.Provider value={{ books }}>
      <GlobalRouter></GlobalRouter>
    </LibraryContext.Provider>
  );
}

export default App;
