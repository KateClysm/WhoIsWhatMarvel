import { Request, Response } from 'express';
import { CharactersModel } from '../models/charactersModel';

export class CharactersController {

  static getCharacters(req: Request, res: Response) {
    try {
      const q = parseInt(req.query.qParam as string, 10);

      if (isNaN(q)) {
        return res.status(400).json({ error: 'Invalid quantity parameter' });
      }

      const characters = CharactersModel.getCharacters(q);

      res.json(characters);

    } catch (error) {
      console.error('Error getting characters:', error);
      res.status(500).json({ error: 'Error getting characters' });
    }
  }
}