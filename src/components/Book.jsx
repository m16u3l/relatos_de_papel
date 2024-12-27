import React from "react";
import { Link } from "react-router-dom";

export const Book = ({ id, libro, titulo_original, fecha_de_lanzamiento, autor, descripcion }) => {
  return (
    <Link to={`/books/${id}`} className="card">
      <h3>{libro} ({titulo_original})</h3>
      <p><strong>Autor:</strong> {autor}</p>
      <p><strong>Fecha de lanzamiento:</strong> {fecha_de_lanzamiento}</p>
      <p><strong>Descripción:</strong> {descripcion}</p>
    </Link>
  );
};
