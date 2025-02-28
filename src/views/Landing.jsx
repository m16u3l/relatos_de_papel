import React from "react";
import { Link } from "react-router-dom";
import useRedirection from "../hooks/useRedirection";
import "../styles/landing.css";

function Landing() {
  useRedirection("/books", 5000);

  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1 className="main-title">Relatos de Papel</h1>
        <p className="subtitle">Descubre mundos infinitos entre páginas</p>
        <Link to="/books" className="cta-button">
          Explorar Libros
        </Link>
      </div>

      <div className="featured-books">
        <h2>Libros Destacados</h2>
        <div className="book-grid">
          <div className="book-card">
            <div className="book-cover"></div>
            <h3>El nombre del viento</h3>
            <p>Patrick Rothfuss</p>
          </div>
          <div className="book-card">
            <div className="book-cover"></div>
            <h3>Cien años de soledad</h3>
            <p>Gabriel García Márquez</p>
          </div>
          <div className="book-card">
            <div className="book-cover"></div>
            <h3>1984</h3>
            <p>George Orwell</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
