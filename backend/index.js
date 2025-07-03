import express from 'express';

// Import des routes
import utilisateurRouter from './routes/utilisateurs.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Déclaration des routes
app.use('/utilisateurs', utilisateurRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});