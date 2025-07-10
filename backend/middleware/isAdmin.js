export function isAdmin(req, res, next) {
  if (req.session && req.session.role === 'admin') {
    next(); // autorisé
  } else {
    res.status(403).send('Accès refusé');
  }
}