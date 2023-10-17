import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./results.scss";

const Results: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate(); 

    //Retrieves the info from the game.
    const successes = location.state ? location.state.successes : 0;
    const characterQ = location.state ? location.state.characterQ : 0;
    const endgame = location.state ? location.state.endgame : false;
    const nickname = location.state ? location.state.nickname : null;
    const time = location.state ? location.state.time : null;

    //Declares the const winner with base values.
    const [winner, setWinner] = useState({ nickname: "", score: 0 });
    
    //Sends a request to the backend to retrieve the current winner from the database and then sets it as the value of the 'winner' constant.
    useEffect(() => {
        console.log('Fetching winner data...');
        const fetchActualWinnerData = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/winners/winner');
            const data = await response.json();
            console.log('The Winner is:', data);
            setWinner(data);
          } catch (error) {
            console.error('Error fetching winner data:', error);
          }
        };
        fetchActualWinnerData();
      }, []);
      

    //If the user has entered a nickname and scored higher than the current winner in the database, it sends the information to the backend, which will be responsible for updating the database.
    useEffect(() => {
      if (nickname && winner.score < successes) {
        console.log('Updating winner...');
        const updateWinner = async () => {
          try {
            await fetch('http://localhost:8080/api/winners/updateWinner', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nickname, score: successes, time }),
            });
            console.log('The Winner was updated');
          } catch (error) {
            console.error('Error updating winner data:', error);
          }
        };
    
        updateWinner();
      }
    }, [successes, nickname, time]);
    

    return (
        <div className="container-results">
        {endgame ? (
            successes < characterQ ? (
            <>
                <h2>You did good <span>{`${nickname}`}</span> !</h2>
                <p className="successes">Score: {successes} / {characterQ}</p>
                <p>Your time: {time}</p>
                <p>The Best yet is: <span>{`${winner.nickname}`}</span> With: <span>{`${winner.score}`}</span> character successes</p>
                {!nickname && successes > winner.score &&(
                    <p className="nonickname">You don't appear in our records? Try writing a nickname the next time!</p>
                )}
                <p>Wanna try again?</p>
                <button onClick={() => navigate("/")}>Go to Selection</button>
            </>
            ) : (
                <>
                    <h2>Congrats! You know a lot about Marvel and his characters!</h2>
                    <p>Wanna try again?</p>
                    <button onClick={() => navigate("/")}>Go to Selection</button>
                </>
            )
        ) : (
            <h2>Game is still in progress...</h2>
        )}
        </div>
    );
};

export default Results;