import React from "react";
import { Link } from "react-router-dom";
import useRedirection from "../hooks/useRedirection";

function Landing() {
  useRedirection("/books", 5000); // Redireccionamos a la vista principal en 5 segundos

  return (
    <div className="landing">
      <Link to={"/books"}>
        {" "}
        <h1>Bienvenidos a Relatos de Papel</h1>
      </Link>
      <span className="laser-pointer"></span>
      <span className="laser-pointer-reverse"></span>{" "}
    </div>
  );
}

export default Landing;
