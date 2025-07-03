// Importation du framework Express pour créer des routes HTTP
import express from 'express';

// Importation du client Prisma pour interagir avec la base de données
import { PrismaClient } from '../generated/prisma/index.js';

// Création d'un routeur Express dédié à la gestion des utilisateurs
const router = express.Router();

// Instanciation du client Prisma, qui permet d'exécuter des requêtes sur la BDD
const prisma = new PrismaClient();

/* ----------------------- CREATE ----------------------- */
// Route HTTP POST pour créer un nouvel utilisateur
router.post('/', async (req, res) => {
  // Récupération des données utilisateur depuis le corps de la requête
  const { nom, email, mot_de_passe, role } = req.body;

  try {
    // Utilisation de Prisma pour insérer un nouvel utilisateur en BDD
    const nouvelUtilisateur = await prisma.utilisateur.create({
      data: {
        nom,                         // Nom de l'utilisateur
        email,                       // Email (doit être unique)
        mot_de_passe,                // Mot de passe (à hasher idéalement avant)
        role: role || 'utilisateur', // Rôle par défaut "utilisateur" si non spécifié
      },
    });

    // Envoi de la réponse HTTP avec statut 201 (créé) et l'utilisateur ajouté
    res.status(201).json(nouvelUtilisateur);

  } catch (error) {
    // Gestion des erreurs (ex : email déjà utilisé)
    res.status(400).json({ erreur: error.message });
  }
});

/* ----------------------- READ (tous) ----------------------- */
// Route HTTP GET pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    // Récupération de tous les utilisateurs en base via Prisma
    const utilisateurs = await prisma.utilisateur.findMany();

    // Envoi de la liste des utilisateurs en JSON
    res.json(utilisateurs);

  } catch (error) {
    // Gestion d’erreur serveur
    res.status(500).json({ erreur: error.message });
  }
});

/* ----------------------- READ (un seul) ----------------------- */
// Route HTTP GET pour récupérer un utilisateur spécifique par son ID
router.get('/:id', async (req, res) => {
  // Extraction et conversion de l'ID depuis l'URL en entier
  const id = parseInt(req.params.id);

  try {
    // Recherche unique de l'utilisateur par ID en base
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id },
    });

    // Si aucun utilisateur trouvé, renvoyer une erreur 404
    if (!utilisateur) {
      return res.status(404).json({ erreur: 'Utilisateur non trouvé' });
    }

    // Sinon renvoyer l'utilisateur trouvé
    res.json(utilisateur);

  } catch (error) {
    // Gestion d’erreur serveur
    res.status(500).json({ erreur: error.message });
  }
});

/* ----------------------- UPDATE ----------------------- */
// Route HTTP PUT pour modifier un utilisateur existant par son ID
router.put('/:id', async (req, res) => {
  // Extraction de l'ID utilisateur et des champs à modifier depuis la requête
  const id = parseInt(req.params.id);
  const { nom, email, mot_de_passe, role } = req.body;

  try {
    // Mise à jour de l'utilisateur en base avec les nouvelles données
    const utilisateurModifie = await prisma.utilisateur.update({
      where: { id },
      data: { nom, email, mot_de_passe, role },
    });

    // Retourner l'utilisateur modifié
    res.json(utilisateurModifie);

  } catch (error) {
    // Gestion des erreurs (ex : utilisateur inexistant)
    res.status(400).json({ erreur: error.message });
  }
});

/* ----------------------- DELETE ----------------------- */
// Route HTTP DELETE pour supprimer un utilisateur par son ID
router.delete('/:id', async (req, res) => {
  // Extraction de l'ID utilisateur à supprimer
  const id = parseInt(req.params.id);

  try {
    // Suppression de l'utilisateur en base
    await prisma.utilisateur.delete({
      where: { id },
    });

    // Réponse HTTP 204 : suppression réussie, pas de contenu à renvoyer
    res.status(204).end();

  } catch (error) {
    // Gestion des erreurs (ex : utilisateur inexistant)
    res.status(400).json({ erreur: error.message });
  }
});

// Export du routeur pour pouvoir l'utiliser dans le serveur principal (app.js)
export default router;
