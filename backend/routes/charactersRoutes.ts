import { Router } from 'express';
import { CharactersController } from '../controllers/charactersController';

const charactersRoutes = Router();

charactersRoutes.get('/data', CharactersController.getCharacters);

export default charactersRoutes;