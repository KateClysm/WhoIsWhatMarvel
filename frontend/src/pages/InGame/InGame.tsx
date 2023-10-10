import React from 'react';
import './ingame.scss';

const InGame: React.FC = () => {
    return (

      <div className="container-ingame">

        <div className="character-card">
          <div className="character-image"></div>
          <h3>Wanda Maximoff (Scarlet Witch)</h3>
          <p>"No more mutants!"</p>
          
        </div>

        <div className="your-guess">
          <p>¿What Do You Think?</p>

          <div className="container-guess-buttons">
            <button className="ghero">Hero</button>
            <button className="ganti">Anti Hero</button>
            <button className="gvillain">Villain</button>
          </div>

        </div>
      </div>

    );
};

export default InGame;