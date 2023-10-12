import { Request, Response } from 'express';
import marvelData from '../../data/marvel.json';
console.log('Datos de Marvel cargados:', marvelData);

export const getCharacters = (req: Request, res: Response) => {
  try {
    console.log('Parámetros de solicitud:', req.query);
    const count = req.query.count as string;
    const parsedCount = parseInt(count, 10);

    if (isNaN(parsedCount)) {
      return res.status(400).json({ error: 'Invalid count parameter' });
    }

    // Modifica la respuesta para enviar solo los primeros N personajes
    const characters = marvelData.slice(0, parsedCount);
    
    res.json(characters);
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    res.status(500).json({ error: 'Error al obtener personajes' });
  }
};