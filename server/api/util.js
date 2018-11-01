function requireAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    res.send(403);
  }
}

function requireLogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send(401);
  }
}

function requireUserOrAdmin(req, res, next) {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    return next();
  } else {
    res.send(401);
  }
}

module.exports = {
  requireAdmin,
  requireLogin,
  requireUserOrAdmin,
};
