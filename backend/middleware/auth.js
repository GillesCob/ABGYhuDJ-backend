export function checkAuth(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/connexion');
  }
}