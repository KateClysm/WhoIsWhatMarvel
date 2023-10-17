import React from 'react';
import './charactercard.scss';
import { IMarvelCharacter } from '../../interfaces/IMarvelCharacter';

const CharacterCard: React.FC<{character:IMarvelCharacter}> = ({ character }) => {
  if (!character) {
    return (
      <div className="character-card">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="character-card">
      <div className="character-image" style={{ backgroundImage: `url(${character.Image})` }}></div>
      <h3>{character.Name}</h3>
      <p>"{character.Quote}"</p>
    </div>
  );
};

export default CharacterCard;