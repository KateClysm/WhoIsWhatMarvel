import { Router } from 'express';
import { getCharacters } from '../controllers/whoIsWhatController';

const taskRouter = Router();

taskRouter.get('/characters', getCharacters);

export default taskRouter;