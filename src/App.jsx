import React from "react";
import GlobalRouter from "./routes/GlobalRouter";
import { LibraryProvider } from "./context/LibraryContext";

function App() {
  return (
    <LibraryProvider>
      <GlobalRouter></GlobalRouter>
    </LibraryProvider>
  );
}

export default App;
