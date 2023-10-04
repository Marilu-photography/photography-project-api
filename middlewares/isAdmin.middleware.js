module.exports.isAdmin = (req, res, next) => {
  // Verifica si req.isAuthenticated es una función y si el usuario está autenticado
  if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.isAdmin) {
    return next();
  }

  res.status(401).json({ error: 'No autenticado' });
}

