import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const concerts = await prisma.concert.findMany({
      orderBy: { date: 'asc' } // Tri par date croissante
    });
    res.render('Pages/dates-tournee', { concerts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});


export default router;
