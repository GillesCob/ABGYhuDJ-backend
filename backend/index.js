import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';


// ---------------- Import des routes ----------------
import utilisateurRouter from './routes/utilisateurs.js';
import connexionRouter from './routes/connexion.js';

const app = express();
const PORT = 3000;

// ---------------- Middleware ----------------
app.use(express.json());
app.use(expressLayouts);
app.use(session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Voir si false ou true (https)
}));


// ---------------- Déclaration du moteur de templates EJS ----------------
app.set('view engine', 'ejs');
app.set('views', './frontend');

// ---------------- Déclaration du layout EJS ----------------
app.set('layout', 'layout');

// ---------------- Middleware pour servir les fichiers statiques (CSS, JS, images) ----------------
app.use(express.static('frontend'));

// ---------------- Routes de mes pages HTML ----------------
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dates-tournee', (req, res) => {
  res.render('Pages/dates-tournee');
});

app.get('/photos', (req, res) => {
  res.render('Pages/photos');
});

app.get('/reservation', (req, res) => {
  res.render('Pages/reservation');
});

app.get('/inscription', (req, res) => {
  res.render('Pages/inscription');
});

app.get('/connexion', (req, res) => {
  res.render('Pages/connexion');
});


// ---------------- Déclaration des routes ----------------
app.use('/utilisateurs', utilisateurRouter);
app.use('/connexion', connexionRouter);


app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});