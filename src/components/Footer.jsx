import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2024 Relatos de papel</p>
        <div className="footer-links">
          <Link to="/about">Sobre nosotros</Link>
          <Link to="/contact">Contacto</Link>
        </div>
      </div>
    </footer>
  );
};
