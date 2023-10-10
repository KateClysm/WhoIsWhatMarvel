import express from 'express';
import db from './db'; // Importa la conexión desde db.ts
import charactersData from '../public/marvel.json';

const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function loadCharactersData() {
  try {
    // Establece la conexión utilizando la exportación desde db.ts
    await db.connect();

    for (const character of charactersData) {
      const { Id, Name, Image, Alignment, Quote } = character;
      await db.execute(
        'INSERT INTO characters (Id, Name, Image, Alignment, Quote) VALUES (?, ?, ?, ?, ?)',
        [Id, Name, Image, Alignment, Quote]
      );
    }

    console.log('Data loaded in the Data Base');
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    db.end(); // Cierra la conexión después de cargar los datos
  }
}

loadCharactersData();