import express from 'express';
import { logActivity } from '../utils/logActivity.js';


const router = express.Router();

/* ----------------------- Deconnexion ----------------------- */

router.get('/', async (req, res) => {
  try {
    // Log de l'activité de déconnexion
    // await logActivity(req.session.userId, 'Déconnexion');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'activité de déconnexion:', error);
  }
  req.session.destroy(err => {
    if (err) {
      console.error('Erreur lors de la destruction de la session :', err);
      return res.status(500).send('Erreur serveur');
    }
    res.redirect('/connexion');  // Redirection simple vers la page connexion
  });
});


// Export du routeur pour pouvoir l'utiliser dans le serveur principal (app.js)
export default router;