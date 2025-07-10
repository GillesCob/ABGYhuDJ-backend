import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';

// ----------------  ----------------
import path from 'path';
import { fileURLToPath } from 'url';


// ---------------- Import des routes ----------------
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
import { isAuthenticated } from './middleware/isAuthenticated.js';
dotenv.config();

const app = express();
const PORT = 3000;

// ---------------- Chemin absolu pour les fichiers statiques ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- Middleware ----------------
app.use(express.json());
app.use(expressLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Voir si false ou true (https)
}));

// ---------------- Middleware pour envoyer les données de session partout ----------------
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});



// ---------------- Déclaration du moteur de templates EJS ----------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend'));


// ---------------- Déclaration du layout EJS ----------------
app.set('layout', 'layout');

// ---------------- Middleware pour servir les fichiers statiques (CSS, JS, images) ----------------
app.use(express.static(path.join(__dirname, '../frontend')));

// ---------------- Routes de mes pages HTML ----------------
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/photos', (req, res) => {
  res.render('Pages/photos');
});


app.get('/inscription', (req, res) => {
  res.render('Pages/inscription');
});

app.get('/connexion', (req, res) => {
  res.render('Pages/connexion');
});

app.get('/admin', isAdmin, (req, res) => {
  res.render('Pages/admin');
});


// ---------------- Parser le corps des requêtes POST issues de formulaires HTML ----------------
app.use(express.urlencoded({ extended: true }));


// ---------------- Déclaration des routes ----------------
app.use('/utilisateurs', utilisateurRouter);
app.use('/connexion', connexionRouter);
app.use('/deconnexion', deconnexionRouter);
app.use('/ajoutConcert', ajoutConcert);
app.use('/dates-tournee', datesTourneeRouter);
app.use('/', modifierConcertRouter);
app.use('/reservation', reservationRouter);
app.use('/mon-compte', moncompteRouter);




app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});