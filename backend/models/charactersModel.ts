import marvelData from '../../data/marvel.json';

export class CharactersModel {
  static getCharacters(q: number) {
    const characters = marvelData.slice(0, q);
    return characters;

  }
}