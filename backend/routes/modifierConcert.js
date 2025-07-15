import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();
const prisma = new PrismaClient();

/* ----------------------- GET ----------------------- */
router.get('/modifier-concert/:id', isAuthenticated, isAdmin, async (req, res) => {
  const concertId = parseInt(req.params.id);
  try {
    const concert = await prisma.concert.findUnique({
      where: { id: concertId },
    });

    if (!concert) return res.status(404).send('Concert introuvable');

    res.render('pages/modifier-concert', { concert });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

/* ----------------------- UPDATE ----------------------- */
router.post('/modifier-concert/:id', isAuthenticated, isAdmin, async (req, res) => {
  const concertId = parseInt(req.params.id);
  const { ville, date, salle } = req.body;

  try {
    await prisma.concert.update({
      where: { id: concertId },
      data: {
        ville,
        date: new Date(date),
        salle,
      },
    });
    res.redirect('/dates-tournee');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la mise à jour du concert');
  }
});

/* ----------------------- DELETE ----------------------- */
router.post('/supprimer-concert/:id', isAuthenticated, isAdmin, async (req, res) => {
  const concertId = parseInt(req.params.id);

  try {
    await prisma.concert.delete({
      where: { id: concertId },
    });

    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la suppression du concert');
  }
});

export default router;
