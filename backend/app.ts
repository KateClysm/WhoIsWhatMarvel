import express from 'express';
import charactersRoutes from './routes/charactersRoutes';
import cors from 'cors';
import winnersRoutes from './routes/winnersRoutes';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 8080;

app.use('/api/characters', charactersRoutes);
app.use('/api/winners', winnersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});