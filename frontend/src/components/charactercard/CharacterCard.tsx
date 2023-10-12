import React from 'react';
import './charactercard.scss';

interface MarvelCharacter {
  Id: number;
  Name: string;
  Image: string;
  Alignment: string;
  Quote: string;
}

const CharacterCard: React.FC<{character:MarvelCharacter}> = ({ character }) => {
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