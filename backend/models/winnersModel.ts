import db from '../db';
import { RowDataPacket } from 'mysql2';

export class WinnersModel {
    static async getWinner() {
        try {
          const [rows] = await db.promise().query('SELECT * FROM winner WHERE id = 1');
          const arrayWinner = rows as RowDataPacket[];
          if (arrayWinner.length > 0) { 
            return arrayWinner[0];
          }
          return null; 
        } catch (error) {
          throw error;
        }
      }

      static async updateWinner(nickname: string, score: number, time: string) {
        try {
          console.log('Updating winner data...');
          const [result] = await db.promise().execute('UPDATE winner SET nickname = ?, score = ?, time = ? WHERE id = 1', [nickname, score, time]);
          console.log('Update result:', result);
          if ('affectedRows' in result && result.affectedRows > 0) {
            return `Successful update for the winner`;
          }
          return `No rows were affected by the update`;
        } catch (error) {
          console.error('Error in updateWinner:', error);
          throw error;
        }
      }
}