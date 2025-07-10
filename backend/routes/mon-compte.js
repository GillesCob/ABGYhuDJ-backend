import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';


const router = express.Router();
const prisma = new PrismaClient();

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const utilisateurId = req.session.userId;

    const commandes = await prisma.commande.findMany({
      where: { utilisateur_id: utilisateurId },
      include: {
        tickets: {
          include: {
            concert: true
          }
        }
      }
    });

    res.render('Pages/mon-compte', { commandes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
