import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../views/Landing";
import BookDetails from "../views/BookDetails";
import NotFound from "../views/NotFound";
import { Overview } from "../views/Overview";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function GlobalRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/books"
          element={
            <Layout>
              <Overview />
            </Layout>
          }
        />
        <Route
          path="/books/:bookId"
          element={
            <Layout>
              <BookDetails />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default GlobalRouter;
