import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { v4 as uuidv4 } from 'uuid';
import { logActivity } from '../utils/logActivity.js';



const router = express.Router();
const prisma = new PrismaClient();

// Récupérer les concerts disponibles pour la réservation
router.get('/', async (req, res) => {
  const concertId = parseInt(req.query.concert);

  try {
    let concert = null;
    if (concertId) {
      concert = await prisma.concert.findUnique({ where: { id: concertId } });
    }

    res.render('Pages/reservation', { concert, nom: req.session.nom || '', email: req.session.email || ''}); //Données envoyées à la vue
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});


// Réserver des billets pour un concert
router.post('/', async (req, res) => {
  const {
    name,
    email,
    ville,
    nombreTickets,
    modePaiement
  } = req.body;

  try {
    // Récupérer l'utilisateur depuis la session
    const utilisateurSession = {
      id: req.session.userId,
      nom: req.session.nom,
      email: req.session.email
    };
    if (!req.session.userId) return res.status(401).json({ message: 'Non authentifié' });


    // Vérifier ou mettre à jour les infos utilisateur
    const utilisateur = await prisma.utilisateur.update({
      where: { id: utilisateurSession.id },
      data: {
        nom: name,
        email: email
      }
    });

    // Récupérer le concert en base par la ville
    const concert = await prisma.concert.findFirst({
      where: { ville: ville }
    });

    if (!concert) return res.status(404).json({ message: 'Concert introuvable' });

    const prixUnitaire = parseFloat(concert.prix); // assure-toi que `concert.prix` existe
    const total = prixUnitaire * nombreTickets;

    // Créer la commande
    const commande = await prisma.commande.create({
      data: {
        utilisateur_id: utilisateur.id,
        total: total,
        statut: 'payee' // ou autre selon logique métier
      }
    });

    // Créer les tickets
    const ticketsData = Array.from({ length: nombreTickets }).map(() => ({
      commande_id: commande.id,
      concert_id: concert.id,
      code_unique: uuidv4(), // code unique généré
      statut: 'valide'
    }));

    await prisma.ticket.createMany({ data: ticketsData });

    // Créer le paiement
    await prisma.paiement.create({
      data: {
        commande_id: commande.id,
        mode: modePaiement,
        montant: total,
        statut: 'succes'
      }
    });
  await logActivity(req.session.userId, 'Achat billets');
    res.status(200).json({ message: 'Réservation confirmée' });

  } catch (error) {
    console.error('Erreur réservation :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


export default router;
