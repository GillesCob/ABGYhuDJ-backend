import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

/* ----------------------- CREATE ----------------------- */
// Route HTTP POST pour créer un nouveau concert
router.post('/', async (req, res) => {
  // Récupération des données du concert depuis le corps de la requête
  const { ville, salle, date, nombre_tickets, prix } = req.body;

  try {
    // Utilisation de Prisma pour insérer un nouveau concert en BDD
    const nouveauConcert = await prisma.concert.create({
      data: {
        ville,
        salle,
        date: new Date(date),
        nombre_tickets: parseInt(nombre_tickets),
        prix: parseFloat(prix),
      },
    });
    // Envoi de la réponse HTTP avec statut 201 (créé) et le concert ajouté
    res.status(201).json(nouveauConcert);
  } catch (error) {
    // Gestion des erreurs
    res.status(400).json({ erreur: error.message });
  }
});


// Export du routeur pour pouvoir l'utiliser dans le serveur principal (app.js)
export default router;