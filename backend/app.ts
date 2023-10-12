import express from 'express';
import whoIsWhatRouter from './routes/whoIsWhatRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 8080;

app.use('/api', whoIsWhatRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});