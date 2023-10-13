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

  const [playedCharacters, setPlayedCharacters] = useState(0); //personajes ya jugados
  const [marvelData, setMarvelData] = useState<PersonajeMarvel[]>([]); //Array de los personajes con los que jugaremos
  const [successes, setSuccesses] = useState(0); 
  const [indexCharacter, setIndexCharacter] = useState(0); 
  const [startTime, setStartTime] = useState(0); // Tiempo de inicio
  const [time, setTime] = useState("0:00"); // Tiempo total

  const location = useLocation();
  const characterQ = location.state ? location.state.characterQ : 25; 
  const nickname = location.state ? location.state.nickname : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/characters/data?qParam=${characterQ}`);
        const data = await response.json();
        setMarvelData(data);
        setStartTime(Date.now());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [characterQ]);

  const ActualCharacter = marvelData[indexCharacter];
  
  useEffect(() => {
    if (startTime) {
      const currentTime = Date.now();
      const totalTimeInMilliseconds = currentTime - startTime;
      const minutes = Math.floor(totalTimeInMilliseconds / 60000);
      const seconds = ((totalTimeInMilliseconds % 60000) / 1000).toFixed(0);
      setTime(`${minutes}:${seconds}`);
    }
  });

  const handleSeleccionAlineacion = async (alignment: string) => {
    if (ActualCharacter && ActualCharacter.Alignment === alignment) {
      setSuccesses(successes + 1);
    }
  
    if (indexCharacter < marvelData.length - 1) {
      setIndexCharacter(indexCharacter + 1);
    }
    setPlayedCharacters(playedCharacters + 1);
  
    if (playedCharacters + 1 === characterQ) {
      navigate("/results", {
        state: { successes, characterQ, endgame: true, nickname, time }
      });
    }
  };

  return (
    <div className="container-ingame">
      <CharacterCard character={ActualCharacter} />

      <div className="your-guess">

        {nickname &&(
          <h3>{`Hi ${nickname}`}</h3>
        )}
        <p>Counter: {playedCharacters}/{characterQ}</p>

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