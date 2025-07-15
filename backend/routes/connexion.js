import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { logActivity } from '../utils/logActivity.js';
import bcrypt from 'bcrypt';



const router = express.Router();
const prisma = new PrismaClient();

/* ----------------------- Connexion ----------------------- */

router.post('/', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // Recherche l'utilisateur par email
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email },
    });

    // Vérifie si l'utilisateur existe et si le mot de passe est correct
    const match = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (utilisateur && match) {
      // Stock des données de l'utilisateur dans la session
      req.session.userId = utilisateur.id;
      req.session.role = utilisateur.role;
      req.session.nom = utilisateur.nom;
      req.session.email = utilisateur.email;
      console.log(req.session)
      await logActivity(req.session.userId, 'Connexion');
      res.status(200).json({ message: 'Connexion réussie', utilisateur });

    } else {
      res.status(401).json({ erreur: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
});

export default router;
