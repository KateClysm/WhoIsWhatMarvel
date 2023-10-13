import { Request, Response } from 'express';
import { WinnersModel } from '../models/winnersModel';

export class WinnersController {
    static async getWinner(req: Request, res: Response) {
        try {
          const winner = await WinnersModel.getWinner();
      
          if (winner) {
            res.json(winner);
          } else {
            res.status(404).json({ error: 'Winner not found' });
          }
        } catch (error) {
          console.error('Error getting winner:', error);
          res.status(500).json({ error: 'Error getting winner' });
        }
      }

      static async updateWinner(req: Request, res: Response) {
        const { nickname, score, time } = req.body;
        console.log('Received data for updating winner:', { nickname, score, time });
        try {
          const success = await WinnersModel.updateWinner(nickname, score, time);
          if (success) {
            res.json({ message: 'Winner updated successfully' });
          } else {
            res.status(404).json({ error: 'Winner not found' });
          }
        } catch (error) {
          console.error('Error updating winner:', error);
          res.status(500).json({ error: 'Error updating winner' });
        }
      }
}