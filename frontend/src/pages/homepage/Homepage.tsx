import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.scss";


const Homepage: React.FC = () => {
  const [start, setStart] = useState(false);
  const [displayButtons, setDisplayButtons] = useState(false);
  const [opacityButtons, setOpacityButtons] = useState(false);
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  const handleStart = () => {
    setStart(true);
    setDisplayButtons(true);
    setTimeout(() => {
      setOpacityButtons(true);
    }, 1);
  };

  const handleCharacters = (characterQ: number) => {
    if (displayButtons &&  opacityButtons) {
      navigate("/playthrough", { state: { characterQ, nickname } });
    }
  };

  return (
    <div className="container-homepage">
      <h2>Want to Find out how much you know about Heroism in Marvel?</h2>

      <p>Would you like to write a nickname to appear in our winning records?</p>
      
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Enter your nickname"
      />
        

      <button className={`button-start ${start ? "invisible" : ""}`}
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
