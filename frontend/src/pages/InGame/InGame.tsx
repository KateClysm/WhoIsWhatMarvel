import React, { useState, useEffect } from 'react';
import './ingame.scss';
import CharacterCard from '../../components/charactercard/CharacterCard';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface PersonajeMarvel{
  Id: number;
  Name: string;
  Image: string;
  Alignment: string;
  Quote: string;
}

const InGame: React.FC = () => {
  const navigate = useNavigate();

  const [personajesJugados, setPersonajesJugados] = useState(0); //personajes ya jugados
  const [marvelData, setMarvelData] = useState<PersonajeMarvel[]>([]); //Array de los personajes con los que jugaremos
  const [aciertos, setAciertos] = useState(0); //aciertos de alineaciones
  const [indicePjActual, setIndicePjActual] = useState(0); //índice del array

  const location = useLocation();
  const cantidadPersonajes = location.state ? location.state.characterCount : 25; 
  console.log('Cantidad de personajes pasados desde homepage:', cantidadPersonajes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/characters?count=${cantidadPersonajes}`);
        const data = await response.json();
        setMarvelData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [cantidadPersonajes]);

  const personajeActual = marvelData[indicePjActual];
  
  const handleSeleccionAlineacion = async (alignment: string) => {
    if (personajeActual && personajeActual.Alignment === alignment) {
      setAciertos(aciertos + 1);
    }
  
    if (indicePjActual < marvelData.length - 1) {
      setIndicePjActual(indicePjActual + 1);
    }
    setPersonajesJugados(personajesJugados + 1);
  
    if (personajesJugados + 1 === cantidadPersonajes) {
  
      // Mueve la redirección aquí para garantizar que el valor se actualice antes de la redirección
      navigate("/results", { state: { aciertos, cantidadPersonajes, partidaFinalizada: true } });
    }
  };

  return (
    <div className="container-ingame">
      <CharacterCard character={personajeActual} />

      <div className="your-guess">
        <p>Counter: {personajesJugados}/{cantidadPersonajes}</p>

        <p>What Do You Think?</p>

        <div className="container-guess-buttons">
          <button className="ghero" onClick={() => handleSeleccionAlineacion('Hero')}>
            Hero
          </button>
          <button className="ganti" onClick={() => handleSeleccionAlineacion('Anti-Hero')}>
            Anti Hero
          </button>
          <button className="gvillain" onClick={() => handleSeleccionAlineacion('Villain')}>
            Villain
          </button>
        </div>
      </div>
    </div>
  );
};

export default InGame;