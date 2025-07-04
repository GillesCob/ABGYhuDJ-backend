import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

/* ----------------------- Connexion ----------------------- */

router.post('/', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // Recherchez l'utilisateur par email
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email },
    });

    // Vérifiez si l'utilisateur existe et si le mot de passe est correct
    if (utilisateur && utilisateur.mot_de_passe === mot_de_passe) {
      // Stockez l'ID de l'utilisateur dans la session
      req.session.userId = utilisateur.id;
      res.status(200).json({ message: 'Connexion réussie', utilisateur });
    } else {
      res.status(401).json({ erreur: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
});

/* ----------------------- Deconnexion ----------------------- */

router.get('/deconnexion', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erreur lors de la destruction de la session :', err);
      res.status(500).json({ erreur: 'Erreur serveur' });
    } else {
      res.status(200).json({ message: 'Déconnexion réussie' });
    }
  });
});

// Export du routeur pour pouvoir l'utiliser dans le serveur principal (app.js)
export default router;
