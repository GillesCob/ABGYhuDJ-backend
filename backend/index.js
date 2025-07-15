import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';

// Modules natifs pour gérer les chemins de fichiers
import path from 'path';
import { fileURLToPath } from 'url';

// Import des routes (modules séparés pour chaque fonctionnalité)
import utilisateurRouter from './routes/utilisateurs.js';
import connexionRouter from './routes/connexion.js';
import deconnexionRouter from './routes/deconnexion.js';
import ajoutConcert from './routes/ajoutConcert.js';
import datesTourneeRouter from './routes/datesTournee.js';
import modifierConcertRouter from './routes/modifierConcert.js';
import reservationRouter from './routes/reservation.js';
import moncompteRouter from './routes/mon-compte.js';

import dotenv from 'dotenv';
import { isAdmin } from './middleware/isAdmin.js';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);


// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// --- Configuration des chemins absolus (compatibilité ES Modules) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middleware pour parser les requêtes JSON ---
app.use(express.json());

// --- Middleware pour gérer les layouts EJS ---
app.use(expressLayouts);

// --- Configuration de la session utilisateur ---
app.use(session({
  secret: process.env.SESSION_SECRET, // Clé secrète pour sécuriser les sessions
  resave: false,                      // Ne pas enregistrer la session si non modifiée
  saveUninitialized: true,            // Enregistrer les sessions non initialisées
  cookie: { secure: false }           // Cookie non sécurisé (HTTPS à envisager plus tard)
}));

// --- Middleware global pour rendre les infos de session accessibles dans les vues ---
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// --- Configuration du moteur de template EJS ---
app.set('view engine', 'ejs');

// Définition du dossier où se trouvent les vues (templates EJS)
app.set('views', path.join(__dirname, '../frontend'));

// --- Configuration du layout global utilisé par express-ejs-layouts ---
app.set('layout', 'layout');

// --- Middleware pour servir les fichiers statiques (CSS, JS, images) depuis le dossier frontend ---
app.use(express.static(path.join(__dirname, '../frontend')));

// --- Définition des routes principales pour les pages HTML ---
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/photos', (req, res) => {
  res.render('pages/photos');
});

app.get('/inscription', (req, res) => {
  res.render('pages/inscription');
});

app.get('/connexion', (req, res) => {
  res.render('pages/connexion');
});

// Route protégée par le middleware isAdmin
app.get('/admin', isAdmin, (req, res) => {
  res.render('pages/admin');
});

// --- Middleware pour parser les données envoyées via formulaires HTML ---
app.use(express.urlencoded({ extended: true }));

// --- Déclaration des routes externes ---
app.use('/utilisateurs', utilisateurRouter);
app.use('/connexion', connexionRouter);
app.use('/deconnexion', deconnexionRouter);
app.use('/ajoutConcert', ajoutConcert);
app.use('/dates-tournee', datesTourneeRouter);
app.use('/', modifierConcertRouter);
app.use('/reservation', reservationRouter);
app.use('/mon-compte', moncompteRouter);

// --- Démarrage du serveur HTTP ---
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
