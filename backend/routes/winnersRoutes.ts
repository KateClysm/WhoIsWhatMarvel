import { Router } from 'express';
import { WinnersController } from '../controllers/winnersController';

const winnersRoutes = Router();

winnersRoutes.get('/winner', WinnersController.getWinner);
winnersRoutes.put('/updateWinner', WinnersController.updateWinner);

export default winnersRoutes;