import React, { useState, useEffect } from 'react';
import './ingame.scss';
import CharacterCard from '../../components/charactercard/CharacterCard';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { IMarvelCharacter } from '../../interfaces/IMarvelCharacter';

const InGame: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //Retrieves the info from homepage
  const characterQ = location.state ? location.state.characterQ : 25; 
  const nickname = location.state ? location.state.nickname : null;

  const [playedCharacters, setPlayedCharacters] = useState(0);
  const [indexCharacter, setIndexCharacter] = useState(0); 
  const [successes, setSuccesses] = useState(0); 
  const [marvelData, setMarvelData] = useState<IMarvelCharacter[]>([]);

 //Calculates the time in which the user completes the game.
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState("0:00");

  
  //Uses the selected character count to send a request to the backend for that quantity of characters, and sets 'marvelData' as the array we will work with. Then, sets 'startTime' with the game's starting time.
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

  //'ActualCharacter' is the object in the 'marvelData' array with the 'indexCharacter' (which changes).
  const ActualCharacter = marvelData[indexCharacter];
  
  //Calculates the time spent.
  useEffect(() => {
    if (startTime) {
      //Sets the current time
      const currentTime = Date.now();
      //Substracts them
      const totalTimeInMilliseconds = currentTime - startTime;
      //It divides totalTimeInMilliseconds by 60,000 (the number of milliseconds in a minute) and uses Math.floor to round down to the nearest whole number.
      const minutes = Math.floor(totalTimeInMilliseconds / 60000);
      //calculates the number of seconds remaining after the minutes have been calculated. It uses the modulo operator (%) to find the remainder when totalTimeInMilliseconds is divided by 60,000, which represents the milliseconds in complete minutes. Then, it divides this remainder by 1,000 (the number of milliseconds in a second). Finally, toFixed(0) is used to round this value to the nearest whole number, giving you the total number of seconds.
      const seconds = ((totalTimeInMilliseconds % 60000) / 1000).toFixed(0);
      //Set the 'time' constant in an appropriate format for display and for sending to the database.
      setTime(`${minutes}:${seconds}`);
    }
  });

  //Controls the counters for successes and the change of character when the user clicks an alignment.
  const handleSeleccionAlineacion = async (alignment: string) => {
    if (ActualCharacter && ActualCharacter.Alignment === alignment) {
      setSuccesses(successes + 1);
    }
    
    //The array starts at position 0, so calculates the end as 'marvelData.length - 1'.
    if (indexCharacter < marvelData.length - 1) {
      setIndexCharacter(indexCharacter + 1);
    }

    setPlayedCharacters(playedCharacters + 1);
  
     //If the 'playedCharacters' count surpasses 'characterQ', automatically redirects the user to the results page, sending the data of successes, characterQ, an endgame boolean, the nickname, and time spent.
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