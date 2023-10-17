import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.scss";

const Homepage: React.FC = () => {

  const navigate = useNavigate();

  //Control States 
  const [displayButtons, setDisplayButtons] = useState(false);
  const [opacityButtons, setOpacityButtons] = useState(false);
  const [nickname, setNickname] = useState("");

  //Once the start button is pressed, it disappears, and the option buttons take space with a display:flex property but opacity:0. After 1 second, their opacity increases. This creates an effect where the buttons gradually appear from the bottom to the top.
  const handleStart = () => {
    setDisplayButtons(true);
    setTimeout(() => {
      setOpacityButtons(true);
    }, 1);
  };

  //Receives the desired character count for the game and sends it to the in-game page. (A nickname is optional)
  const handleCharacters = (characterQ: number) => {
    if (displayButtons && opacityButtons) {
      navigate("/playthrough", { state: { characterQ, nickname } });
    }
  };

  return (
    <div className="container-homepage">

      <h2>Want to Find out how much you know about Heroism in Marvel?</h2>
      <p>Write a nickname to appear in our winning records</p>
      
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Enter your nickname"
      />
        

      <button className={`button-start ${displayButtons ? "invisible" : ""}`}
      onClick={handleStart}>START</button>

      <div className={`container-categories ${displayButtons ? "display" : ""} ${opacityButtons ? "opacity" : ""}`}>

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
