import React, { useState } from "react";
import "./homepage.scss";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
  const [categories, setCategories] = useState(false);
  const [start, setStart] = useState(false);

  // Use the useNavigate hook to get the navigation function
  const navigate = useNavigate();

  const handleStart = () => {
    setCategories(true);
    setStart(true);
  };

  const handleCharacters = (characterCount: number) => {
    // Agrega registros de depuración para verificar la cantidad de personajes
    console.log('Cantidad de personajes seleccionados desde homepage:', characterCount);

    navigate("/playthrough", { state: { characterCount } });
  };

  return (
    <div className="container-homepage">
      <h2>Want to Find out how much you know about Heroism in Marvel?</h2>

      <button
        className={`button-start ${start ? "invisible" : ""}`}
        onClick={handleStart}
      >
        START
      </button>

      <div className={`container-categories ${categories ? "visible" : ""}`}>
        <button className="c25" onClick={() => handleCharacters(25)}>
          25 Characters
        </button>
        <button className="c50" onClick={() => handleCharacters(50)}>
          50 Characters
        </button>
        <button className="c75" onClick={() => handleCharacters(75)}>
          75 Characters
        </button>
      </div>
    </div>
  );
};

export default Homepage;
