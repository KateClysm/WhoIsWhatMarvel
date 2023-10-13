//El modelo contiene la lógica para obtener datos relacionados con los personajes.
import marvelData from '../../data/marvel.json';

export class CharactersModel {
  //Recibe la cantidad de personajes con la que se quiere jugar y devuelve un array de personajes
  static getCharacters(q: number) {
    const characters = marvelData.slice(0, q);
    return characters;

  }
}